import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import AppColor from '../../Assets/AppColor';

const AppButton = ({
    backgroundColor,
    title,
    onPress,
    ContainerStyle,
    marginTop = 20,
    textStyle,
    Indicator = false,
    loaderColor = AppColor.BLACK
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.btn,
                { backgroundColor: backgroundColor, marginTop: marginTop },
                { ...ContainerStyle }
            ]}
        >
            {Indicator ? (
                <ActivityIndicator color={loaderColor} size={25} />
            ) : (
                <Text style={[styles.btnText, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        borderRadius: 10,
        borderWidth: 1.5,
        borderBottomWidth: 4,
        borderColor: AppColor.BLACK
    },
    btnText: {
        color: AppColor.BLACK,
        fontSize: 19,
        fontWeight: '700'
    }
});

export default AppButton;
