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
import PhotoGallery from "../component/photoGallery/PhotoGallery";
import HttpUtil from "../util/HttpUtil";
import DateUtil from "../util/DateUtil";

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

                <ThemeButton
                    backgroundColor={this.props.colors.COLOR_THEME}
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

                <ThemeButton
                    textColor={AppConfig.COLOR_WHITE}
                    backgroundColor={this.props.colors.COLOR_THEME}
                    radius={5}
                    style={{paddingVertical: 10}}
                    text="测试按钮"
                    onPress={() => {
                        Actions.selectModal({
                            items: [
                                {
                                    text: '按钮1',
                                    textAlign: 'left',
                                    color: this.props.colors.COLOR_THEME,
                                },
                                {
                                    text: '按钮2',
                                    textAlign: 'right',
                                }
                                ,
                                {
                                    text: '按钮3',
                                    color: 'red',
                                }
                                ,
                                {
                                    textAlign: 'left',
                                    text: '按钮4',
                                    color: 'red',
                                    res: require('../img/dog1.jpg'),
                                }
                            ],
                            tips: "*测试的提示类容",
                            tipsColor: 'red',
                            title: "测试标题",
                            onPress: (index) => {
                                ToastAI.showShortBottom("点击了" + index);
                                Actions.pop();
                            }
                        });
                    }}/>

                <PhotoGallery
                    ref={(photoGallery) => {
                        this.photoGallery = photoGallery;
                    }}
                    layoutWidth={width}
                    widthSeparator={5}
                    maxImageNum={8}
                    perRowNum={4}/>

                <ThemeButton
                    textColor={AppConfig.COLOR_BLACK}
                    backgroundColor={AppConfig.TEXT_COLOR_GRAY}
                    radius={5}
                    text="获得图片数据"
                    onPress={() => {
                        console.log({
                            dataS: this.photoGallery.getDataS()
                        });
                    }}/>

                {/*<Icon name="ios-person" size={30} color={this.props.colors.COLOR_THEME}/>*/}

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