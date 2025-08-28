from flask import Flask, request, jsonify
from .llm_summary import summarize_certificate_text

import pytesseract

from PIL import Image
import io
import re
from rapidfuzz import fuzz

app = Flask(__name__)

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
    mname = request.form.get("mname", "").strip().lower()
    lname = request.form.get("lname", "").strip().lower()

    if not fname or not lname:
        return jsonify({"status": "error", "message": "Missing fname or lname"}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        extracted_text = pytesseract.image_to_string(image).lower()
        # llm_summary = summarize_certificate_text(extracted_text)

        cleaned_text = re.sub(r'[^a-z\s]', ' ', extracted_text)
        words = cleaned_text.split()

        # Construct full name variations
        full_name = f"{fname} {mname} {lname}".strip()
        compact_name = " ".join([fname, lname])

        # Regex patterns to match various formats
        full_name_patterns = [
            rf"{fname}\s+{mname}\s+{lname}",
            rf"{fname}\s+{lname}",
            rf"{lname}\s+{fname}",
            rf"{lname}\s+{mname}\s+{fname}",
            rf"{fname}\s+\w+\s+{lname}",
            rf"{lname}\s+\w+\s+{fname}",
            rf"{fname[0]}\.?\s*{lname}",
            rf"{lname},?\s*{fname}"
        ]

        full_match = any(re.search(p, cleaned_text) for p in full_name_patterns)

        # Fuzzy match on 3-word windows
        partial_match = False
        max_similarity = 0

        for i in range(len(words)):
            token_window = " ".join(words[i:i+3])
            sim = fuzz.token_sort_ratio(token_window, full_name)
            max_similarity = max(max_similarity, sim)
            if sim >= 80:
                partial_match = True
                break

        # Final decision
        if full_match:
            name_match = "full"
            confidence = 1.0
        elif partial_match:
            name_match = "partial"
            confidence = round(max_similarity / 100, 2)
        else:
            name_match = "not_found"
            confidence = round(max_similarity / 100, 2)

        # Category prediction
        predicted_category = "unknown"
        for category, keywords in CATEGORY_KEYWORDS.items():
            if any(keyword in cleaned_text for keyword in keywords):
                predicted_category = category
                break

        return jsonify({
            "status": "success",
            "predicted_category": predicted_category,
            "expected_name": full_name,
            "name_match": name_match ,
            "confidence": confidence,
            "ocr_text": extracted_text,
            # "llm_summary": llm_summary

        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    


@app.route('/check_duplicate', methods=['POST'])
def check_duplicate():
    # """
    # Check if a similar certificate (achievement) is already uploaded
    # based on issued date and description.
    # """
    data = request.get_json()

    description = data.get("description", "").strip()
    past_certificates = data.get("past_certificates", [])  
    # past_certificates = [{ "issued_date": "...", "description": "..." }, ...]

    if  not description:
        return jsonify({"status": "error", "message": "Missing issued_date or description"}), 400

    for cert in past_certificates:
        # Match issued date strictly
        # if cert.get("issued_date") == issued_date:
        #     # Check description similarity
        sim = fuzz.token_sort_ratio(cert.get("description", ""), description)
        if sim >= 85:  # High similarity
            return jsonify({
                "status": "duplicate",
                "message": "Similar certificate already exists",
                "matched_certificate": cert
            }), 200

    return jsonify({
        "status": "unique",
        "message": "No duplicate found"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5200)
