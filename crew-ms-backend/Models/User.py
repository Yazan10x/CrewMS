"""
This File Contains the User Model
"""
# Python Imports:
from __future__ import annotations
from typing import Optional
from bson import ObjectId

# Imports
from data_manager.crew_ms_db import CREW_MS_DB


class User:
    class Profile:

        first_name: str
        last_name: str
        email: str
        crew_position: str
        bio: str
        profile_picture: str  # Address of image

        def __init__(self,
                     first_name: str,
                     last_name: str,
                     email: str,
                     crew_position: str,
                     bio: str,
                     profile_picture: str
                     ) -> None:
            self.first_name = first_name
            self.last_name = last_name
            self.email = email
            self.crew_position = crew_position
            self.bio = bio
            self.profile_picture = profile_picture

        @staticmethod
        def from_json(doc: dict) -> User.Profile:
            return User.Profile(
                first_name=doc['first_name'],
                last_name=doc['last_name'],
                email=doc['email'],
                crew_position=doc['crew_position'],
                bio=doc['bio'],
                profile_picture=doc['profile_picture'],
            )

        def to_json(self) -> dict:
            return \
                {
                    'first_name': self.first_name,
                    'last_name': self.last_name,
                    'email': self.email,
                    'crew_position': self.crew_position,
                    'bio': self.bio,
                    'profile_picture': self.profile_picture,
                }

    # ===================================

    oid: ObjectId
    username: str
    has_admin: bool
    profile: User.Profile

    def __init__(self,
                 oid: ObjectId,
                 username: str,
                 has_admin: bool,
                 profile: User.Profile,
                 ) -> None:
        self.oid = oid
        self.username = username
        self.has_admin = has_admin
        self.profile = profile

    def to_json(self) -> dict:
        return \
            {
                '_id': self.oid,
                'username': self.username,
                'has_admin': self.has_admin,
                'profile': self.profile.to_json(),
            }

    @staticmethod
    def from_json(doc: dict) -> User:
        return User(
            oid=doc['_id'],
            username=doc['username'],
            has_admin=doc['has_admin'],
            profile=User.Profile.from_json(doc['profile']),
        )

    def __repr__(self) -> str:
        return f'User: {self.profile.first_name} {self.profile.last_name}'
