/**
 *@Author:JACK-GU
 * @Date:17/2/17
 * @E-Mail:528489389@qq.com
 * @Describe: 按钮外层，用法和TouchableOpacity一样
 *
 */
import {
    AppRegistry,
    StyleSheet,
    Text,
    Platform,
    View,
    PropTypes,
    TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import * as Appconfig from '../config/AppConfig';

class TouchableButton extends Component {

    render() {
        return (
            <TouchableOpacity activeOpacity={Appconfig.OPACITY}
                              onPress={() => this.props.onPress()}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

export default TouchableButton;