import re
from pdfminer.high_level import extract_text

def main():
    pdf_path = "corpus/Mac Textbook.pdf"
    
    # We'll scan pages 0 to 150 (assuming textbook isn't huge, or we can check length)
    # Better to just extract all text with page breaks to map them?
    # extract_text can return text, but mapping to pages is harder unless we iterate.
    
    print("Scanning pages for chapter headers...")
    
    chapter_map = {}
    
    # Iterate through pages to find chapter starts
    # This might be slow for a large PDF, but robust.
    for page_num in range(0, 150):
        try:
            text = extract_text(pdf_path, page_numbers=[page_num])
            if not text:
                break
                
            # Look for pattern: "N. TITLE" at start of line or after newline
            # The inspection showed: "2. ШТО СТЕ ПО ПРОФЕСИЈА?"
            # And "1. ЈАС СУМ ОД..."
            
            # Regex: Start of line, Number, dot, space, Uppercase text (Cyrillic or Latin)
            # Note: The text might be messy.
            
            lines = text.split('\n')
            for line in lines:
                line = line.strip()
                # Pattern: Number dot space (Title)
                # We want to match "1. ", "2. ", "25. "
                match = re.match(r'^(\d+)\.\s+([А-Яа-яA-Z\s]+)$', line)
                if match:
                    chapter_num = int(match.group(1))
                    title = match.group(2)
                    
                    # Filter out false positives (e.g. numbered lists inside chapters)
                    # Chapter titles seem to be uppercase and short-ish
                    if chapter_num not in chapter_map and 1 <= chapter_num <= 25:
                        # Also check if it looks like a title (length > 3)
                        if len(title) > 3:
                            print(f"Found Chapter {chapter_num} on page {page_num}: {title}")
                            chapter_map[chapter_num] = page_num
                            
        except Exception as e:
            # End of file or error
            break
            
    print("Chapter Map:", chapter_map)

if __name__ == "__main__":
    main()
