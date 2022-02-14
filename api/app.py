import os
import re
import awsgi
import fitz
from flask_cors import CORS
from flask import Flask, jsonify, request

UPLOAD_FOLDER = 'uploads'

app = Flask(__name__)
CORS(app)

if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

BASE_ROUTE = "/check"

@app.route(BASE_ROUTE, methods=['POST'])
def check():
    if request.method == 'POST':
        file = request.files['upload_file']
        filename = file.filename
        destination = "/".join([UPLOAD_FOLDER, filename])
        file.save(destination)
        doc = fitz.open(filename)
        String = "Deferred Revenue"
        num = 0
        for page in doc:
            text = (' ').join(page.get_text().split())
            if len(re.findall(String.lower(), text.lower())) > 0:
                num += len(re.findall(String.lower(), text.lower()))
    return jsonify(message="success")

def handler(event, context):
    return awsgi.response(app, event, context)
