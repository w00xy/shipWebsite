from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class BaseSchema(BaseModel):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class UserSchema(BaseSchema):
    username: str
    email: Optional[EmailStr] = None

class UserCreateSchema(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    password: str

class WorkCategorySchema(BaseSchema):
    name: str
    short_description: Optional[str] = None

class WorkCategoryCreateSchema(BaseModel):
    name: str
    short_description: Optional[str] = None

class WorkExampleSchema(BaseSchema):
    category_id: int
    photo: str
    title: Optional[str] = None
    description: Optional[str] = None

class WorkExampleCreateSchema(BaseModel):
    category_id: int
    photo: str
    title: Optional[str] = None
    description: Optional[str] = None

class DocumentSchema(BaseSchema):
    photo: str
    file: str

class DocumentCreateSchema(BaseModel):
    photo: str
    file: str
