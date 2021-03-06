/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import {
    Actions,
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
import HttpUtil from "../util/HttpUtil";

class Main extends Component {
    render() {
        return (
            <View style={{backgroundColor: this.props.colors.COLOR_BG, flex: 1}}>
                <TitleBar
                    title="主页3"
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
                    Actions.reset("login");
                }}/>

                <ThemeButton backgroundColor={this.props.colors.COLOR_THEME}
                             radius={5}
                             text={"测试FlatList"} onPress={() => {
                    Actions.flatListScene();
                }}/>

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
