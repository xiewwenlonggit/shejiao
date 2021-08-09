import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient';
import pxToDp from '../utils/PixelRatio'
const THButton = (props) => {
    const { disable } = props;
    return (<View>
        <TouchableOpacity
            disabled={disable}
            onPress={props.onPress}
            style={
                {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    ...props.style
                }
            }>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#9b63cd', '#e0708c']} style={styles.linearGradient}>
                <Text style={{ ...styles.buttonText, ...props.textStyle }}>{props.children}</Text>
            </LinearGradient>

        </TouchableOpacity>
    </View>)
};
THButton.propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    disable: PropTypes.bool

}
THButton.defaultProps = {
    style: {},
    textStyle: {},
    disable: false

}
const styles = StyleSheet.create(
    {
        linearGradient: {
            flex: 1,
            paddingLeft: pxToDp(15),
            paddingRight: pxToDp(15),
            borderRadius: pxToDp(5),
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        }
        ,
        buttonText: {
            fontSize: pxToDp(18),
            fontFamily: 'Gill Sans',
            textAlign: 'center',
            color: '#ffffff',
            backgroundColor: 'transparent',
        }
    }
)
export default THButton;
