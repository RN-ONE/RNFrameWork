/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
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
import PhotoGallery from "../component/PhotoGallery";
import HttpUtil from "../util/HttpUtil";

let {height, width} = Dimensions.get('window');

class Main extends Component {

    render() {
        return (
            <View style={{backgroundColor: this.props.colors.COLOR_BG, flex: 1}}>
                <TitleBar
                    title="主页"
                    showBack={false}
                    leftText="返回"
                    rightText="确定"
                    colors={this.props.colors}
                    onPress={() => {
                        this.show();
                    }}/>

                <ThemeButton backgroundColor={this.props.colors.COLOR_THEME}
                             radius={5}
                             text={this.props.text} onPress={() => {
                    Actions.loading();
                    this.props.getMoveList({});
                }}/>

                <ThemeButton
                    textColor={AppConfig.COLOR_BLACK}
                    backgroundColor={AppConfig.TEXT_COLOR_GRAY}
                    radius={5}
                    text="跳转页面"
                    onPress={() => {
                        ToastAI.showShortBottom("自定义的Toast，支持Android和iOS！");
                        Actions.changeTheme();
                    }}/>

                <PhotoGallery
                    layoutWidth={width}
                    widthSeparator={5}
                    maxImageNum={8}
                    callBack={(call) => {
                        this.photoGalleryCallBack = call;
                    }}
                    perRowNum={4}/>

                <ThemeButton
                    textColor={AppConfig.COLOR_BLACK}
                    backgroundColor={AppConfig.TEXT_COLOR_GRAY}
                    radius={5}
                    text="获得图片数据"
                    onPress={() => {
                        console.log({
                            dataS: this.photoGalleryCallBack()
                        });
                    }}/>

                <Icon name="ios-person" size={30} color={this.props.colors.COLOR_THEME}/>

                <DialogMessage ref={(dialogbox) => {
                this.dialogbox = dialogbox;
                }}/>
            </View>
        )
    }

    show() {
        this.dialogbox.confirm({
            title: '测试',//标题
            titleColor: this.props.colors.COLOR_THEME,
            contentColor: this.props.colors.TEXT_COLOR_GRAY,//内容颜色
            content: ['选择Toast的位置'],//内容
            ok: {
                text: '居中',
                color: this.props.colors.COLOR_THEME,
                callback: () => {
                    ToastAI.showShortCenter("居中位置的Toast");
                },
            },//右边按钮
            cancel: {
                text: '上面',
                color: this.props.colors.TEXT_COLOR_GRAY,
                callback: () => {
                    ToastAI.showShortTop("上面位置的Toast");
                },
            },
            //左边按钮
        });
    }


}

export default connect(state => ({
    text: state.TestReducer.text,
    colors: state.ColorReducer.colors,
}), dispatch => ({
    getMoveList: (data) => dispatch(TestAction.testGetMoves(data)),
}))(Main);