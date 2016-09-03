from unittest import TestCase
from model import *
from server import app
import server

def setUp(self):
    """Stuff to do before every test"""

    #Get the Flask test client
    self.client = app.test_client()

    #Show Flask errors that happen during tests
    app.config["TESTING"] = True

    #Connect to test database

    connect_to_db(app, "postgresql:///testdb")

    #Create tables and add sample data
    db.create_all()
    example_data()

    #Make mock

    def 

    def tearDown(self):
        """Do at end of every test"""

        db.session.close()
        db.drop_all()




if __name__ == "__main__":
    import unittest

    unittest.main()