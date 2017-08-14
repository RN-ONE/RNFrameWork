/**
 * @Author:JACK-GU
 * @Date:17/2/17
 * @E-Mail:528489389@qq.com
 * @Describe:
 * 输入框，属性和TextInput的属性是一样的。
 * 注意事项：
 * 以下style尽量使用平台区别：
 * borderWidth: Platform.OS === 'android' ? 0.5 : 1,
 * paddingVertical: Platform.OS === 'android' ? 0 : 0
 */

import {
    AppRegistry,
    StyleSheet,
    Text,
    Platform,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import React, {Component} from 'react';
import * as AppConfig from '../config/AppConfig';

class EditText extends Component {
    render() {
        return (
            <TextInput
                style={this.props.style ? this.props.style : styles.input}
                onChangeText={this.props.onChangeText}
                multiline={this.props.multiline}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : AppConfig.TEXT_COLOR_GRAY}
                secureTextEntry={this.props.secureTextEntry}
                password={this.props.password}
                keyboardType={this.props.keyboardType}
                defaultValue={this.props.defaultValue}
                editable={this.props.editable}
                clearButtonMode={this.props.clearButtonMode}
                underlineColorAndroid="transparent">
            </TextInput>
        );
    }
}


const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 5,
        borderRadius: 5,
        borderColor: AppConfig.COLOR_LINE,
        borderWidth: Platform.OS === 'android' ? 0.5 : 1,
        fontSize: AppConfig.TEXT_SIZE_NORMAL,
        margin: 10,
        height: 30,
        paddingVertical: Platform.OS === 'android' ? 0 : 0
    }
});

export default EditText;
