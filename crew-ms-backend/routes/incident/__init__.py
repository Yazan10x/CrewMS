# Python Imports
import flask
from flask import Blueprint, Response, jsonify
from bson import ObjectId

from routes.incident import get, post

incidents = Blueprint('incidents', __name__)


@incidents.route("/get_incident/<incident_id>", methods=['GET'])
def get_incident(incident: str) -> Response:
    return get.get_incident(ObjectId(incident))


@incidents.route("/get_incidents_by", methods=['POST'])
def get_incidents() -> Response:
    return get.get_incidents(flask.request.get_json(silent=True))


@incidents.route("/create_incident", methods=['POST'])
def create_incident() -> Response:
    return post.create_incident(flask.request.get_json(silent=True))