import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.BLACK,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 24,
        height: 40,
        marginVertical: 5
    },
    textStyle: {
        color: COLORS.WHITE,
        fontSize: 18
    }
});

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity {...this.props} style={[ styles.button, this.props.style ]}>
                <Text style={[ styles.textStyle, this.props.textStyle ]}>
                    { this.props.children }
                </Text>
            </TouchableOpacity>
        )
    }
}
