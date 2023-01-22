"""
User Get
"""

from bson import ObjectId
from flask import Response, jsonify

from Models.Incident import Incident
from data_manager.crew_ms_db import CREW_MS_DB


def get_incident(incident_id: ObjectId) -> Response:
    res = CREW_MS_DB.incident_coll.delete_one({"_id": incident_id})
    return jsonify(res.__str__())
