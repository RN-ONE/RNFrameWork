/**
 * 键盘问题
 *
 * @Author:JACK-GU
 * @Date:2018/3/22 13:48
 * @E-Mail:528489389@qq.com
 */

import React, {Component, PropTypes} from 'react';
import {
    View,
    Platform,
    Keyboard,
    LayoutAnimation
} from 'react-native';
import IphoneXUtil from "../util/IphoneXUtil";

export default class KeyboardView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {bottom: 0};
    }

    static propTypes = {
        callBack: PropTypes.func,//回调，返回参数，true键盘显示
    };

    render() {
        console.log({bottom: this.state.bottom});

        return (
            <View style={{paddingBottom: this.state.bottom, flex: 1}}>
                {this.props.children}
            </View>
        );
    }


    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.subscriptions = [
                Keyboard.addListener('keyboardWillChangeFrame', this.onKeyboardChange.bind(this)),
            ];
        } else {
            this.subscriptions = [
                Keyboard.addListener('keyboardDidHide', this.onKeyboardChange.bind(this)),
                Keyboard.addListener('keyboardDidShow', this.onKeyboardChange.bind(this)),
            ];
        }
    }

    componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.remove());
    }

    onKeyboardChange(event) {
        if (!event) {
            //Android隐藏的时候调用
            if (this.props.callBack) {
                this.props.callBack(false);
            }
            this.setState({bottom: 0});
            return;
        }


        const {startCoordinates, endCoordinates, duration, easing} = event;
        console.log({event});

        let height = 0;
        if (Platform.OS === 'android') {
            height = endCoordinates.height;

            if (this.props.callBack) {
                this.props.callBack(height > 0 ? true : false);
            }
        } else {
            height = startCoordinates.screenY - endCoordinates.screenY;
            height = height - IphoneXUtil.iphoneXBottom();

            if (this.props.callBack) {
                this.props.callBack(height > 0 ? true : false);
            }
        }

        if (height < 0) {
            height = 0;
        }

        if (duration && easing) {
            LayoutAnimation.configureNext({
                duration: duration,
                update: {
                    duration: duration,
                    type: LayoutAnimation.Types[easing] || 'keyboard',
                },
            });
        }


        this.setState({bottom: height});
    }
}