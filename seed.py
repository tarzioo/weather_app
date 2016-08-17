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

    #split into list with each '{'
    location_lst = location_json.split('{')

    #location_lst [0] is not usable data, it is  '[',   so it is spliced off so unpacking will not error
    location_lst = location_lst[1:]

    #unpack location_lst. The only data that is needed is city, zipcode, county, lat, lng. The rest will be unpacked but not added to the location table.  

    for item in location_lst:
        city_title, city, zipcode_title, zipcode, state_full_title, state_full, county_title, county, state_abbrev_title, state_abbrev, lat_title, lat, lng_title, lng, throwaway = item.split(" ")

            #Remove unnecessary string and commas
            city = city[1:-2]
            zipcode = int(zipcode[1:-2])
            county = county[1:-2]
            lat = float(lat[1:-2])
            lng = float(lng[1:-3])

            #add to location table
            location = Location(zipcode=zipcode,
                        city=city,
                        county=county,
                        lat=lat,
                        lng=lng)

            #Add to the session
            db.session.add(location)

        #Commit to save adding it to the session
        db.session.commit()    


    return location_lst



if __name__ == "__main__":
# As a convenience, if we run this module interactively, it will leave
# you in a state of being able to work with the database directly.

    connect_to_db(app)
    print "Connected to DB."

    #create location table
    db.create_all()

    import load_location_data()
