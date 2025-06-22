import os
from pydantic_settings import BaseSettings
from fastapi_storages.filesystem import FileSystemStorage

class Settings(BaseSettings):
    DB_URL: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    ADMIN_LOGIN: str
    ADMIN_PASSWORD: str
    
    class Config:
        env_file = os.path.join(os.path.dirname(__file__), ".env")
        env_file_encoding = "utf-8"

storage = FileSystemStorage(path="app/static")

settings = Settings()
