"""
Health Post
"""
from typing import Optional

import flask
from bson import ObjectId
from flask import Response, jsonify

from Models.Health import Health
from data_manager.crew_ms_db import CREW_MS_DB


def get_health_records_by(query: dict) -> Response:
    all_docs = CREW_MS_DB.health.find(query)
    all_log: list[dict] = []
    for doc in all_docs:
        log = Health.from_json(doc).to_json()
        log['_id'] = str(log['_id'])
        log['user_id'] = str(log['user_id'])
        all_log.append(log)
    return jsonify(all_log)

#
# def create_health_log(doc: dict) -> Response:
#     # The frontend creates a user using this API
#     try:
#         health_rec = _create_health_log(doc)
#         if health_rec is None:
#             return jsonify('Health Record Create Failed!')
#         else:
#             return jsonify(health_rec.oid.__str__())
#     except RuntimeError:
#         return jsonify('Health Record Create Failed!')
#
#
# def _create_health_log(doc: dict) -> Optional[Health]:
#     # Add a new Object ID and Initiate a User Object
#     doc.setdefault('_id', ObjectId())
#     health_rec: Health = Health.from_json(doc)
#
#     # Confirm that this account was not created before by checking the uniqueness of
#     # Username / Personal Email / UofT Email / Student Number
#
#     username_query = {'username': user.username}
#     email_query = {'email': user.profile.email}
#
#     if CREW_MS_DB.users_coll.find_one(
#             username_query) or CREW_MS_DB.users_coll.find_one(email_query):
#         raise ValueError('This User Already Exists')
#
#     # The new user gets inserted into the DB
#     user_json: dict = user.to_json()
#     if CREW_MS_DB.users_coll.insert_one(user_json):
#         return user
#     else:
#         return None
#
#
# def save(self) -> Response:
#     CREW_MS_DB.health.insert_one(self.to_json())
#     return jsonify('Health Log Created')
#
#
# def update(self) -> Response:
#     CREW_MS_DB.health.update_one({'_id': self.oid}, {'$set': self.to_json()})
#     return jsonify('Health Log Updated')
