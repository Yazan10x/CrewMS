# Python Imports
from flask import Flask
from flask_cors import CORS

# USEC Imports
from routes.users.__intit__ import users
from routes.incident.__intit__ import incidents

app = Flask(__name__)

# Services
app.register_blueprint(incidents, url_prefix="/users")
# app.register_blueprint(health, url_prefix="/health")
app.register_blueprint(incident, url_prefix="/incident")
CORS(app)


@app.route("/")
def home() -> str:
    return 'CrewMS BACKEND API :: Unauthorized Access'


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=True)
