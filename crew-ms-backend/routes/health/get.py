"""
Health Get
"""
from typing import Any, Dict, List, Optional

from bson import ObjectId
from flask import Response, jsonify

from Models.Health import Health
from data_manager.crew_ms_db import CREW_MS_DB


def get_health(_id: ObjectId) -> Optional[Response]:
    hel = CREW_MS_DB.health.find.one({'_id': _id})
    hel = Health.from_json(hel).to_json()
    hel['_id'] = str(hel['_id'])
    hel['user_id'] = str(hel['user_id'])
    return jsonify(hel)
