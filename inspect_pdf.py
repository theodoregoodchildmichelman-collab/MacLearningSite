import os
from pdfminer.high_level import extract_text

def main():
    pdf_path = "corpus/Mac Textbook.pdf"
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} not found")
        return

    # Extract first 20 pages (0-19)
    text = extract_text(pdf_path, page_numbers=range(20))
    
    with open("pdf_preview.txt", "w", encoding="utf-8") as f:
        f.write(text)
    
    print("Extracted first 20 pages to pdf_preview.txt")

if __name__ == "__main__":
    main()
