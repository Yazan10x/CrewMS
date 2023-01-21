
"""
Access USEC_DB
"""
# Python Imports
from pymongo import MongoClient
from pymongo.collection import Collection

# USEC Imports
from data_manager._crew_ms_secrets import get_db


# Get DB From Cluster
USEC_DB_ADDRESS, USEC_DB_NAME = get_db()
_cluster = MongoClient(USEC_DB_ADDRESS)
_crew_ms_db = _cluster[USEC_DB_NAME]


class CREW_MS_DB:

    users_coll: Collection = _crew_ms_db.get_collection("users")
    health_coll: Collection = _crew_ms_db.get_collection("health")
    incident: Collection = _crew_ms_db.get_collection("incident")
