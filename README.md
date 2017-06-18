# acePM
acePM is a mobile application ([React Native](https://github.com/facebook/react-native)) intended to recognize songs from popular music rhythm games via audio fingerprinting ([DejaVu](https://github.com/worldveil/dejavu)) to display the song's bpm. Users can display a desired bpm and calculate the multipler required to achieve said bpm.

The mobile client will attempt to sample the ambient music, send the sample to the hosted backend ([Flask](https://github.com/pallets/flask)) and attempt to recognize the song.

---

## Current Status
* Currently focusing development for the Android platform (on a Unix based system)
* iOS support is next on the ToDo list
---

## Mobile Client (./client directory)

_Install NPM dependencies_
```
$ npm install
```

_Install .apk to Emulator/Devices_
```
$ react-native run-android
```

_Running React-Native Dev Server (localhost:8081)_ 
```
$ npm start
```
---

## Server (./srv directory)

_Install Python dependencies_
```
$ pip install -r requirements.txt
```

_Set Flask dev environment variables_
```
$ export FLASK_APP=hello.py
$ export FLASK_DEBUG=1
```

_Start Flask dev server (localhost:5000)_
```
$ flask run
```

---
## Comments, Complaints, Questions
Send a good ol' fashioned email to [kenny.inthirath@gmail.com](mailto:kenny.inthirath@gmail.com)

---
## MIT License
Copyright 2017 Kenny Inthirath

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.