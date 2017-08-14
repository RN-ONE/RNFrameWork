/**
 * @Author:JACK-GU
 * @Date:2017-08-09
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import {
    StyleSheet,
    Text,
    Platform,
    Image,
    View,
    ToastAndroid,
    TouchableOpacity,
    PixelRatio,
    NativeModules,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import React, {Component, PropTypes} from 'react';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from "../config/AppStyles";
import TouchableButton from "./TouchableButton";

export default class TitleBar extends Component {
    static propTypes = {
        title: PropTypes.string,
        leftText: PropTypes.string,
        rightText: PropTypes.string,
        showBack: PropTypes.bool,//默认为true
        onPress: PropTypes.func,
    };

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            barHeight: global.BARANDROIDHEIGHT / PixelRatio.get(),
            showBack: props.showBack == null ? true : props.showBack,
        };

        if (global.BARANDROIDHEIGHT == -1) {
            NativeModules.BarHeightModule.getHeight((height) => {
                this.setState({barHeight: height / PixelRatio.get()});
            });
        }
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: AppConfig.COLOR_THEME,
                paddingTop: Platform.OS === 'android' ? this.state.barHeight : 20,
            }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: AppConfig.COLOR_THEME,
                        height: AppConfig.TITLE_HEIGHT,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                    <Text style={
                        [
                            AppStyles.textBigGray,
                            {color: AppConfig.COLOR_WHITE,}
                        ]}>
                        {this.props.title}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            height: AppConfig.TITLE_HEIGHT,
                            alignItems: 'center',
                            justifyContent: this.state.showBack ? 'space-between' : 'flex-end'
                        }}>
                            {
                                this.state.showBack ?
                                    <TouchableButton onPress={() => {
                                        Actions.pop();
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    marginLeft: 5
                                                }}
                                                source={require('../img/title_back.png')}/>

                                            <Text
                                                style={[
                                                    AppStyles.textSmallGray,
                                                    {color: AppConfig.COLOR_WHITE}
                                                ]}>
                                                {this.props.leftText}
                                            </Text>
                                        </View>
                                    </TouchableButton>
                                    : null
                            }
                            {
                                this.props.rightText ?
                                    <TouchableButton onPress={() => {
                                        if (this.props.onPress) {
                                            this.props.onPress();
                                        }
                                    }}>
                                        <Text
                                            style={[
                                                AppStyles.textNormalGray,
                                                {
                                                    color: AppConfig.COLOR_WHITE,
                                                    marginRight: 10,
                                                }
                                            ]}>
                                            {this.props.rightText}
                                        </Text>
                                    </TouchableButton>
                                    : null
                            }

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}