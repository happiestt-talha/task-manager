import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_validator

from app.models import Priority


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Priority = Priority.medium
    due_date: Optional[datetime] = None

    @field_validator("title")
    @classmethod
    def title_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("title cannot be empty")
        return v.strip()


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[Priority] = None
    due_date: Optional[datetime] = None

    @field_validator("title")
    @classmethod
    def title_not_empty(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and not v.strip():
            raise ValueError("title cannot be empty")
        return v.strip() if v else v


class TaskOut(TaskBase):
    id: uuid.UUID
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True