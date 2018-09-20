import os
import json

from flask import Flask, jsonify, request
# from flask_cors import CORS
from werkzeug import secure_filename
import sys


# Load ER demo server config
with open("server/config.json") as config_data:
    config = json.load(config_data)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'webui/www')



# Create the Flask app
app = Flask(__name__,
            static_folder=os.path.join(os.getcwd(), 'webui/www'),
            static_url_path="")
        

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def root():
    print(sys.path)
    return app.send_static_file("index.html")

# This is a fileUpload endpoint to save files
@app.route('/upload', methods=['GET', 'POST'])
def fileUpload():
    print("olaaa")
    target=os.path.join(UPLOAD_FOLDER,'')
    print(target)
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    return jsonify({"filename": filename})


@app.route("/do_something", methods=["POST"])
def do_something():
    data = request.get_json()
    return jsonify({"response": data["value"]})


# Run the development server (do not use this in production!)
if __name__ == "__main__":
    app.run(host=config["host"], port=config["port"])
