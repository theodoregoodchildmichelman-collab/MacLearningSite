from pdfminer.high_level import extract_text

def main():
    pdf_path = "corpus/Mac Textbook.pdf"
    # Extract first 15 pages to look for TOC
    text = extract_text(pdf_path, page_numbers=range(0, 15))
    print(text)

if __name__ == "__main__":
    main()
