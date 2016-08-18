"""Loads in from json file and populated the locations table"""

import json

from sqlalchemy import func
from model import Location
from model import User

from model import connect_to_db, db
from server import app

def load_location_data():
    """Load location data from zipasaur.json into locations database"""

    print "Location"

    #Delete all rows in table, so if we need to run this a second time, we
    #won't be trying to add duplicate users
    # Location.query.delete()

    #Read zipasaur.json file and insert data

    location_dict = json.load(open("seed_data/zipasaur.json"))
    

    for location in location_dict:
        zipcode = int(location.get('code'))
        city = location.get('city')
        county = location.get('county')
        lat = float(location.get('lat'))
        lng = float(location.get('lng'))
           
        location = Location(zipcode=zipcode,
                        city=city,
                        county=county,
                        lat=lat,
                        lng=lng)
        
        # Add to the session if not a duplicate
        result = Location.query.get(zipcode)
        if not result:
            db.session.add(location)
            print location

    #Commit to save adding it to the session
    db.session.commit()


if __name__ == "__main__":
# As a convenience, if we run this module interactively, it will leave
# you in a state of being able to work with the database directly.

    connect_to_db(app)
    print "Connected to DB."

    #create location table
    db.create_all()

    load_location_data()