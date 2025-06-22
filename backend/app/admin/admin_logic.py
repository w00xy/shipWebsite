from sqladmin.authentication import AuthenticationBackend
from fastapi import Request
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.engine import session_maker
from database.models import User
from config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AdminAuth(AuthenticationBackend):
    def __init__(self, secret_key: str):
        super().__init__(secret_key=secret_key)

    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]

        async with session_maker() as session:  # type: AsyncSession
            result = await session.execute(
                select(User).where(User.username == username)
            )
            user = result.scalar_one_or_none()

            if user is None:
                return False

            if not pwd_context.verify(password, user.hashed_pwd):
                return False

            # Авторизация успешна, сохраняем id пользователя в сессии
            request.session.update({"user_id": user.id})
            return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        user_id = request.session.get("user_id")
        if not user_id:
            return False
        return True
