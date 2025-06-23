import asyncio
from passlib.context import CryptContext
from sqlalchemy import select
from database.engine import session_maker
from database.models import User

from config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_admin():
    async with session_maker() as session:
        # Проверяем, есть ли уже такой пользователь
        result = await session.execute(select(User).where(User.username == settings.ADMIN_LOGIN))
        user = result.scalar_one_or_none()
        if user:
            print("Админ уже существует")
            return

        # Создаём нового пользователя-админа
        hashed_pwd = pwd_context.hash(settings.ADMIN_PASSWORD)
        admin = User(
            username=settings.ADMIN_LOGIN,
            email="admin@admin.com",
            hashed_pwd=hashed_pwd
        )
        session.add(admin)
        await session.commit()
        print("Админ успешно создан")

# Для запуска вручную:
if __name__ == "__main__":
    asyncio.run(create_admin())
