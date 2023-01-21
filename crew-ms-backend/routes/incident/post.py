"""
User Post
"""
from typing import Optional

import flask
from bson import ObjectId
from flask import Response, jsonify

from Models.User import User
from data_manager.crew_ms_db import CREW_MS_DB


def create_user(doc: dict) -> Response:
    # The frontend creates a user using this API
    try:
        user = _create_user(doc)
        if user is None:
            return jsonify('User Create Failed!')
        else:
            return jsonify(user.oid.__str__())
    except RuntimeError:
        return jsonify('User Create Failed!')


def _create_user(doc: dict) -> Optional[User]:
    # Add a new Object ID and Initiate a User Object
    doc.setdefault('_id', ObjectId())
    user: User = User.from_json(doc)

    # Confirm that this account was not created before by checking the uniqueness of
    # Username / Personal Email / UofT Email / Student Number

    username_query = {'username': user.username}
    email_query = {'email': user.profile.email}

    if CREW_MS_DB.users_coll.find_one(username_query) or CREW_MS_DB.users_coll.find_one(email_query):
        raise ValueError('This User Already Exists')

    # The new user gets inserted into the DB
    user_json: dict = user.to_json()
    if CREW_MS_DB.users_coll.insert_one(user_json):
        return user
    else:
        return None
