# aikaatib
This Repository contains the code for our project AI Kaatib.

## Introduction
This document provides step-by-step instructions to set up a Django backend with Django REST Framework (DRF) locally from GitHub.

---

## Prerequisites
Ensure you have the following installed:
- Python 3.x
- pip (Python package manager)
- Virtual environment (`venv`)
- Django and Django REST Framework

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

## 4. Apply Migrations
Run the following command to set up the database:

```bash
python manage.py migrate
```

---

## 5. Run the Development Server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/api/items/` to test the API.

---

## 6. Adding Sample Data (Optional)
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

## Conclusion
Your Django backend with Django REST Framework is now set up and running locally. You can expand it by adding more endpoints, authentication, and database models as needed.

Happy coding! 🚀

