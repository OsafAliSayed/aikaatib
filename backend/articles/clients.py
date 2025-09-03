
import os
from openai import OpenAI

# Singleton OpenAI client for the articles app
openai_client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

