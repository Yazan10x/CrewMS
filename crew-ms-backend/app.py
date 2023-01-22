# Python Imports
from flask import Flask
from flask_cors import CORS

# Imports
from routes.users import users
from routes.incident import incidents
from routes.health import health

app = Flask(__name__)

# Services
app.register_blueprint(users, url_prefix="/users")
app.register_blueprint(health, url_prefix="/health")
app.register_blueprint(incidents, url_prefix="/incidents")
CORS(app)


@app.route("/")
def home() -> str:
    return 'CrewMS BACKEND API :: Unauthorized Access'


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=True)
