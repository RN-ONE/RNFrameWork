/**
 * @Author:JACK-GU
 * @Date:2018/2/28 16:35
 * @E-Mail:528489389@qq.com
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    PixelRatio,
    Platform,
    NativeModules
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import DialogMessage from "../component/DialogMessage";
import TouchableButton from "../component/TouchableButton";
import * as AppConfig from "../config/AppConfig";
import TitleBar from "../component/TitleBar";
import {connect} from "react-redux";
import * as TestAction from "../actions/TestAction";
import * as AppStyles from '../config/AppStyles';
import ThemeButton from "../component/ThemeButton";
import ToastAI from "../component/ToastAI";
import PhotoGallery from "../component/photoGallery/PhotoGallery";
import HttpUtil from "../util/HttpUtil";
import DateUtil from "../util/DateUtil";
import IphoneXUtil from "../util/IphoneXUtil";
import IphoneXView from "../component/IphoneXView";


class Login extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <IphoneXView
                bottomColor={AppConfig.COLOR_THEME}
                style={{
                    flex: 1,
                    backgroundColor: this.props.colors.COLOR_THEME,
                    paddingTop: Platform.OS === 'android' ? global.BARANDROIDHEIGHT / PixelRatio.get() :
                        IphoneXUtil.isIphoneX() ? 44 : 20,
                }}>




                <ThemeButton
                    backgroundColor={'white'}
                    onPress={()=>{
                        Actions.reset("tabbar");
                    }}
                    text={'登录'}
                    textColor={'black'}/>

            </IphoneXView>
        );
    }
}

export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(Login);
