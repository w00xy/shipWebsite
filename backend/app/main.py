import asyncio

# Импорт основных компонентов FastAPI и админки
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

import uvicorn

# Импорт настроек, движка БД, сессии, логики админки и списка представлений
from config import settings
from database.engine import engine, session_maker
from admin.admin_logic import AdminAuth
from admin import views_list
from api.routes import router as api_router
from utils.init_admin import create_admin
from database.models import User, WorkCategory, WorkExample, Document

# Создание экземпляра FastAPI-приложения с метаданными
app = FastAPI(
    title="Ship Website API",
    description="API сайта",
    version="1.0.0",
)  

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ALLOW_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)

# Монтирование папки static для отдачи файлов (например, изображений и документов)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Инициализация кастомной аутентификации для админки
authentication_backend = AdminAuth(secret_key=settings.JWT_SECRET_KEY)

# Создание экземпляра админки SQLAdmin с аутентификацией
admin = Admin(
    app=app,
    engine=engine,
    authentication_backend=authentication_backend,
    templates_dir="templates",
    title="Админ-панель"
)

# Регистрация всех представлений (моделей) в админке
for view in views_list:
    admin.add_view(view)

# Подключение API-роутера с вашими эндпоинтами
app.include_router(api_router)

templates = Jinja2Templates(directory="templates")

@app.on_event("startup")
async def startup_event():
    await create_admin()

# Запуск приложения через uvicorn, если файл запущен напрямую
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
