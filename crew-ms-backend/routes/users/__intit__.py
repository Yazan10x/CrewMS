# Python Imports
import flask
from flask import Blueprint, Response, jsonify
from bson import ObjectId

# USEC Imports
from routes.users import get, post

users = Blueprint('users', __name__)


@users.route("/get_user/<user_id>", methods=['GET'])
def get_user(user_id: str) -> Response:
    return get.get_user(ObjectId(user_id))


@users.route("/get_users", methods=['GET'])
def get_users() -> Response:
    return get.get_users()


@users.route("/get_simple_users", methods=['GET'])
def get_simple_users() -> Response:
    return get.get_simple_users()


@users.route("/create_user", methods=['POST'])
# @auth.login_required
def create_user() -> Response:
    return post.create_user(flask.request.get_json(silent=True))
