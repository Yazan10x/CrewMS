"""
User Get
"""

from bson import ObjectId
from flask import Response, jsonify

from Models.Incident import Incident
from data_manager.crew_ms_db import CREW_MS_DB


def get_incident(incident_id: ObjectId) -> Response:
    incident = dict(CREW_MS_DB.users_coll.find_one({"_id": incident_id}))
    incident = Incident.from_json(incident).to_json()
    incident['_id'] = str(incident['_id'])
    incident['user_id'] = str(incident['user_id'])
    return jsonify(incident)


def get_incidents(query: dict) -> Response:
    mongo_incidents = CREW_MS_DB.incident_coll.find(query)
    incidents: list[dict] = []
    for incident in mongo_incidents:
        incident = Incident.from_json(incident).to_json()
        incident['_id'] = str(incident['_id'])
        incident['user_id'] = str(incident['user_id'])
        incidents.append(incident)
    return jsonify(incidents)
