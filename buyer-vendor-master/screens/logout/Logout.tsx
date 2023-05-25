import React from 'react'
import { View ,TouchableOpacity,Text,StyleSheet} from 'react-native'
import { useDispatch } from 'react-redux'
import AuthReducer from '../../src/redux/reducers/AuthReducer'
import Constants from '../../common/Constants'

const Logout = () => {
    const dispatch = useDispatch<any>()
    const handleLogout = async (): Promise<void> => {
        await dispatch(AuthReducer.logout())
      }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <View style={styles.button}>
                    <Text style={styles.text}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"    
    },
    button: {
        backgroundColor: Constants.colors.buttonBackgroundColor,
        padding: 10,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
        borderRadius: 15
      },
      text:{
        color:"white"
      }
})

export default Logout