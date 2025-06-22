# Ship Website API

## Описание

Это бэкенд для сайта компании на FastAPI с административной панелью (SQLAdmin) и API для работы с примерами работ, категориями и документами.  
В проекте реализованы:
- Админка для управления пользователями, категориями, работами и документами
- Загрузка и хранение файлов (фото, документы)
- API для получения работ по категориям и документов

---

## Быстрый старт с помощью [uv](https://github.com/astral-sh/uv)

### 1. Клонируйте репозиторий и перейдите в папку проекта

```bash
git clone https://github.com/w00xy/shipWebsite
cd shipWebsite
```

### 2. Установите зависимости

```bash
uv sync
```

### 3. Проведите миграции базы данных

```bash
alembic upgrade head
```

### 4. Запустите приложение

```bash
uv run main.py
```

или (если у вас структура с backend):

```bash
uv run app/main.py
```

---

## Что будет запущено

- **API** на FastAPI:  
  Доступно по адресу [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI).
- **Админка** (SQLAdmin):  
  Доступна по адресу [http://localhost:8000/admin](http://localhost:8000/admin)  
  (требуется логин и пароль администратора).
- **Статические файлы** (загруженные фото и документы):  
  Доступны по адресу [http://localhost:8000/app/static/](http://localhost:8000/static/...)

---

## Основные эндпоинты

- `GET /api/works/{category_id}` — получить работы по категории
- `GET /api/documents` — получить список документов

---

## Переменные окружения

Создайте файл `.env` и укажите необходимые параметры (пример):

```.env
DB_URL=sqlite+aiosqlite:///./app/database.db
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
ADMIN_LOGIN=admin
ADMIN_PASSWORD=admin
```

---

## Примечания

- Для загрузки файлов используется папка `app/static`.
- Для работы с файлами и изображениями используется fastapi_storages.
- Для запуска админки нужен хотя бы один пользователь-администратор.

---
