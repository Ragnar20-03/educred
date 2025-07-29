# llm_summary.py

from openai import OpenAI
import os

# Use your environment variable or paste your key here
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_certificate_text(extracted_text: str) -> str:
    prompt = f"""
    You are a helpful assistant. Analyze the following certificate text and generate a short, clear summary with key details like:
    - What the certificate is for
    - What kind of activity it is (e.g., participation, winning, completion, internship)
    - Who issued it (if any name is mentioned)
    - Date or duration (if mentioned)

    Certificate Text:
    """
    prompt += extracted_text.strip()

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # use 'gpt-4' if access is available
        messages=[
            {"role": "system", "content": "You summarize certificate content."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
        max_tokens=200
    )

    return response.choices[0].message.content.strip()
