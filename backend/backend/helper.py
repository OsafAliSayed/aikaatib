import os


def get_folders(path="."):
    """Fetch all folder names in the given directory."""
    try:
        return [f for f in os.listdir(path) if os.path.isdir(os.path.join(path, f))]
    except FileNotFoundError:
        print(f"Error: The directory '{path}' does not exist.")
        return []
    except PermissionError:
        print(f"Error: Permission denied for accessing '{path}'.")
        return []