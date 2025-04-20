# Django REST Framework Backend Setup

## Introduction
This document provides step-by-step instructions to set up a Django backend with Django REST Framework (DRF) locally from GitHub and configure Supabase as the database.

---

## Prerequisites
Ensure you have the following installed:
- Python 3.x
- pip (Python package manager)
- Virtual environment (`venv`)
- Django and Django REST Framework
- A Supabase account ([https://supabase.com](https://supabase.com))

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

---

## 2. Setup Virtual Environment
Create and activate a virtual environment:

```bash
python -m venv venv
```

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```
- **Mac/Linux:**
  ```bash
  source venv/bin/activate
  ```

---

## 3. Install Dependencies
Install required dependencies:

```bash
pip install -r requirements.txt
```

---

## 4. Configure Supabase as Database
### 4.1. Get Supabase Credentials
1. Log in to [Supabase](https://supabase.com/) and create a new project.
2. Navigate to **Database Settings** and copy the database URL.


### 4.2. Set Environment Variables
Create a `.env` file in the project root and add:

```plaintext
SUPABASE_DATABASE_URL=postgres://your_user:your_password@your_host:your_port/your_database
```

---

## 5. Apply Migrations
Run the following command to set up the database:

```bash
python manage.py makemigrations # Make the migrations if they dont exist
python manage.py migrate
```

---

## 6. Run the Development Server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/api/items/` to test the API.

---

## 7. Adding Sample Data (Optional)
Open Django shell:

```bash
python manage.py shell
```

Run:

```python
from api.models import Item
Item.objects.create(name="Laptop", description="A powerful laptop")
Item.objects.create(name="Smartphone", description="A high-end smartphone")
exit()
```

Reload `http://127.0.0.1:8000/api/items/` and verify the JSON response.

---


