from datetime import datetime
import random
from flask import Flask, request, jsonify, send_file
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), 'encryptedImages'))
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

import uuid  # Import the uuid module for generating unique filenames

# ...

@app.route("/encryption", methods=["POST"])
def encryptionRoute():
    if (request.method == "POST"):
        file = request.files["file"]
        if file and allowed_file(file.filename):
            # Generate a unique filename for the encrypted image
            unique_filename = str(uuid.uuid4()) + '.jpg'
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
            key, image = encrypt((os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)))

            response_data = {
                'year': datetime.now().year,
                'message': 'This is your encrypted image',
                'name': unique_filename,  # Use the unique filename
                'key': key,
                'image': image
            }
            return jsonify(response_data)

@app.route("/decryption", methods=["POST"])
def decryptionRoute():
    if(request.method == "POST"): 
        file = request.files["file"]
        # Use the provided key to generate a unique filename for the decrypted image
        unique_filename = str(uuid.uuid4()) + '.jpg'
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
        key = request.form["key"]
        image = decrypt(key, os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))

        response_data = {
            'year': datetime.now().year,
            'message': 'This is your decrypted image',
            'name': unique_filename,  # Use the unique filename
            'image': image
        }
        return send_file(image, as_attachment=True)



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
      
def encrypt(file):
    fo = open(file, "rb")
    image = fo.read()
    fo.close()
    image = bytearray(image)
    key = random.randint(0,256)
    for index, value in enumerate(image):
        image[index] = value^key
    fo = open("enc.jpg", "wb")
    imageRes="enc.jpg"
    fo.write(image)
    fo.close()
    return (key,imageRes)

def decrypt(key, file):
    key = int(key)
    fo = open(file, "rb")
    image=fo.read()
    fo.close()
    image=bytearray(image)
    for index , value in enumerate(image):
     image[index] = value^key
    fo=open("dec.jpg","wb")
    imageRes="dec.jpg"
    fo.write(image)
    fo.close()
    return imageRes