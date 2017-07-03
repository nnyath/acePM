import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:300,
        height:300,
    },
    info: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    logo : {
        flex:1,
        width:null,
        height:null,
        resizeMode : 'center',
        opacity: 1
    }
})