import os
from flask import Flask, url_for, request, redirect, flash
from werkzeug.utils import secure_filename

UPLOAD_FOLDER='./uploads'
ALLOWED_EXTENSIONS=set(['aac','png'])

app = Flask('acePM')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = os.urandom(24)

@app.route('/')
def hello_world():
    """A baby function"""
    return 'Hello World!'

@app.route('/<game>/', methods=['GET'])
def show_game_type(game):
    """show the game type"""
    #supported variable types
    #string, int, float, path (/), UUID

    if request.method == 'GET':
        return 'You\'ve selected %s' % game
    else:
        return 'WOW WHAT'


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            print('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            print('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''


with app.test_request_context('/hello', method='POST'):
    print url_for('show_game_type', game='ddr')
    print url_for('static', filename='index.html')
    assert request.path == '/hello'
    assert request.method == 'POST'
