import os
from pydantic_settings import BaseSettings
from fastapi_storages.filesystem import FileSystemStorage

class Settings(BaseSettings):
    DB_URL: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    ADMIN_LOGIN: str
    ADMIN_PASSWORD: str
    
    CORS_ALLOW_ORIGINS: list[str] = ["*"]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list[str] = ["*"]
    CORS_ALLOW_HEADERS: list[str] = ["*"]
    
    class Config:
        env_file = os.path.join(os.path.dirname(__file__), ".env")
        env_file_encoding = "utf-8"

storage = FileSystemStorage(path="static")

settings = Settings()
