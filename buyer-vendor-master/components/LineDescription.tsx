import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

interface LineDescriptionProps {
    isGrey: boolean;
    title: string;
    description: string;
}

const LineDescription: FC<LineDescriptionProps> = ({ isGrey, title, description }) => {
    return (
        <View style={isGrey ? styles.textViewGrey : styles.textView}>
            <Text style={styles.textTitle}>{title}:</Text>
            <Text style={styles.textDescription}>{description}</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    textView: {
        height: 40,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textViewGrey: {
        height: 40,
        borderRadius: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#e7e7e7'
    }, textTitle: {
        marginHorizontal: 10,
        fontWeight: "bold",
        width: 110
    },
    textDescription: {
        marginHorizontal: 10,
    }
})

export default LineDescription;