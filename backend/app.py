from flask import Flask, request
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        name = request.form['name']
        file = request.files['file']
        filename = secure_filename(file.filename or 'default_filename.ext')
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return f'File uploaded and saved as {name}_{filename}'
    except Exception as e:
        return f'File upload failed: {str(e)}'


if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def home():
    return 'Welcome to the File Uploader!'
