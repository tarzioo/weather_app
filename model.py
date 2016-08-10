"""Models and database functions for project"""

from flask_sqlalchemy import SQLAlchemy
import datetime

# This is the connection to the PostgreSQL database; we're getting this through
# the Flask-SQLAlchemy helper library. On this, we can find the `session`
# object, where we do most of our interactions (like committing, etc.)

db = SQLAlchemy()


##############################################################################
# Model definitions

class User(db.Model):
    """User of weather app"""


    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    zipcode = db.Column(db.String(15), nullable=False)

    @staticmethod
    def add_user(email, password, first_name, last_name, zipcode):
        """Add new user"""


        user = User(email=email, password=password, first_name=first_name,
                last_name=last_name, zipcode=zipcode)

        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def get_user_by_email_and_password(email, password):
        """Get existing user by email and password"""


        user = User.query.filter_by(email=email, password=password).first()

        return user


    @staticmethod
    def get_user_by_email(email):
        """get existing user by email"""


        user = User.query.filter_by(email=email).first()

        return user

    @staticmethod
    def update_zipcode(user_id, zipcode):
        """update existing zipcode"""

        user = User.query.filter_by(user_id=user_id).first()
        user.zipcode = zipcode
        db.session.commit()

        return user






    def __repr__(self):
        """Provide helpful representation when printed"""

        return "<User user_id=%s email=%s first_name=%s last_name=%s zipcode=%s>" % (self.user_id, self.email, self.first_name, self.last_name, self.zipcode)


class Update(db.Model):
    """Table to store updates being posted"""


    __tablename__ = "updates"

    update_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    time = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    post = db.Column(db.String(500), nullable=False)


    @staticmethod
    def add_update(user, post):
        """Add update post"""

        update = Update(post=post, user=user)

        db.session.add(update)
        db.session.commit()

        return update


    def __repr__(self):
        """Provide helpful representation when printed"""


        return "<Update update_id=%s user=%s time=%s post=%s>" % (self.update_id, self.user, self.time, self.post)


##############################################################################
# Add, update, delete functions




##############################################################################
# Query functions





##############################################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///weather'
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app
    connect_to_db(app)
    print "Connected to DB."