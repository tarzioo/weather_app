from jinja2 import StrictUndefined

from flask import Flask, render_template, redirect, request, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from urllib2 import Request, urlopen, URLError
import requests
from pprint import pprint
import json

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
        zipcode = int(request.form.get('zipcode'))
        private = int(request.form.get('private'))
        result = User.get_user_by_email(email)

        print result

        if result:
            #Show alert, username exists
            #flash('That %s already exists. Please try login or try a different username and password') % email
            return redirect('/register')
        else:
            User.add_user(email, password, first_name, last_name, zipcode, private)
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
    friendship_list = Friendship.get_friendship_list(user_id)
    result = Update.query.filter(Update.user_id.in_(friendship_list)).order_by('time desc').all()

    #print user.location

    return render_template('updates.html', user=user, result=result)


@app.route('/update-zipcode', methods=["POST"])
def zipcode_update():
    """replace the zipcode with a new value"""


    user_id = session['user_id']
    zipcode = int(request.form.get('zipcode'))

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
    friendship = Friendship.query.get(user_id)

    return render_template('friends.html', user=user, friendship=friendship)


@app.route("/friend-search", methods=["POST"])
def search_for_friend():
    """Search for a friend"""

    user_id = session['user_id']
    email = request.form.get('email')

    user = User.get_user_by_email(email)

    user_json = {
                'first_name': user.first_name, 'last_name': user.last_name, "friend_id": user.user_id

    }

    return jsonify(user_json)

@app.route("/add-friend", methods=["POST"])
def add_friend():
    user_id = session['user_id']
    add_friend = request.form.get("add-friend")
    friend_id = request.form.get("friend_id")
    friendship = Friendship.add_friend(user_id, friend_id)

    print "This is the friend id", friend_id

    return 'friend added'

@app.route('/map')
def show_location_info():

    user_id = session['user_id']
    user = User.query.get(user_id)


    return render_template('map.html', user=user)


@app.route('/friends_map.json')
def status_location_info():
    """json info about each status location"""
    user_id = session['user_id']
    # user = User.query.get(user_id)
    # friends_updates = Update.get_friends_updates(user_id)

    friends = {
        status.update_id: {
            "userName": status.user.first_name,
            "post": status.post,
            "postedAt": status.time,
            "postedCounty": status.posted_county,
            "postedLat": status.posted_lat,
            "postedLng": status.posted_lng
        }
        for status in Update.get_friends_updates(user_id)}
    pprint(friends)

    return jsonify(friends)


@app.route('/strangers_map.json')
def status_location_info_nonfriends():

    user_id = session["user_id"]
    print "user id", session["user_id"]
    # user = User.query.get(user_id)
    result = Update.get_all_updates(user_id)
    print "result:",  result
    strangers = {
        status.update_id: {
            "userName": status.user.first_name,
            "post": status.post,
            "postedAt": status.time,
            "postedCounty": status.posted_county,
            "postedLat": status.posted_lat,
            "postedLng": status.posted_lng
        }
        for status in Update.get_all_updates(user_id)}
    pprint(strangers)

    return jsonify(strangers)



@app.route('/alerts')
def show_alerts():
    """use weather.io api to get alerts for each county"""

    user_id = session['user_id']
    user = User.query.get(user_id)


    return render_template("alerts.html", user=user)


@app.route('/alerts.json')
def alerts_info():

    user_id = session['user_id']
    user = User.query.get(user_id)
    lat = str(user.location.lat)
    lng = str(user.location.lng)


    r = requests.get('https://api.forecast.io/forecast/45713f3bbbe3402dbe4aff89c61caccd/' + lat + "," + lng)


    data = r.json()
    # pprint(data)

    alerts = {
            'apparentTemperature': data['currently']['apparentTemperature'],
            'humidity': data['currently']['humidity'],
            # 'nearestStormBearing': data['currently']['nearestStormBearing'],
            "nearestStormDistance": data["currently"]["nearestStormDistance"],
            "summary": data['currently']["summary"],
            # "windBearing": data["daily"]["windBearing"],
            # "windSpeed": data["daily"]["data"]["windSpeed"]
    }


    return jsonify(alerts)


@app.route('/alerts-extra.json')
def show_additional_alerts():

    user_id = session['user_id']
    user = User.query.get(user_id)
    city = user.location.city

    data = get_alerts(city)

    print "print data", data
    print "this is the length of data", len(data["alerts"])

    if len(data["alerts"]) > 0:

        alerts = {
            "description": data["alerts"][0]["description"],
            "date": data["alerts"][0]["date"],
            "expires": data["alerts"][0]["expires"],
            "message": data["alerts"][0]["message"]
        }

    else:

        alerts = {
            "message": "No active Alert"
        }


    return jsonify(alerts)


@app.route('/alert-details.json')
def show_type_of_alert():

    user_id = session['user_id']
    user = User.query.get(user_id)
    city = user.location.city
    data = get_alerts(city)

    alert_details = get_alert_type_and_level(data)

    if len(alert_details) > 1:
        alert = {
                "alertLevel": alert_details[0],
                "alertType": alert_details[1]
        }

    else:

        alert = {
            "message": alert_details
        }

    return jsonify(alert)



def get_alert_type_and_level(data):

    if len(data['alerts']) > 0:

        alert_level_list = ["warning", "Warning", "Watch", "watch"]
        alert_type_list = ["Thunderstorm", "thunderstorm", "Flood", "flood", "Tornado", "tornado"]
        message = data["alerts"][0]["message"]
        message_list = message.split(" ")

        for word in message_list:
            if word in alert_level_list:
                alert_level = word.lower()
            if word in alert_type_list:
                alert_type = word.lower()


    else:
        message = "No Active Alerts"

    return alert_level, alert_type

#Comment this out to use demo api call

#####################################################################
def get_alerts(city):
    """function loads demo api call"""

    with open('seed_data/helena.json', 'r') as f:
        data = json.load(f)
    
    pprint(data)

    return data


################################################################################

#Comment this out to switch from live api call to demo

################################################################################
# def get_alerts(city):
#     """live api call for alerts"""

#     r = requests.get('http://api.wunderground.com/api/3259782d34d8b902/alerts/q/OK/'+city + '.json')

#     data = r.json()
#     pprint(data)

#     return data







if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True

    connect_to_db(app)
    db.create_all()

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")