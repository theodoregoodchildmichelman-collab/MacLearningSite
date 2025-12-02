import json
import re

def parse_dialogue(text):
    dialogues = []
    current_dialogue = {"title": "Main Dialogue", "lines": []}
    
    # Regex for speakers: "A:", "Б:", "Ана:", "Марк:", etc.
    speaker_pattern = re.compile(r'^([АБA-Za-zА-Яа-я]+):\s*(.*)')
    
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        match = speaker_pattern.match(line)
        if match:
            speaker = match.group(1)
            text_content = match.group(2).strip()
            
            # Filter out "Пример" and empty content
            if speaker.lower() == "пример" or not text_content:
                continue
            
            # Normalize speaker names
            if speaker in ['А', 'A']: speaker = 'Speaker A'
            if speaker in ['Б', 'B']: speaker = 'Speaker B'
            
            current_dialogue["lines"].append({
                "speaker": speaker,
                "mk_text": text_content,
                "en_translation": "" 
            })
            
    if current_dialogue["lines"]:
        dialogues.append(current_dialogue)
        
    return dialogues

def parse_vocabulary(text):
    vocab_list = []
    
    nationalities = [
        ("Македонец", "Macedonian (male)", "m"),
        ("Македонка", "Macedonian (female)", "f"),
        ("Американец", "American (male)", "m"),
        ("Американка", "American (female)", "f"),
        ("Албанец", "Albanian (male)", "m"),
        ("Албанка", "Albanian (female)", "f")
    ]
    
    text_lower = text.lower()
    
    for mk, en, gender in nationalities:
        if mk.lower() in text_lower:
            # Plural logic
            plural = ""
            if mk.endswith("ец"):
                plural = mk[:-2] + "ци"
            elif mk.endswith("а"):
                plural = mk[:-1] + "и"
            else:
                plural = mk + "и"

            vocab_list.append({
                "mk_word": mk,
                "en_definition": en,
                "part_of_speech": "noun",
                "gender": gender,
                "plural_form": plural
            })

    return vocab_list

def parse_grammar(text):
    grammar_notes = []
    
    # Look for the "to be" verb conjugation pattern
    # ЈАС СУМ... ТИ СИ...
    
    if "ЈАС СУМ" in text and "ТИ СИ" in text:
        grammar_notes.append({
            "topic": "The verb 'to be' (сум)",
            "explanation_markdown": """
**Conjugation of 'сум' (to be):**

| Pronoun | Verb | English |
|---------|------|---------|
| Јас     | сум  | I am    |
| Ти      | си   | You are |
| Тој/Таа | е    | He/She is |
| Ние     | сме  | We are  |
| Вие     | сте  | You are |
| Тие     | се   | They are |
            """,
            "examples": [
                {"mk": "Јас сум Ана.", "en": "I am Ana."},
                {"mk": "Ти си од Америка.", "en": "You are from America."}
            ]
        })
        
    return grammar_notes

def main():
    try:
        with open('lesson_01_raw.txt', 'r', encoding='utf-8') as f:
            text = f.read()
            
        lesson_data = {
            "lessonModule": {
                "id": "lesson_01",
                "title": "Lesson 1: Introductions",
                "subtitle": "Јас сум од Македонија",
                "proficiencyLevel": "Beginner",
                "theme": "Introductions & Nationalities",
                "intro": "Learn how to introduce yourself and say where you are from.",
                "sections": []
            }
        }
        
        # Parse sections
        dialogues = parse_dialogue(text)
        vocab = parse_vocabulary(text)
        grammar = parse_grammar(text)
        
        # Map to schema structure (which expects specific fields in root or sections? 
        # Checking schema.json... it seems schema.json has a specific structure 
        # but the existing lesson26.json uses "sections" list.
        # The user request said "map to schema.json structure".
        # Let's check schema.json again to be sure.
        # schema.json has "dialogues", "vocabulary", "grammar_notes" as top level keys 
        # inside "properties", but wait, schema.json root is an object with "properties".
        # So the JSON file should have "lesson_meta", "dialogues", "vocabulary", "grammar_notes".
        
        # Re-aligning with schema.json provided in the prompt/file
        
        final_data = {
            "lesson_meta": {
                "id": 1,
                "title_mk": "ЈАС СУМ ОД МАКЕДОНИЈА, ТИ СИ ОД АМЕРИКА",
                "title_en": "I am from Macedonia, you are from America",
                "page_start": 6
            },
            "dialogues": dialogues,
            "vocabulary": vocab,
            "grammar_notes": grammar
        }

        with open('lesson_01.json', 'w', encoding='utf-8') as f:
            json.dump(final_data, f, indent=4, ensure_ascii=False)
            
        print("Successfully generated lesson_01.json")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
