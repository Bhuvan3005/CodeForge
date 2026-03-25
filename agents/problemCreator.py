import json
import os
from dotenv import load_dotenv
from google import genai

load_dotenv(dotenv_path=".env")
# Initialize client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def safe_parse_json(text):
    try:
        return json.loads(text)
    except:
        cleaned = (
            text.replace("```json", "")
                .replace("```", "")
                .strip()
        )
        return json.loads(cleaned)


def generate_problems(topic, difficulty, count):
    prompt = f"""
You are a DSA problem generator.

Generate {count} unique coding problems.

Topic: {topic}
Difficulty: {difficulty}

STRICT RULES:
- Problems must be interview-level (like LeetCode)
- Each problem must be unique
- Include clear constraints
- Include at least 2 test cases per problem

Return ONLY valid JSON in this format:

{{
  "problems": [
    {{
      "name": "Problem title",
      "description": "Full problem statement with constraints",
      "testcases": [
        {{
          "input": "input format",
          "output": "expected output"
        }}
      ]
    }}
  ]
}}

DO NOT include explanations.
DO NOT include markdown.
ONLY JSON.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    content = response.text

    return safe_parse_json(content)



if __name__ == "__main__":
    import sys
    if len(sys.argv) >= 4:
        topic = sys.argv[1]
        difficulty = sys.argv[2]
        count = sys.argv[3]
        result = generate_problems(topic, difficulty, count)
        print(json.dumps(result))