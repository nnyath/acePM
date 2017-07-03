import React, { Component } from 'react';
import {
    Text,
    TextInput,
    ToastAndroid,
    Button,
    View,
    Platform,
    PermissionsAndroid
} from 'react-native';
import consts from '../../util/consts'

import Config from '../../config'
import RNFB from 'react-native-fetch-blob'
import Axios from 'axios'

import update from 'immutability-helper'
import { AudioRecorder, AudioUtils } from 'react-native-audio'

class Record extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audioPath: null,
            audioTag: null,
            audioProfile: Config.audioProfile,
            //ToDo: Abstract to function generating valid URI
            uploadURI:`${Config.server.host}:${Config.server.port}/upload`,
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
        this._upload = this._upload.bind(this)

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
                    _finishRecording()
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

        await this.setState({
            audioPath: update(this.state.audioPath, { $set: `${AudioUtils.DocumentDirectoryPath}/${new Date().getTime()}.${this.state.audioProfile.AudioEncoding}` })
        })


        if (!this.state.status.recording){
            this.prepareRecordingPath(this.state.audioPath)
            await this.setState({ 
                status: update(this.state.status, { recording: { $set: true } }),
            })
        }

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


    async _upload() {
        console.log('Uploading File')

        if(!this.state.audioPath){
            console.error('Cannot find audio recording')
            return
        }
            

        let file = {
            uri:'file://'+this.state.audioPath,
            type:'audio/aac',
            name:this.state.audioPath.split('/').slice(-1)[0]
        }

        let body = new FormData()
        body.append('file', file)
        //ToDo: Validate Tag isn't emtpy and valid folder struc name
        body.append('tag', this.state.audioTag)

        let call = await Axios.post(this.state.uploadURI,body)
        if(Platform.OS==='android')
            call.status===200 
                ? ToastAndroid.show('Sucessfully Uploaded '+this.state.audioTag, ToastAndroid.SHORT) 
                : ToastAndroid.show('Unsucessfully Uploaded '+this.state.audioTag, ToastAndroid.SHORT)
    }

    _finishRecording(succeed, filePath) {
        console.log(`Finished recording : Duration - ${this.state.status.currentTime}s at ${filePath}`)
    }

    render() {

        const { status } = this.state

        return (
            <View>
                <Button
                    onPress={!status.recording ? this._record : this._stop}
                    title={!status.recording ? consts.UI.RECORD_BUTTON.START : consts.UI.RECORD_BUTTON.STOP}
                    color="#841584"
                    accessibilityLabel="Start Recording"
                    id={consts.UI.RECORD_BUTTON.ID}
                />
                <Text>{status.currentTime}s recorded</Text>
                {
                    (!status.recording && status.currentTime !== 0)
                        ? (
                            <View>
                                <Button 
                                    onPress={this._upload} title='Upload to Server' 
                                />
                                <TextInput 
                                    onChangeText={text => this.setState({audioTag:text})}
                                    placeholder='Enter a tag'
                                />
                            </View>
                        )
                        : null
                }
            </View>
        )
    }

}

export default Record