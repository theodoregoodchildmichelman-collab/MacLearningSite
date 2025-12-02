import json
import os
import re

# Configuration
LESSON_FILES = ['lesson_01.json', 'lesson_02.json', 'lesson_03.json']
SCHEMA_FILE = 'schema.json'
LOG_FILE = 'validation_log.txt'

# OCR Error Patterns (Cyrillic context)
# Looking for Latin digits/letters that look like Cyrillic letters in Cyrillic words.
# This is a heuristic.
OCR_SUSPICIONS = [
    (r'(?<=[а-яА-Я])3(?=[а-яА-Я])', 'Digit 3 instead of Cyrillic Ze (З)'),
    (r'(?<=[а-яА-Я])0(?=[а-яА-Я])', 'Digit 0 instead of Cyrillic O'),
    (r'(?<=[а-яА-Я])6(?=[а-яА-Я])', 'Digit 6 instead of Cyrillic be (б)'),
]

def log(message, file_handle):
    print(message)
    file_handle.write(message + '\n')

def validate_structure(data, path=""):
    errors = []
    
    if not isinstance(data, dict):
        return [f"{path}: Expected object, got {type(data).__name__}"]
    
    # Validate against schema.json structure
    # Expected keys: lesson_meta, dialogues, vocabulary, grammar_notes
    
    required_top_level = ["lesson_meta", "dialogues", "vocabulary", "grammar_notes"]
    for field in required_top_level:
        if field not in data:
            errors.append(f"{path}: Missing top-level field '{field}'")
            
    if "lesson_meta" in data:
        meta = data["lesson_meta"]
        meta_req = ["id", "title_mk", "page_start"]
        for f in meta_req:
            if f not in meta:
                errors.append(f"{path}.lesson_meta: Missing '{f}'")

    if "dialogues" in data:
        if not isinstance(data["dialogues"], list):
            errors.append(f"{path}.dialogues: Expected list")
        else:
            for i, d in enumerate(data["dialogues"]):
                if "lines" not in d:
                    errors.append(f"{path}.dialogues[{i}]: Missing 'lines'")
                    
    if "vocabulary" in data:
        if not isinstance(data["vocabulary"], list):
            errors.append(f"{path}.vocabulary: Expected list")
        else:
            for i, v in enumerate(data["vocabulary"]):
                if "mk_word" not in v:
                    errors.append(f"{path}.vocabulary[{i}]: Missing 'mk_word'")

    return errors

def check_ocr_errors(data, path=""):
    warnings = []
    
    if isinstance(data, str):
        for pattern, desc in OCR_SUSPICIONS:
            if re.search(pattern, data):
                warnings.append(f"{path}: Potential OCR error '{desc}' in text: '{data[:30]}...'")
    elif isinstance(data, dict):
        for k, v in data.items():
            warnings.extend(check_ocr_errors(v, f"{path}.{k}"))
    elif isinstance(data, list):
        for i, v in enumerate(data):
            warnings.extend(check_ocr_errors(v, f"{path}[{i}]"))
            
    return warnings

def main():
    with open(LOG_FILE, 'w', encoding='utf-8') as log_f:
        log("Starting validation...", log_f)
        
        # 1. Load Schema (just to check it exists and is valid JSON)
        if os.path.exists(SCHEMA_FILE):
            try:
                with open(SCHEMA_FILE, 'r', encoding='utf-8') as f:
                    json.load(f)
                log(f"Schema {SCHEMA_FILE} loaded successfully.", log_f)
            except json.JSONDecodeError as e:
                log(f"Error loading schema: {e}", log_f)
        else:
            log(f"Warning: {SCHEMA_FILE} not found.", log_f)

        # 2. Validate Lessons
        for filename in LESSON_FILES:
            log(f"\nValidating {filename}...", log_f)
            
            # Check file existence
            # Try root and corpus/
            filepath = filename
            if not os.path.exists(filepath):
                filepath = os.path.join('corpus', filename)
                
            if not os.path.exists(filepath):
                log(f"ERROR: File {filename} not found in root or corpus/.", log_f)
                continue
                
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Structure Check
                struct_errors = validate_structure(data, filename)
                if struct_errors:
                    log("  Structure Errors:", log_f)
                    for err in struct_errors:
                        log(f"    - {err}", log_f)
                else:
                    log("  Structure: OK", log_f)
                    
                # OCR Check
                ocr_warnings = check_ocr_errors(data, filename)
                if ocr_warnings:
                    log("  OCR Warnings:", log_f)
                    for w in ocr_warnings:
                        log(f"    - {w}", log_f)
                else:
                    log("  OCR Check: OK", log_f)
                    
            except json.JSONDecodeError as e:
                log(f"  ERROR: Invalid JSON format: {e}", log_f)
            except Exception as e:
                log(f"  ERROR: Unexpected error: {e}", log_f)

        log("\nValidation complete.", log_f)

if __name__ == "__main__":
    main()
