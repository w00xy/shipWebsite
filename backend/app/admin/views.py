from sqladmin import ModelView
from markupsafe import Markup
from database.models import User, WorkCategory, WorkExample, Document
from sqlalchemy.orm import Session
import uuid
import os
from fastapi import UploadFile

def image_formatter(obj, prop):
    value = getattr(obj, prop)
    if value:
        src = "/" + value if not value.startswith("/") else value
        src = src.replace("app/", "")
        return Markup(f'<img src="{src}" alt="photo" style="max-height: 200px;">')
    return ""

def file_link_formatter(obj, prop):
    value = getattr(obj, prop)
    if value:
        src = "/" + value if not value.startswith("/") else value
        src = src.replace("app/", "")
        filename = src.split("/")[-1]
        return Markup(f'<a href="{src}" download="{filename}">Скачать файл</a>')
    return ""

def category_formatter(obj, prop):
    category = getattr(obj, prop)
    if category:
        return f"{category.name}"
    return ""

class UserAdmin(ModelView, model=User):
    can_create = True
    can_delete = True
    can_edit = True
    can_view_details = True
    
    name = "Пользователь"
    name_plural = "Пользователи"
    
    column_exclude_list = [User.hashed_pwd, User.created_at, User.updated_at]
    form_excluded_columns = [User.created_at, User.updated_at]
    column_details_list = [User.id, User.username, User.email, User.created_at, User.updated_at]

class WorkCategoryAdmin(ModelView, model=WorkCategory):
    can_create = True
    can_delete = True
    can_edit = True
    can_view_details = True
    
    name = "Категория"
    name_plural = "Категории"
    
    column_exclude_list = [WorkCategory.created_at, WorkCategory.updated_at]
    form_excluded_columns = [WorkCategory.created_at, WorkCategory.updated_at]
    column_details_list = [WorkCategory.id, WorkCategory.name, WorkCategory.short_description, WorkCategory.created_at, WorkCategory.updated_at]

class WorkExampleAdmin(ModelView, model=WorkExample):
    can_create = True
    can_delete = True
    can_edit = True
    can_view_details = True
    
    name = "Пример работы"
    name_plural = "Примеры работ"
    
    column_exclude_list = [WorkExample.created_at, WorkExample.updated_at]
    form_excluded_columns = [WorkExample.created_at, WorkExample.updated_at]
    column_details_list = [
        WorkExample.id,
        WorkExample.category,
        WorkExample.photo,
        WorkExample.title,
        WorkExample.description,
        WorkExample.created_at,
        WorkExample.updated_at,
    ]
    column_formatters = {
        "photo": image_formatter,
        "category": category_formatter
    }
    form_choices = {
        "category": lambda session: [
            (c.id, c.name) for c in session.query(WorkCategory).all()
        ]
    }

    async def create_model(self, request, data):
        file: UploadFile = data.get("photo")
        if file:
            ext = os.path.splitext(file.filename)[1]
            file.filename = f"{uuid.uuid4().hex}{ext}"
        return await super().create_model(request, data)

    async def update_model(self, request, pk, data):
        file: UploadFile = data.get("photo")
        if file:
            ext = os.path.splitext(file.filename)[1]
            file.filename = f"{uuid.uuid4().hex}{ext}"
        return await super().update_model(request, pk, data)

class DocumentAdmin(ModelView, model=Document):
    can_create = True
    can_delete = True
    can_edit = True
    can_view_details = True
    
    name = "Документ"
    name_plural = "Документы"
    
    column_exclude_list = [Document.created_at, Document.updated_at]
    form_excluded_columns = [Document.created_at, Document.updated_at]
    column_details_list = [Document.id, Document.photo, Document.file, Document.created_at, Document.updated_at]
    column_formatters = {
        "photo": image_formatter,
        "file": file_link_formatter
    }

    async def create_model(self, request, data):
        photo: UploadFile = data.get("photo")
        if photo:
            ext = os.path.splitext(photo.filename)[1]
            photo.filename = f"{uuid.uuid4().hex}{ext}"
        file: UploadFile = data.get("file")
        if file:
            ext = os.path.splitext(file.filename)[1]
            file.filename = f"{uuid.uuid4().hex}{ext}"
        return await super().create_model(request, data)

    async def update_model(self, request, pk, data):
        photo: UploadFile = data.get("photo")
        if photo:
            ext = os.path.splitext(photo.filename)[1]
            photo.filename = f"{uuid.uuid4().hex}{ext}"
        file: UploadFile = data.get("file")
        if file:
            ext = os.path.splitext(file.filename)[1]
            file.filename = f"{uuid.uuid4().hex}{ext}"
        return await super().update_model(request, pk, data)
