/**
 *
 * 人更新的提示dialog
 *
 *@Author: JACK-GU
 *@Date: 2018/2/28 10:54
 *@E-Mail: 528489389@qq.com
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    ProgressViewIOS,
    ActivityIndicator
} from "react-native";
import {Actions} from "react-native-router-flux";
import ProgressView from '../native/ProgressView';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import DialogMessage from "../component/DialogMessage";
import {connect} from "react-redux";

let {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
});

class TipMessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, {
            duration: 200,
            toValue: 1
        }).start();

        this.dialogbox.tip({
            dontHide: true,
            title: '温馨提示',//标题
            titleColor: this.props.colors.COLOR_THEME,
            contentColor: this.props.colors.TEXT_COLOR_GRAY,//内容颜色
            content: [this.props.message],//内容
            btn: {
                text: '确定',
                callback: () => {
                    Actions.pop();
                    if (this.props.callBack) {
                        this.props.callBack();
                    }
                },
            }
        });
    }

    render() {
        return (
            <Animated.View style={[
                styles.container,
                {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    opacity: this.state.opacity
                }]}>

                <DialogMessage ref={(dialogbox) => {
                    this.dialogbox = dialogbox;
                }}/>

            </Animated.View>
        );
    }
}

export default connect(state => ({
    text: state.TestReducer.text,
    colors: state.ColorReducer.colors,
}), dispatch => ({
    getMoveList: (data) => dispatch(TestAction.testGetMoves(data)),
}))(TipMessageModal);