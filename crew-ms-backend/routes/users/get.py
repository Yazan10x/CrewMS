"""
User Get
"""

from bson import ObjectId
from flask import Response, jsonify

from Models.User import User
from data_manager.crew_ms_db import CREW_MS_DB


def get_user(user_id: ObjectId) -> Response:
    user = dict(CREW_MS_DB.users_coll.find_one({"_id": user_id}))
    user = User.from_json(user).to_json()
    user['_id'] = str(user['_id'])
    return jsonify(user)


def get_users() -> Response:
    mongo_users = CREW_MS_DB.users_coll.find()
    users: list[dict] = []
    for user in mongo_users:
        user = User.from_json(user).to_json()
        user['_id'] = str(user['_id'])
        users.append(user)
    return jsonify(users)
