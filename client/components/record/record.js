import React, { Component } from 'react';
import {
    Button,
    View,
    Platform,
    PermissionsAndroid
} from 'react-native';

import update from 'immutability-helper'
import { AudioRecorder, AudioUtils } from 'react-native-audio'

class Record extends Component {

    constructor() {
        super()
        this.state = {
            audioPath: AudioUtils.DocumentDirectoryPath + '/test2.aac',
            audioProfile: {
                SampleRate: 22050,
                Channels: 1,
                AudioQuality: "Low",
                AudioEncoding: "aac",
                AudioEncodingBitRate: 32000
            },
            permissions: {
                mic: null
            },
            status: {
                currentTime: 0.0,
                recording: null
            }
        }

        this.prepareRecordingPath = this.prepareRecordingPath.bind(this)
        this._checkPermissions = this._checkPermissions.bind(this)
        this._record = this._record.bind(this)
        this._stop = this._stop.bind(this)
        this._finishRecording = this._finishRecording.bind(this)

    }

    componentDidMount() {
        this._checkPermissions().then(hasPermission => {
            if (hasPermission)
                this.setState({ permissions: update(this.state.permissions, { mic: { $set: true } }) })

            else
                return

            AudioRecorder.onProgress = (data) => {
                this.setState({ status: update(this.state.status, { currentTime: { $set: Math.floor(data.currentTime) } }) })
            }

            AudioRecorder.onFinished = (data) => {
                if (Platform.OS === 'ios')
                    return
                //_finishRecording()
            }
        })
    }

    prepareRecordingPath() {
        try {
            AudioRecorder.prepareRecordingAtPath(this.state.audioPath, this.state.audioProfile)
        } catch (err) {
            console.error(err)
        }

    }

    _checkPermissions() {
        if (Platform.OS !== 'android')
            return Promise.resolve(true)

        const rationale = {
            title: 'Microphone Permission',
            message: 'acePM needs access to your microphone to identify songs'
        }

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then(result => {
                console.log('Permission result:', result)
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED)
            })
    }

    async _record() {
        if (this.state.status.recording) {
            console.warn('Already recording')
            return
        }

        if (!this.state.permissions.mic) {
            console.warn('Cannot record : Permission not granted')
            return
        }

        if (!this.state.status.recording)
            this.prepareRecordingPath(this.state.audioPath)

        this.setState({ status: update(this.state.status, { recording: { $set: true } }) })

        try {
            const filePath = await AudioRecorder.startRecording()
        }
        catch (err) {
            console.error(err)
        }
    }

    async _stop() {
        if (!this.state.status.recording) {
            console.warn('Not recording, cannot stop')
            return
        }

        this.setState({ status: update(this.state.status, { recording: { $set: false } }) })

        try {
            const filePath = await AudioRecorder.stopRecording()

            if (Platform.OS === 'android')
                this._finishRecording(true, filePath)

            return filePath

        } catch (err) {
            console.error(err)
        }
    }

    _finishRecording(succeed, filePath) {
        console.log(`Finished recording : Duration - ${this.state.currentTime}s at ${filePath}`)
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this._record}
                    title="Start Recording"
                    color="#841584"
                    accessibilityLabel="Start Recording DDR ACE"
                />
                <Button
                    onPress={this._stop}
                    title="Stop Recording"
                    color="#841584"
                    accessibilityLabel="Start Recording DDR ACE"
                />
                <Button
                    onPress={() => { console.log(this.state) }}
                    title="Output State"
                    color="#841584"
                    accessibilityLabel="Start Recording DDR ACE"
                />
            </View>
        )
    }

}

export default Record