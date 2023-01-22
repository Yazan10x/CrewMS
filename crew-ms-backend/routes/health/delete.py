"""
Health Get
"""
from typing import Any, Dict, List, Optional

from bson import ObjectId
from flask import Response, jsonify

from Models.Health import Health
from data_manager.crew_ms_db import CREW_MS_DB


def delete_health(_id: ObjectId) -> Optional[Response]:
    res = CREW_MS_DB.health_coll.delete_one({'_id': _id})
    return jsonify(res.__str__())
