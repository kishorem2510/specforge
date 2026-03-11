import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# -------------------------
# Groq Client Setup
# -------------------------
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_llm(prompt: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500,
        temperature=0.3
    )
    return response.choices[0].message.content.strip()


# -------------------------
# Step 1: Extract Features
# -------------------------
def extract_features(requirements: str) -> str:
    prompt = f"""You are a software analyst. Extract exactly 5 key features from these requirements.
Format as a numbered list. Be specific to the requirements given.

Requirements:
{requirements}

Output only the 5 features as a numbered list, nothing else."""
    return call_llm(prompt)


# -------------------------
# Step 2: Generate User Stories
# -------------------------
def generate_user_stories(features: str, requirements: str) -> str:
    prompt = f"""You are an agile product manager. Write user stories based on these features.
Format: "As a [role], I want to [action] so that [benefit]."
Write one user story per feature. Be specific.

Original Requirements:
{requirements}

Features:
{features}

Output only the numbered user stories, nothing else."""
    return call_llm(prompt)


# -------------------------
# Step 3: Generate API + DB Schema
# -------------------------
def generate_api_and_schema(features: str, requirements: str) -> str:
    prompt = f"""You are a backend architect. Based on these requirements and features, provide:

1. REST API Endpoints (method, path, brief description)
2. Database Tables (table name with key fields)
3. Edge Cases & Constraints (at least 3)

Requirements:
{requirements}

Features:
{features}

Be specific and practical. Format clearly with headers."""
    return call_llm(prompt)


# -------------------------
# Main Pipeline
# -------------------------
def run_pipeline(requirements: str) -> dict:
    features = extract_features(requirements)
    user_stories = generate_user_stories(features, requirements)
    api_and_schema = generate_api_and_schema(features, requirements)

    return {
        "features": features,
        "user_stories": user_stories,
        "api_and_schema": api_and_schema
    }