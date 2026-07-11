import uuid
from typing import Optional

from sqlalchemy.orm import Session

from app import models, schemas


def get_tasks(
    db: Session,
    completed: Optional[bool] = None,
    priority: Optional[models.Priority] = None,
    sort: Optional[str] = None,
):
    query = db.query(models.Task)

    if completed is not None:
        query = query.filter(models.Task.completed == completed)
    if priority is not None:
        query = query.filter(models.Task.priority == priority)

    if sort == "due_date":
        query = query.order_by(models.Task.due_date.asc())
    elif sort == "-due_date":
        query = query.order_by(models.Task.due_date.desc())
    elif sort == "created_at":
        query = query.order_by(models.Task.created_at.asc())
    else:
        query = query.order_by(models.Task.created_at.desc())

    return query.all()


def get_task(db: Session, task_id: uuid.UUID):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, task_id: uuid.UUID, task_update: schemas.TaskUpdate):
    db_task = get_task(db, task_id)
    if not db_task:
        return None

    update_data = task_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: uuid.UUID):
    db_task = get_task(db, task_id)
    if not db_task:
        return None
    db.delete(db_task)
    db.commit()
    return db_task