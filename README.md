# acePM
acePM is a mobile application ([React Native](https://github.com/facebook/react-native)) intended to recognize songs from popular music rhythm games via audio fingerprinting ([DejaVu](https://github.com/worldveil/dejavu)) to display the song's bpm. Users can display a desired bpm and calculate the multipler required to achieve said bpm.

The mobile client will attempt to sample the ambient music, send the sample to the hosted backend ([Flask](https://github.com/pallets/flask)) and attempt to recognize the song.

## Install
```
npm install
```

## Running
### **Client**

via Expo
```
npm start
```

via Android Emulator
```
npm android
```

via iOS Emulator
```
npm android
```

