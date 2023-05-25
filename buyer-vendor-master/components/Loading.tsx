import React from 'react';
import {
    StyleSheet,
    View,
    Modal
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loading = ({ loading }: any) => {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}>
            <View style={[styles.modalBackground]}>
                <View >
                    <ActivityIndicator
                        animating={loading}
                        color='black'/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000040'
    },
});

export default Loading;