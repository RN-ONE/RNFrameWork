/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 默认主题色按钮
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    PixelRatio,
    Platform,
} from 'react-native';
import TouchableButton from "./TouchableButton";
import * as AppConfig from "../config/AppConfig";
import * as AppStyles from '../config/AppStyles';

export default class ThemeButton extends Component {
    static propTypes = {
        radius: PropTypes.int,
        text: PropTypes.string,
        onPress: PropTypes.func,
        borderWidth: PropTypes.int,
        borderColor: PropTypes.color,
        backgroundColor: PropTypes.backgroundColor,
        textColor: PropTypes.color,
    };

    /**
     *
     * */

    render() {
        return (
            <TouchableButton onPress={this.props.onPress ? this.props.onPress : () => {
            }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : AppConfig.COLOR_THEME,
                        paddingVertical: AppConfig.DISTANCE_SAFE / 2,
                        paddingHorizontal: AppConfig.DISTANCE_SAFE,
                        flex: 1,
                        margin: AppConfig.DISTANCE_SAFE,
                        borderRadius: this.props.radius || this.props.radius == 0 ? this.props.radius : 5,
                        borderWidth: this.props.borderWidth ? this.props.borderWidth : 0,
                        borderColor: this.props.borderColor ? this.props.borderColor : AppConfig.COLOR_WHITE,
                    }}>

                        <Text style={[AppStyles.textNormalGray, {
                            color: this.props.textColor ? this.props.textColor : AppConfig.COLOR_WHITE,
                            textAlign: 'center'
                        }, this.props.style]}>
                            {this.props.text}
                        </Text>
                    </View>
                </View>
            </TouchableButton>
        )
    }
}