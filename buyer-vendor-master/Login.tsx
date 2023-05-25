import React, { FC, useEffect, useState } from "react";
import { SafeAreaView, View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CredentialsModel } from "./models/UserModels/CredentialsModel";
import { useDispatch } from "react-redux";
import AuthReducer from "./src/redux/reducers/AuthReducer";



const Login: FC = () => {
    const dispatch = useDispatch<any>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<boolean>()

    const handleLogin = async (): Promise<void> => {
        const cred: CredentialsModel = {
            identifier: email!,
            password: password!
        }
        try {
            const response: any = await dispatch(AuthReducer.login(cred))
            if (response === false) {
                setError(true)
                setEmail(undefined)
                setPassword(undefined)
            }
        } catch (error) { }
    }

    useEffect(() => {
        if(email!==undefined){
            setError(false)
        }
    }, [email])

    useEffect(() => {
        if(password!==undefined){
            setError(false)
        }
    }, [password])



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner_container}>
                <View style={styles.input_container}>
                    <TextInput placeholder="Email adresinizi giriniz" value={email} onChangeText={setEmail} />
                </View>
                <View style={styles.input_container}>
                    <TextInput placeholder="Şifrenizi giriniz" secureTextEntry={true} value={password} onChangeText={setPassword} />
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity style={styles.login_button} onPress={handleLogin}>
                        <Text style={styles.button_text}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
                {error && <View style={styles.error_container}>
                    <Text style={styles.error_message_text}>E-mail adresi veya Şifre hatalı</Text>
                </View>}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center"
    },
    inner_container: {
        padding: 20,
        borderRadius: 10,
        margin: 10,
        backgroundColor: "#708090",
    },
    button_container: {
        marginBottom: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    input_container: {
        borderRadius: 5,
        backgroundColor: "snow",
        margin: 5,
        padding: 5
    },
    login_button: {
        backgroundColor: "#32cd32",
        borderRadius: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    button_text: {
        fontWeight: "bold",
        color: "white",
    },
    error_message_text: {
        fontWeight: "bold",
        color: "white",
    },
    error_container: {
        margin: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5
    },
})
export default Login