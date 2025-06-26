#!/bin/bash
set -e

echo "=== Установка Docker ==="
if ! command -v docker &> /dev/null; then
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
    sudo usermod -aG docker $USER
    echo "⚠️ Перезагрузите сервер после установки: sudo reboot"
else
    echo "Docker уже установлен"
fi



echo "=== Установка Docker Compose ==="
if ! command -v docker compose &> /dev/null; then
    sudo apt-get install -y docker-compose-plugin
else
    echo "Docker Compose уже установлен"
fi



echo "=== Проверка необходимых файлов ==="
REQUIRED_FILES=(
    "./backend/app/database.db"
    "./backend/app/static"
)

MISSING_FILES=()
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -e "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -ne 0 ]; then
    echo "ОШИБКА: Отсутствуют необходимые файлы/директории:"
    for missing in "${MISSING_FILES[@]}"; do
        echo "  - $missing"
    done
    echo "Пожалуйста, подготовьте эти файлы перед запуском скрипта."
    exit 1
fi



# echo "=== Создание базовых конфигураций ==="
# # Фронтенд: .env.production
# if [ ! -f ./frontend/.env.production ]; then
#     cat > ./frontend/.env.production <<EOF
# VITE_API_URL=http://localhost:8000
# # Другие переменные:
# # VITE_SITE_NAME=MySite
# EOF
#     echo "Создан frontend/.env.production"
# fi



# Бэкенд: .env
if [ ! -f ./backend/app/.env ]; then
    cat > ./backend/app/.env <<EOF
# Путь к БД
DB_URL=sqlite+aiosqlite:///./database.db

# JWT настройка
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256

# логин и пароль для админа
ADMIN_LOGIN=admin
ADMIN_PASSWORD=password

EOF
    echo "Создан backend/app/.env"
fi

echo "=== Запуск Docker Compose ==="
sudo docker compose up -d --build

echo "=== Проверка сервисов ==="
sleep 5
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "=== Инструкция по завершению ==="
echo "1. В случае изменения файлов сервера или фронтенда: sudo docker compose up -d --build"
echo ""
echo "Фронтенд доступен по: http://$(curl -s ifconfig.me)"
echo "Бэкенд доступен по: http://$(curl -s ifconfig.me):8000"
echo ""
echo "Для просмотра логов:"
echo "  sudo docker compose logs -f backend"
echo "  sudo docker compose logs -f frontend"