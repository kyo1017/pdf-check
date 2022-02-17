import os
import re
import fitz
from flask_cors import CORS
from flask import Flask, jsonify, json, request

UPLOAD_FOLDER = 'uploads'

app = Flask(__name__)
CORS(app)

if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

txt = open("keywords.txt", "r", encoding="utf-8")
keywords = txt.read().split("\n")
txt.close()

BASE_ROUTE = "/check"

@app.route(BASE_ROUTE, methods=['POST'])
def check():
    if request.method == 'POST':
        file = request.files['upload_file']
        filename = file.filename
        destination = "/".join([UPLOAD_FOLDER, filename])
        file.save(destination)
        doc = fitz.open(destination)
        res = {}
        for page in doc:
            text = (' ').join(page.get_text().split())
            for keyword in keywords:
                num = len(re.findall(keyword.lower(), text.lower()))
                if num > 0:
                    if not keyword in res:
                        res[keyword] = 0
                    res[keyword] += num
        response = app.response_class(
            response=json.dumps(res),
            status=200,
            mimetype='application/json'
        )
        return response
