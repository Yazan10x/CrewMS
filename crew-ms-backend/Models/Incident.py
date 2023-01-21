"""
This File Contains the Incident Model
"""
# Python Imports:
from __future__ import annotations

from datetime import datetime
from typing import Optional
from bson import ObjectId

# USEC Imports
from data_manager.crew_ms_db import CREW_MS_DB


class Incident:

    oid: ObjectId
    user_id: str
    incident_type: str
    associated_users: list[str]  # list[str(ObjectId)]!
    date: datetime
    status: str
    description: str

    def __init__(self,
                 oid: ObjectId,
                 user_id: str,
                 incident_type: str,
                 associated_users: list[str],  # list[str(ObjectId)]!
                 date: datetime,
                 status: str,
                 description: str
                 ) -> None:
        self.oid = oid
        self.user_id = user_id
        self.incident_type = incident_type
        self.associated_users = associated_users  # list[str(ObjectId)]!
        self.date = date
        self.status = status
        self.description = description

    def to_json(self) -> dict:
        return \
            {
                '_id': self.oid,
                'user_id': self.user_id,
                'incident_type': self.incident_type,
                'associated_users': self.associated_users,
                'date': self.date,
                'status': self.status,
                'description': self.description,
            }

    @staticmethod
    def from_json(doc: dict) -> Incident:
        return Incident(
            oid=doc['_id'],
            user_id=doc['user_id'],
            incident_type=doc['incident_type'],
            associated_users=doc['associated_users'],
            date=doc['date'],
            status=doc['status'],
            description=doc['description']
        )

    def __repr__(self) -> str:
        return f'Incident: {self.incident_type}'
