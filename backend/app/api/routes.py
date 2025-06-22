from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from database.engine import get_db
from database.models import WorkExample, Document
from database.schemas import WorkExampleSchema, DocumentSchema

from sqlalchemy import select

router = APIRouter(prefix="/api", tags=["api"])

@router.get("/works/{category_id}", response_model=List[WorkExampleSchema])
async def get_works_by_category(category_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(WorkExample).where(WorkExample.category_id == category_id)
    )
    works = result.scalars().all()
    return works

@router.get("/documents", response_model=List[DocumentSchema])
async def get_documents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document))
    documents = result.scalars().all()
    return documents
