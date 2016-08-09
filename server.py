from jinja2 import StrictUndefined

from flask import Flask, render_template, redirect, request, flash, session
from flask_debugtoolbar import DebugToolbarExtension

from model import *

app = Flask(__name__)

#required to use Flask sessions and the debug toolbar
app.secret_key = "ABC"

# Normally, if you use an undefined variable in Jinja2, it fails
# silently. This is horrible. Fix this so that, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined

@app.route('/', methods=['GET', 'POST'])
def index():
    """homepage"""

    return render_template("homepage.html")
    

@app.route('/login', methods=["GET", "POST"])
def login():
    """Login page"""

    if request.method =="POST":
        user_email = request.form.get('email')
        user_password = request.form.get('password')
        result = get_user_by_email_and_password(user_email, user_password)

        if result:
            flash('Hello %s, you are logged in' % user_email)
            session["user_id"] = result.user_id
            return redirect('/updates')
        else:
            flash("Error, %s and password did not match" % user_email)
            return redirect('/login')

    else:
        return render_template('login.html')
    

@app.route('/register', methods=["GET", "POST"])
def register():
    """Register new user"""

    if request.method == 'POST':
        user_email = request.form.get('email')
        user_password = request.form.get('password')
        user_firstname = request.form.get('firstname')
        user_lastname = request.form.get('lastname')
        user_zipcode = request.form.get('zipcode')
        result = get_user_by_email(user_email)

        if result:
            #Show alert, username exists
            flash('That %s already exists. Please try login or try a different username and password') % user_email
            return redirect('/register')
        else:
            add_user(user_email, user_password, user_firstname, user_lastname, user_zipcode)
            flash('%s has been successfully registered and logged in') % user_email
            session['user_id'] = result.user_id
            return render_template('updates.html', user_firstname=user_firstname)

    else:
        return render_template("register.html")



if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")