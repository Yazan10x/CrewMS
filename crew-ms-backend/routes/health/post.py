"""
Health Post
"""
from typing import Optional

import flask
from bson import ObjectId, timestamp
from flask import Response, jsonify

from Models.Health import Health
from data_manager.crew_ms_db import CREW_MS_DB


def get_health_records_by(query: dict) -> Response:
    all_docs = CREW_MS_DB.health_coll.find(query)
    all_log: list[dict] = []
    for doc in all_docs:
        log = Health.from_json(doc).to_json()
        log['_id'] = str(log['_id'])
        all_log.append(log)
    return jsonify(all_log)


def create_health_log(doc: dict) -> Response:
    # The frontend creates a user using this API
    try:
        health_rec = Health.from_json(doc.get('create_health'))
        CREW_MS_DB.health_coll.insert_one(health_rec.to_json())
        return jsonify(health_rec.oid.__str__())
    except RuntimeError:
        return jsonify('Health Record Creation Failed!')

