"""
User Post
"""
from typing import Optional

import flask
from bson import ObjectId
from flask import Response, jsonify

from Models.Incident import Incident
from data_manager.crew_ms_db import CREW_MS_DB


def create_incident(doc: dict) -> Response:
    # The frontend creates a user using this API
    try:
        incident_rec = Incident.from_json(doc.get('create_incident'))
        CREW_MS_DB.incident_coll.insert_one(incident_rec.to_json())
        return jsonify(incident_rec.oid.__str__())
    except RuntimeError:
        return jsonify('Incident Record Creation Failed!')

