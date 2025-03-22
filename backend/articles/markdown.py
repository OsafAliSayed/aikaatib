from supabase import create_client
import os
from django.conf import settings

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)

def delete_markdown(file_path):
    """
    Deletes a markdown file from Supabase Storage.
    
    :param file_name: The name of the file to delete
    :param user_id: The user ID
    """
    bucket_name = settings.SUPABASE_BUCKET
    supabase.storage.from_(bucket_name).remove(file_path)
    
    
def get_signed_url(file_path, expires_in=3600):
    """
    Generates a signed URL for a given file path in a private bucket.
    
    :param file_path: The path to the file in the bucket
    :param expires_in: The expiration time for the signed URL in seconds (default: 3600 seconds)
    :return: The signed URL
    """
    bucket_name = settings.SUPABASE_BUCKET
    response = supabase.storage.from_(bucket_name).create_signed_url(file_path, expires_in)
    
    return response["signedURL"]

def upload_markdown(file_name, user_id, content):
    """
    Uploads a markdown file to Supabase Storage.
    
    :param file_name: The name of the file (e.g., "my_blog_post.md")
    :param content: The Markdown content as a string
    :return: The public URL of the uploaded file
    """
    
    # make filename database friendly
    file_name = file_name.replace(" ", "_").lower()
    bucket_name = settings.SUPABASE_BUCKET
    file_path = f"{bucket_name}/{user_id}/{file_name}"
    
    # Check if file already exists
    file_list = supabase.storage.from_(bucket_name).list(path=f'articles/{user_id}')
    existing_files = [file['name'] for file in file_list]

    if file_name in existing_files:
        raise Exception("File with the same name already exists")

    # Upload file
    response = supabase.storage.from_(bucket_name).upload(
        file_path,
        content.encode(),
        file_options={"content-type": "text/markdown"}
    )

    url = get_signed_url(file_path)
    return url
    
