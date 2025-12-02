import json
import os
import re
from pdfminer.high_level import extract_text

def extract_text_from_pdf(pdf_path, start_page, end_page):
    try:
        # pdfminer uses 0-indexed page numbers in a list
        pages = list(range(start_page - 1, end_page))
        text = extract_text(pdf_path, page_numbers=pages)
        return text
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None

def parse_lesson_2(text):
    data = {
        "lesson_meta": {
            "id": 2,
            "title_mk": "ШТО СТЕ ПО ПРОФЕСИЈА?",
            "title_en": "What is your profession?",
            "page_start": 11
        },
        "dialogues": [],
        "vocabulary": [],
        "grammar_notes": []
    }

    # Known professions to look for based on text inspection
    # We will look for these keywords and add them if found
    known_professions = [
        {"m": "Професор", "f": "Професорка", "en": "Professor"},
        {"m": "Волонтер", "f": "Волонтерка", "en": "Volunteer"},
        {"m": "Студент", "f": "Студентка", "en": "Student"}, # Common, might be there
        {"m": "Адвокат", "f": "Адвокатка", "en": "Lawyer"},
        {"m": "Новинар", "f": "Новинарка", "en": "Journalist"},
        {"m": "Македонец", "f": "Македонка", "en": "Macedonian (person)"},
        {"m": "Американец", "f": "Американка", "en": "American (person)"},
        {"m": "Специјален едукатор", "f": "Специјален едукатор", "en": "Special Educator"}, # Likely invariant or not explicitly gendered in text
        {"m": "Младински работник", "f": "Младински работник", "en": "Youth Worker"}
    ]

    text_lower = text.lower()
    
    for p in known_professions:
        # Check if either form is in the text
        if p["m"].lower() in text_lower or p["f"].lower() in text_lower:
            data["vocabulary"].append({
                "mk_word": f"{p['m']} (m) / {p['f']} (f)",
                "en_definition": p["en"],
                "part_of_speech": "noun",
                "gender": "m/f",
                "plural_form": f"{p['m']}и" # Generic plural guess
            })

    return data

def parse_lesson_3(text):
    data = {
        "lesson_meta": {
            "id": 3,
            "title_mk": "ХРАНА",
            "title_en": "Food",
            "page_start": 15
        },
        "dialogues": [],
        "vocabulary": [],
        "grammar_notes": []
    }

    # Known food items to look for
    known_foods = [
        {"mk": "Хамбургер", "en": "Hamburger"},
        {"mk": "Леб", "en": "Bread"},
        {"mk": "Чај", "en": "Tea"},
        {"mk": "Кафе", "en": "Coffee"},
        {"mk": "Кока-Кола", "en": "Coca-Cola"},
        {"mk": "Салата", "en": "Salad"},
        {"mk": "Супа", "en": "Soup"},
        {"mk": "Вода", "en": "Water"},
        {"mk": "Пица", "en": "Pizza"},
        {"mk": "Сендвич", "en": "Sandwich"},
        {"mk": "Појадок", "en": "Breakfast"},
        {"mk": "Ручек", "en": "Lunch"},
        {"mk": "Вечера", "en": "Dinner"}
    ]

    text_lower = text.lower()
    
    for food in known_foods:
        if food["mk"].lower() in text_lower:
            data["vocabulary"].append({
                "mk_word": food["mk"],
                "en_definition": food["en"],
                "part_of_speech": "noun",
                "gender": None, # Could infer if we had a dictionary
                "plural_form": "",
                "image_ref": f"images/lesson_03/{food['mk'].lower().replace(' ', '_').replace('-', '_')}.jpg"
            })

    return data

def main():
    pdf_path = "corpus/Mac Textbook.pdf"
    
    if not os.path.exists(pdf_path):
        if os.path.exists("Mac Textbook.pdf"):
            pdf_path = "Mac Textbook.pdf"
        else:
            print(f"CRITICAL: {pdf_path} not found.")
            return

    # Extract Lesson 2 (Footer Page 11-14 -> Physical 15-18)
    text_l2 = extract_text_from_pdf(pdf_path, 15, 18)
    
    if text_l2:
        data_l2 = parse_lesson_2(text_l2)
        with open("src/data/lesson_02.json", "w", encoding="utf-8") as f:
            json.dump(data_l2, f, indent=4, ensure_ascii=False)
        print("Lesson 2 saved to src/data/lesson_02.json")

    # Extract Lesson 3 (Footer Page 15-18 -> Physical 19-22)
    text_l3 = extract_text_from_pdf(pdf_path, 19, 22)

    if text_l3:
        data_l3 = parse_lesson_3(text_l3)
        with open("src/data/lesson_03.json", "w", encoding="utf-8") as f:
            json.dump(data_l3, f, indent=4, ensure_ascii=False)
        print("Lesson 3 saved to src/data/lesson_03.json")

if __name__ == "__main__":
    main()
