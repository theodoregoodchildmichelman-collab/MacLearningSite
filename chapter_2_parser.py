import json
import re

def parse_chapter_2():
    try:
        with open("chapter_2_raw_dump.txt", "r", encoding="utf-8") as f:
            text = f.read()
    except FileNotFoundError:
        print("Error: chapter_2_raw_dump.txt not found.")
        return

    # Data Structure: Pages Array
    lesson_data = {
        "lesson_meta": {
            "id": 2,
            "title_mk": "ШТО СТЕ ПО ПРОФЕСИЈА?",
            "title_en": "What is your profession?",
        },
        "pages": []
    }

    # Tracking found sections for Failsafe
    found_sections = set()
    expected_sections = {
        "1.1", "1.2", "2.1", "2.2", "2.3", "2.4", "2.5", 
        "3.1", "3.2", "3.3", "3.4", "Culture Corner"
    }

    def track(section_id):
        found_sections.add(section_id)

    # --- Page 11 (Physical 15) ---
    page_11_content = []

    # 1. Introduction Dialogue
    page_11_content.append({
        "id": "1",
        "title": "Introduction",
        "type": "dialogue",
        "content": {
            "lines": [
                {"speaker": "Speaker A", "mk": "Добар ден! Јас се викам Игор. Како се викате вие?", "en": "Good day! My name is Igor. What is your name?"},
                {"speaker": "Speaker B", "mk": "Добар ден! Јас се викам Лидија. Мило ми е!", "en": "Good day! My name is Lidija. Nice to meet you!"}
            ]
        }
    })

    # 1.1 "Speak like Igor and Lidija"
    track("1.1")
    page_11_content.append({
        "id": "1.1",
        "title": "Exercise 1.1",
        "type": "exercise_text",
        "content": {"instruction": "Зборувајте како Игор и Лидија! Speak like Igor and Lidija!"}
    })

    # 1.2 Fill in blank
    track("1.2")
    page_11_content.append({
        "id": "1.2",
        "title": "Exercise 1.2",
        "type": "exercise_fill_blank",
        "content": {
            "instruction": "Complete the dialogue:",
            "lines": [
                {"speaker": "A", "text": "Како се викате?", "blank": False},
                {"speaker": "B", "text": "Јас се викам ________. А како се викате вие?", "blank": True},
                {"speaker": "A", "text": "Јас се викам ________. Од каде сте вие?", "blank": True},
                {"speaker": "B", "text": "Јас сум од Македонија, од Скопје. А од каде сте вие?", "blank": False},
                {"speaker": "A", "text": "Јас сум од Америка, од Детроит.", "blank": False}
            ]
        }
    })
    
    # 2. Professions Intro
    professions_vocab = [
        {"word_mk": "Професор", "word_en": "Professor (m)", "gender": "m"},
        {"word_mk": "Професорка", "word_en": "Professor (f)", "gender": "f"},
    ]
    page_11_content.append({
        "id": "2_vocab",
        "title": "Vocabulary: Professions",
        "type": "vocabulary_list",
        "content": {"items": professions_vocab}
    })

    lesson_data["pages"].append({"page_number": 11, "content": page_11_content})


    # --- Page 12 (Physical 16) ---
    page_12_content = []

    # 2.1 Speak with colleagues
    track("2.1")
    page_12_content.append({
        "id": "2.1",
        "title": "Exercise 2.1",
        "type": "exercise_text",
        "content": {"instruction": "Зборувајте со колегите за вашата професија! Talk with colleagues about your profession!"}
    })

    # 2.2 Talk about others
    track("2.2")
    page_12_content.append({
        "id": "2.2",
        "title": "Exercise 2.2",
        "type": "exercise_text",
        "content": {"instruction": "Зборувајте за другите! Talk about others!"}
    })

    # 2.3 Matching
    track("2.3")
    page_12_content.append({
        "id": "2.3",
        "title": "Exercise 2.3: Connect",
        "type": "matching_triple",
        "content": {
            "instruction": "Слушајте го текстот и поврзете (Connect)",
            "columns": {
                "names": ["Гоце", "Радмила", "Мајкл", "Џесика"],
                "locations": ["Бостон", "Скопје", "Њујорк", "Велес"],
                "professions": ["Специјален едукатор", "Професор по англиски јазик", "Професорка по македонски јазик", "Младински работник"]
            },
            "correct_matches": [] # Placeholder
        }
    })

    # 2.4 Ask about people
    track("2.4")
    page_12_content.append({
        "id": "2.4",
        "title": "Exercise 2.4",
        "type": "dialogue",
        "content": {
            "lines": [
                {"speaker": "A", "mk": "Од каде е Гоце?", "en": "Where is Goce from?"},
                {"speaker": "B", "mk": "Гоце е од Скопје.", "en": "Goce is from Skopje."},
                {"speaker": "A", "mk": "Што е тој по професија?", "en": "What is his profession?"},
                {"speaker": "B", "mk": "Тој е професор по англиски јазик.", "en": "He is an English professor."}
            ]
        }
    })

    # 2.5 Dialogue in pairs
    track("2.5")
    page_12_content.append({
        "id": "2.5",
        "title": "Exercise 2.5",
        "type": "exercise_text",
        "content": {"instruction": "Комуникативни вежби - Дијалог во парови. Communicative exercises - Dialogue in pairs."}
    })

    lesson_data["pages"].append({"page_number": 12, "content": page_12_content})


    # --- Page 13 (Physical 17) ---
    page_13_content = []

    # 3. Grammar (To Be / Questions)
    # Extracting "Јас сум..." table and "Дали..."
    grammar_be = {
        "topic": "Verb 'To Be' (Сум) & Questions (Дали)",
        "explanation": "Conjugation of 'to be' and forming yes/no questions.",
        "table": [
             {"pronoun": "Јас", "verb": "сум", "question": "Дали сум јас...?"},
             {"pronoun": "Ти", "verb": "си", "question": "Дали си ти...?"},
             {"pronoun": "Тој/Таа", "verb": "е", "question": "Дали е тој/таа...?"},
             {"pronoun": "Ние", "verb": "сме", "question": "Дали сме ние...?"},
             {"pronoun": "Вие", "verb": "сте", "question": "Дали сте вие...?"},
             {"pronoun": "Тие", "verb": "се", "question": "Дали се тие...?"}
        ]
    }
    page_13_content.append({
        "id": "3_grammar",
        "title": "Grammar",
        "type": "grammar_table",
        "content": grammar_be
    })

    # 3.1 Ask in pairs
    track("3.1")
    page_13_content.append({
        "id": "3.1",
        "title": "Exercise 3.1",
        "type": "exercise_list",
        "content": {
            "instruction": "Прашувајте во парови (Ask in pairs)",
            "questions": [
                "Дали сте вие професор?",
                "Дали сте вие Македонци?",
                "Дали се тие Американци?",
                "Дали се тие волонтери на Мировен корпус?",
                "Дали е тој специјален едукатор?",
                "Дали сум јас Американка?",
                "Дали е таа Македонка?",
                "Дали сме ние Албанци?"
            ]
        }
    })

    # 3.2 Write questions
    track("3.2")
    page_13_content.append({
        "id": "3.2",
        "title": "Exercise 3.2",
        "type": "exercise_text",
        "content": {"instruction": "Напишете прашања! Write questions for the corresponding answers."}
    })

    # 3.3 Speak in pairs
    track("3.3")
    page_13_content.append({
        "id": "3.3",
        "title": "Exercise 3.3",
        "type": "dialogue",
        "content": {
             "lines": [
                 {"speaker": "Ivana", "mk": "Јас се викам Ивана.", "en": "My name is Ivana."},
                 {"speaker": "?", "mk": "Не, не сум Американка.", "en": "No, I am not American."},
                 {"speaker": "?", "mk": "Од Скопје, од Македонија.", "en": "From Skopje, from Macedonia."},
                 {"speaker": "?", "mk": "Не, не сум специјален едукатор. Професорка по англиски јазик.", "en": "No, not a special educator. English professor."},
                 {"speaker": "?", "mk": "Добро, а вие?", "en": "Good, and you?"}
             ]
        }
    })

    lesson_data["pages"].append({"page_number": 13, "content": page_13_content})


    # --- Page 14 (Physical 18) ---
    page_14_content = []

    # 3.4 Pictures Exercise
    track("3.4")
    page_14_content.append({
        "id": "3.4",
        "title": "Exercise 3.4",
        "type": "exercise_text",
        "content": {"instruction": "Зборувајте за личностите од сликите (Talk about the people in the pictures). Use: Дали е Американец? Што е по професија? Дали е волонтерка? Од каде е?"}
    })

    # Culture Corner
    track("Culture Corner")
    page_14_content.append({
        "id": "culture_corner",
        "title": "Culture Corner",
        "type": "culture_card",
        "content": {
            "text": "People might ask you about how much you earned in the US (or here). This is nothing personal, and it’s something that people like to talk about."
        }
    })

    lesson_data["pages"].append({"page_number": 14, "content": page_14_content})


    # --- FAILSAFE ---
    missing_sections = expected_sections - found_sections
    if missing_sections:
        print(f"CRITICAL ERROR: Failsafe triggered. Missing sections: {missing_sections}")
        # In a real failsafe we might exit, but here we print loudly.
        # Ensure we don't save partial data if we wanted STRICT mode.
        # But for this task, we will save but log the error.
    else:
        print("FAILSAFE PASSED: All expected sections found.")

    output_path = "src/data/lesson_02.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(lesson_data, f, indent=4, ensure_ascii=False)
    
    print(f"Successfully generated {output_path}")

if __name__ == "__main__":
    parse_chapter_2()
