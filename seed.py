"""Loads in from json file and populated the locations table"""

import json

from sqlalchemy import func
from model import Location

from model import connect_to_db, db
from server import app

def load_location_data():
    """Load location data from zipasaur.json into locations database"""

    print "Location"

    #Delete all rows in table, so if we need to run this a second time, we
    #won't be trying to add duplicate users
    Location.query.delete()

    #Read zipasaur.json file and insert data

    location_dict = json.load(open("seed_data/zipasaur.json"))

    location_json = json.dumps(location_dict)

    return location_json



if __name__ == "__main__":
# As a convenience, if we run this module interactively, it will leave
# you in a state of being able to work with the database directly.

    connect_to_db(app)
    print "Connected to DB."
