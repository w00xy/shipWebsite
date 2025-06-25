from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy import func
from fastapi_storages.integrations.sqlalchemy import FileType

from .schemas import UserSchema, WorkCategorySchema, WorkExampleSchema, DocumentSchema
from config import storage

class Base(DeclarativeBase):
    pass

class BaseModel(Base):
    __abstract__ = True
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

class User(BaseModel):
    __tablename__ = "users"
    __pydantic_model__ = UserSchema

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=True, default=None)
    hashed_pwd = Column(String, nullable=False)

class WorkCategory(BaseModel):
    __tablename__ = "work_categories"
    __pydantic_model__ = WorkCategorySchema

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    short_description = Column(String(255), nullable=True)
    
    def __str__(self):
        return self.name
    
    def __repr__(self):
        return f"<WorkCategory(name={self.name})>"

class WorkExample(BaseModel):
    __tablename__ = "work_examples"
    __pydantic_model__ = WorkExampleSchema
    
    __name__ = "Примеры работ"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("work_categories.id"))
    photo = Column(FileType(storage=storage))
    title = Column(String(100), nullable=True)
    description = Column(String(255), nullable=True)
    
    category = relationship("WorkCategory", backref="examples")
    
    def __str__(self):
        return self.title


class Document(BaseModel):
    __tablename__ = "documents"
    __pydantic_model__ = DocumentSchema

    id = Column(Integer, primary_key=True, autoincrement=True)
    photo = Column(FileType(storage=storage))
    file = Column(FileType(storage=storage))
