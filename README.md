# AI Kaatib - AI based blog writer

AI Kaatib is a generative AI that lets you write SEO friendly, optimized articles for you blogs. 

# Features

- Generate SEO friendly articles
- Generate SEO friendly titles
- Bulk article generation (Coming soon)
- Scheduler (Coming soon)

# Installation

1. Clone the repository:
```bash
git clone www.github.com/osafalisayed/aikaatib.git
```

2. Navigate to the project directory:
```bash
cd aikaatib
```

From here, you can run the project in three ways:
- Using Docker Compose
- Using Docker
- Manually setup frontend and backend

## Using Docker Compose

## Using Docker

## Manual Setup

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ui
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Backend Setup

1. Create a virtual environment in root directory:
```bash
python3 -m venv venv
```

2. Activate the virtual environment:
```bash
source venv/bin/activate
```

3. Navigate to backend directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory and add the following environment variables:

```
OPENAI_API_KEY= "your_openai_api_key"
SUPABASE_DATABASE_URL= "your_supabase_database_url"
SUPABASE_URL = "https://your_supabase_url.supabase.co"
SUPABASE_SERVICE_KEY = "your_supabase_service_key"
```

5. Make sure supabase is running and the database is created.

6. Perform database migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

7. Start the Django server:
```bash
python manage.py runserver
```

8. Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

