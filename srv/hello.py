from flask import Flask, url_for, request
from werkzeug.utils import secure_filename
app = Flask('acePM')

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

@app.route('/<game>/upload', methods=['POST'])
def upload_file():
    """Recieve the uploaded soundclip"""
    if request.method == 'POST':
        file_upload = request.files['the_file']
        file_upload.save('/tmp/uploads/' + secure_filename(file_upload.filename))

with app.test_request_context('/hello', method='POST'):
    print url_for('show_game_type', game='ddr')
    print url_for('static', filename='index.html')
    assert request.path == '/hello'
    assert request.method == 'POST'
