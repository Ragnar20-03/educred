from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io
import re

app = Flask(__name__)

# Category keyword mappings
CATEGORY_KEYWORDS = {
    "hackathon": ["hackathon", "codefest", "hackfest", "ideathon"],
    "seminar": ["seminar", "webinar", "guest lecture", "symposium"],
    "workshop": ["workshop", "hands-on"],
    "competition": ["competition", "contest", "winner", "runner-up", "rank"],
    "certification-course": ["certification", "course", "completion", "bootcamp"],
    "internship": ["internship", "training", "intern"],
    "paper-presentation": ["paper presentation", "research paper", "conference"],
    "event-volunteering": ["volunteer", "coordinator", "event helper"],
    "club-participation": ["club", "committee", "member"],
    "extracurricular": ["sports", "music", "art", "drama", "dance", "extracurricular"]
}

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "No file uploaded"}), 400

    file = request.files['file']
    fname = request.form.get("fname", "").strip().lower()
    lname = request.form.get("lname", "").strip().lower()

    if not fname or not lname:
        return jsonify({"status": "error", "message": "Missing fname or lname"}), 400

    try:
        # OCR processing
        image = Image.open(io.BytesIO(file.read()))
        extracted_text = pytesseract.image_to_string(image).lower()

        # Dynamic name matching with various patterns
        patterns = [
            rf"{fname}\s+{lname}",
            rf"{lname}\s+{fname}",
            rf"{fname}\s+\w+\s+{lname}",
            rf"{lname}\s+\w+\s+{fname}",
            rf"{fname[0]}\.?\s*{lname}",
            rf"{lname},?\s*{fname}"
        ]
        name_found = any(re.search(pattern, extracted_text) for pattern in patterns)

        # Category prediction (simple keyword match)
        predicted_category = "unknown"
        for category, keywords in CATEGORY_KEYWORDS.items():
            if any(keyword in extracted_text for keyword in keywords):
                predicted_category = category
                break

        return jsonify({
            "status": "success",
            "text": extracted_text,
            "predicted_category": predicted_category,
            "expected_name": f"{fname} {lname}",
            "name_found": name_found
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5200)
