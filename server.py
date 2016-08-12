from jinja2 import StrictUndefined

from flask import Flask, render_template, redirect, request, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from model import *

app = Flask(__name__)

#required to use Flask sessions and the debug toolbar
app.secret_key = "ABC"

# Normally, if you use an undefined variable in Jinja2, it fails
# silently. This is horrible. Fix this so that, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def index():
    """homepage"""

    return render_template("homepage.html")
    

@app.route('/login', methods=["GET", "POST"])
def login():
    """Login page"""

    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')
        result = User.get_user_by_email_and_password(email, password)

        if result:
            #flash('Hello %s, you are logged in' % email)
            session["user_id"] = result.user_id
            return redirect('/updates')
        else:
            #flash("Error, %s and password did not match registered user" % email)
            return redirect('/login')

    else:
        return render_template('login.html')
    

@app.route('/register', methods=["GET", "POST"])
def register():
    """Register new user"""

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        first_name = request.form.get('firstname')
        last_name = request.form.get('lastname')
        zipcode = request.form.get('zipcode')
        result = User.get_user_by_email(email)
        print result

        if result:
            #Show alert, username exists
            #flash('That %s already exists. Please try login or try a different username and password') % email
            return redirect('/register')
        else:
            User.add_user(email, password, first_name, last_name, zipcode)
            #flash('%s has been successfully registered and logged in') % email
            #session['user_id'] = result.user_id
            return redirect('/login')

    else:
        return render_template("register.html")


@app.route('/logout')
def logout_user():
    """logout user"""

    # flash('Logged out')
    del session['user_id']

    return redirect('/')


@app.route('/updates')
def post_updates():

    user_id = session['user_id']
    user = User.query.get(user_id)
    update = Update.query.filter_by(user=user).all()

    return render_template('updates.html', user=user, update=update)


@app.route('/update-zipcode', methods=["POST"])
def zipcode_update():
    """replace the zipcode with a new value"""


    user_id = session['user_id']
    zipcode = request.form.get('zipcode')

    User.update_zipcode(user_id, zipcode)

    return "Zip code updated"


@app.route('/update-post', methods=["POST"])
def post_update():
    """add post to updates table"""

    user_id = session['user_id']
    post = request.form.get('post')

    Update.add_update(user_id, post)

    return "Updated Post"


@app.route('/friends')
def show_friends():
    """show and add friends"""

    user_id = session['user_id']
    user = User.query.get(user_id)

    return render_template('friends.html', user=user)


@app.route("/friend-search", methods=["POST"])
def search_for_friend():
    """Search for a friend"""


    user_id = session['user_id']
    email = request.form.get('email')

    user = User.get_user_by_email(email)

    return user




if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True

    connect_to_db(app)
    db.create_all()

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")