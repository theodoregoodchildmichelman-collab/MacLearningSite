import os
from pdfminer.high_level import extract_text

def main():
    pdf_path = "corpus/Mac Textbook.pdf"
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} not found")
        return

    # Extract Lesson 1
    # Based on analysis: Footer Page 6 starts around Physical Page 10 (index 9)
    # Lesson 2 starts at Footer Page 11 (Physical Page 15, index 14)
    # So we want indices 9 to 14 (exclusive of 14? No, inclusive of 13, maybe 14 to be safe)
    # extract_text uses page_numbers list.
    
    pages = list(range(9, 15)) # 9, 10, 11, 12, 13, 14 (Physical 10-15)
    text = extract_text(pdf_path, page_numbers=pages)
    
    with open("lesson_01_raw.txt", "w", encoding="utf-8") as f:
        f.write(text)
    
    print("Extracted Lesson 1 to lesson_01_raw.txt")

if __name__ == "__main__":
    main()
