# Python Imports
import flask
from flask import Blueprint, Response
from bson import ObjectId

# USEC Imports
from routes.health import get, post, delete

health = Blueprint('health', __name__)


@health.route("/get_health/<health_id>", methods=['GET'])
def get_health(user_id: str) -> Response:
    return get.get_health(ObjectId(user_id))


@health.route("/delete_health/<health_id>", methods=['DELETE'])
def delete_health(user_id: str) -> Response:
    return delete.delete_health(ObjectId(user_id))


@health.route("/get_health_records_by", methods=['POST'])
def get_all_health() -> Response:
    return post.get_health_records_by(flask.request.get_json(silent=True))


@health.route("/create_health_log", methods=['POST'])
def create_health_rec() -> Response:
    return post.create_health_log(flask.request.get_json(silent=True))
