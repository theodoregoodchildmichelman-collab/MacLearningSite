import json
import os
from pdfminer.high_level import extract_text

def main():
    pdf_path = "corpus/Mac Textbook.pdf"
    # Extract Chapter 2 pages (approx 15-18 based on comments)
    # Adding a buffer to be safe: 14-20
    text = extract_text(pdf_path, page_numbers=range(14, 20))
    
    with open("chapter_2_raw_dump.txt", "w", encoding="utf-8") as f:
        f.write(text)
    
    print("Dumped Chapter 2 raw text to chapter_2_raw_dump.txt")

if __name__ == "__main__":
    main()
