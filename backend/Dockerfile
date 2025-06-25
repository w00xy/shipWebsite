# Используем официальный образ Python
FROM python:3.12-slim

# Устанавливаем uv
RUN pip install uv

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY pyproject.toml uv.lock ./

# Устанавливаем зависимости через uv
RUN uv sync --frozen

# Копируем исходный код приложения
COPY . .

# Переходим в папку app
WORKDIR /app/app

# Создаем папку для статических файлов
RUN mkdir -p static

# Устанавливаем права на папку static
RUN chmod 755 static

# Открываем порт
EXPOSE 8000

# Запускаем приложение через uvicorn из папки app
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
