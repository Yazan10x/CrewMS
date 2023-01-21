# Python Imports
import flask
from flask import Blueprint, Response, jsonify
from bson import ObjectId

# USEC Imports
from routes.health import get, post

health = Blueprint('health', __name__)


@health.route("/get_health/<health_id>", methods=['GET'])
def get_health(user_id: str) -> Response:
    return get.get_health(ObjectId(user_id))


@health.route("/get_health_records_by", methods=['POST'])
def get_all_health() -> Response:
    return post.get_health_records_by(flask.request.get_json(silent=True))

#
# @health.route("/get_simple_users", methods=['GET'])
# def get_simple_users() -> Response:
#     return post.get_simple_users()
#
#
# @health.route("/create_user", methods=['POST'])
# # @auth.login_required
# def create_user() -> Response:
#     return post.create_user(flask.request.get_json(silent=True))
