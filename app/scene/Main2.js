/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
} from 'react-native';
import {
    Modal,
    Router,
    Scene,
    Reducer,
    Actions,
    ActionConst,
    Switch,
} from 'react-native-router-flux';
import DialogMessage from "../component/DialogMessage";
import TouchableButton from "../component/TouchableButton";
import * as AppConfig from "../config/AppConfig";
import TitleBar from "../component/TitleBar";

class Main extends Component {
    render() {
        return (
            <View style={{backgroundColor: 'red', flex: 1}}>
                <TitleBar
                    title="主页"
                    showBack={true}
                    leftText="返回"
                    rightText="确定"
                    onPress={() => {
                        this.show();
                    }}/>

                <TouchableButton onPress={() => {
                }}>
                    <Text>
                        测试
                    </Text>
                </TouchableButton>


                <DialogMessage ref={(dialogbox) => {
                    this.dialogbox = dialogbox;
                }}/>
            </View>
        )
    }

    show() {
        this.dialogbox.confirm({
            title: 'title',//标题
            titleColor: AppConfig.COLOR_THEME,
            contentColor: AppConfig.TEXT_COLOR_GRAY,//内容颜色
            content: ['come on!'],//内容
            ok: {
                text: 'Y',
                callback: () => {
                    this.dialogbox.alert('Good!');
                },
            },//右边按钮
            cancel: {
                text: 'N',
                color: AppConfig.TEXT_COLOR_GRAY,
                callback: () => {
                    this.dialogbox.alert('Hurry up！');
                },
            },
            //左边按钮
        });
    }
}

export default Main;