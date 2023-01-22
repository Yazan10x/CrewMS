"""
This File Contains the Health Model
"""
# Python Imports:
from __future__ import annotations

from datetime import datetime
from typing import Optional
from bson import ObjectId

from data_manager.crew_ms_db import CREW_MS_DB


class Health:
    oid: ObjectId
    user_id: str
    bpm: float
    blood_pressure: float
    blood_oxygen: float
    temperature: float
    timestamp: datetime
    weight: float
    symptoms: str
    hygiene: list[str]
    workspace: dict[str, int]
    diet: float
    rest: int
    mental_health: dict[str, int]

    def __init__(self,
                 user_id: str,
                 bpm: float,
                 blood_pressure: float,
                 blood_oxygen: float,
                 temperature: float,
                 timestamp: datetime,
                 weight: float,
                 symptoms: str,
                 hygiene: list[str],
                 workspace: dict[str, int],
                 diet: float,
                 rest: int,
                 mental_health: dict[str, int],
                 ) -> None:
        self.user_id = user_id
        self.bpm = bpm
        self.blood_pressure = blood_pressure
        self.blood_oxygen = blood_oxygen
        self.temperature = temperature
        self.timestamp = timestamp
        self.weight = weight
        self.symptoms = symptoms
        self.hygiene = hygiene
        self.workspace = workspace
        self.diet = diet
        self.rest = rest
        self.mental_health = mental_health

    @staticmethod
    def from_json(doc: dict) -> Health:
        return Health(
            user_id=doc['user_id'],
            bpm=doc['bpm'],
            blood_pressure=doc['blood_pressure'],
            blood_oxygen=doc['blood_oxygen'],
            temperature=doc['temperature'],
            timestamp=doc['timestamp'],
            weight=doc['weight'],
            symptoms=doc['symptoms'],
            hygiene=doc['hygiene'],
            workspace=doc['workspace'],
            diet=doc['diet'],
            rest=doc['rest'],
            mental_health=doc['mental_health'],
        )

    def to_json(self) -> dict:
        return \
            {
                'user_id': self.user_id,
                'bpm': self.bpm,
                'blood_pressure': self.blood_pressure,
                'blood_oxygen': self.blood_oxygen,
                'temperature': self.temperature,
                'timestamp': self.timestamp,
                'weight': self.weight,
                'symptoms': self.symptoms,
                'hygiene': self.hygiene,
                'workspace': self.workspace,
                'diet': self.diet,
                'rest': self.rest,
                'mental_health': self.mental_health,
            }

    def __repr__(self):
        return f'Health({self.user_id}, {self.bpm}, {self.blood_pressure}, ' \
               f'{self.blood_oxygen}, {self.temperature}, {self.timestamp}, ' \
               f'{self.weight}, {self.symptoms}, {self.hygiene}, ' \
               f'{self.workspace}, {self.diet}, {self.rest}, {self.mental_health})'

    def __str__(self):
        return f'Health({self.user_id}, {self.bpm}, {self.blood_pressure}, ' \
               f'{self.blood_oxygen}, {self.temperature}, {self.timestamp}, ' \
               f'{self.weight}, {self.symptoms}, {self.hygiene}, ' \
               f'{self.workspace}, {self.diet}, {self.rest}, {self.mental_health})'
# ===================================
# Path: crew-ms-backend\routes\health\__init__.py
# Compare this snippet from crew-ms-backend\routes\health\__init__.py:
