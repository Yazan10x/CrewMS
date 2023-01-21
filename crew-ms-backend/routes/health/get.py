"""
Health Get
"""
from typing import Any, Dict, List, Optional

from bson import ObjectId
from flask import Response, jsonify

from Models.Health import Health
from data_manager.crew_ms_db import CREW_MS_DB


def get_health(_id: ObjectId) -> Optional[Response]:
    health = CREW_MS_DB.health_coll.find_one({'_id': _id})
    health = Health.from_json(health).to_json()
    health['_id'] = str(health['_id'])
    return jsonify(health)
