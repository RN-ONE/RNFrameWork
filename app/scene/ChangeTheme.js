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
    Dimensions,
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
import * as AppConfig from "../config/AppConfig";
import TitleBar from "../component/TitleBar";
import {connect} from "react-redux";
import ThemeButton from "../component/ThemeButton";
import * as ChangeColorAction from "../actions/ChangeColorAction";
import MoreMenu from "../component/moreMenu/MoreMenu";
import ToastAI from "../component/ToastAI";
import PhotoGallery from "../component/PhotoGallery";

let {height, width} = Dimensions.get('window');

class Main2 extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
    }


    componentDidMount() {
        console.log('----console----');
        console.log(width);
        console.log(parseInt((width - 100) / 100))
    }

    render() {
        return (
            <View style={{backgroundColor: this.props.colors.COLOR_BG, flex: 1}}>
                <TitleBar
                    title="换肤"
                    showBack={true}
                    leftText="返回"
                    rightText="确定"
                    colors={this.props.colors}
                    showMore={true}
                    onPressRight={() => {
                        this.refs.moreMenu.open();
                    }}
                    onPress={() => {
                    }}/>

                <ThemeButton
                    text="绿色主题"
                    radius={5}
                    backgroundColor={this.props.colors.COLOR_THEME}
                    onPress={() => {
                        this.props.changeColor({
                            COLOR_BG: AppConfig.COLOR_BG,
                            COLOR_THEME: AppConfig.COLOR_THEME
                        });
                    }}/>

                <ThemeButton
                    text="蓝色主题"
                    radius={5}
                    backgroundColor={this.props.colors.COLOR_THEME}
                    onPress={() => {
                        this.props.changeColor({
                            COLOR_BG: AppConfig.COLOR_BG,
                            COLOR_THEME: "#3194D0"
                        });
                    }}/>

                <PhotoGallery width={100} maxImageNum={8} perRowNum={4}/>

                <MoreMenu
                    ref="moreMenu"
                    menus={["Item1", "Item2", "Item3", "Item4"]}
                    contentStyle={{right: 20}}
                    onMoreMenuSelect={(e) => {
                        ToastAI.showLongBottom(e);
                    }}/>
            </View>
        )
    }

    show() {
        this.dialogbox.confirm({
            title: 'title',//标题
            titleColor: this.props.colors.COLOR_THEME,
            contentColor: this.props.colors.TEXT_COLOR_GRAY,//内容颜色
            content: ['come on!'],//内容
            ok: {
                text: 'Yes',
                color: this.props.colors.COLOR_THEME,
                callback: () => {
                    this.dialogbox.alert('Good!');
                },
            },//右边按钮
            cancel: {
                text: 'N',
                color: this.props.colors.TEXT_COLOR_GRAY,
                callback: () => {
                    this.dialogbox.alert('Hurry up！');
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
    changeColor: (data) => dispatch(ChangeColorAction.changeColor(data)),
}))(Main2);