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
    Dimensions,
    TouchableOpacity,
    PixelRatio,
    NativeModules,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from "../config/AppStyles";
import TouchableButton from "./TouchableButton";
import IphoneXUtil from "../util/IphoneXUtil";
import {COLOR_BLACK} from "../config/AppConfig";

let {height, width} = Dimensions.get('window');

let maxItem = 80 * (width / 414);//定义每个item的最大宽度，左边和右边。按比例计算，计算标准是8PLUS

export default class TitleBar extends Component {
    static propTypes = {
        title: PropTypes.string,
        leftText: PropTypes.string,
        rightText: PropTypes.string,
        showBack: PropTypes.bool,//默认为true
        onPress: PropTypes.func,//右边文字按钮
        onPressBack: PropTypes.func,//返回按钮
        onPressRight: PropTypes.func,//右边的更多按钮
        colors: PropTypes.Object,
        showMore: PropTypes.bool,//这个有，才显示更多的按钮,默认false
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
            <View
                onLayout={this.props.onLayout}
                style={{
                    flexDirection: 'row',
                    backgroundColor: this.props.colors ? this.props.colors.COLOR_THEME : AppConfig.COLOR_THEME,
                    paddingTop: Platform.OS === 'android' ? this.state.barHeight :
                        IphoneXUtil.isIphoneX() ? 44 : 20,
                    elevation: 4,
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: this.props.colors ? this.props.colors.COLOR_THEME : AppConfig.COLOR_THEME,
                        height: AppConfig.TITLE_HEIGHT,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <View style={{
                        width: maxItem + AppConfig.DISTANCE_SAFE
                    }}>
                        {
                            this.state.showBack ?
                                <TouchableButton onPress={() => {
                                    this.props.onPressBack ? this.props.onPressBack() :
                                        Actions.pop();
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: maxItem + AppConfig.DISTANCE_SAFE,
                                    }}>
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                marginLeft: 5
                                            }}
                                            source={require('../img/ic_arrow_back_white_36pt.png')}/>

                                        <Text
                                            numberOfLines={1}
                                            style={[
                                                AppStyles.textSmallGray,
                                                {
                                                    width: maxItem + AppConfig.DISTANCE_SAFE - 35,
                                                    color: this.props.colors ? this.props.colors.COLOR_WHITE : AppConfig.COLOR_WHITE
                                                }
                                            ]}>
                                            {this.props.leftText}
                                        </Text>
                                    </View>
                                </TouchableButton>
                                : null
                        }
                    </View>

                    <Text
                        numberOfLines={1}
                        style={
                            [
                                AppStyles.textBigGray,
                                {
                                    textAlign: 'center',
                                    width: width - maxItem * 2 - 2 * AppConfig.DISTANCE_SAFE,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    color: AppConfig.COLOR_WHITE
                                }
                            ]}>
                        {this.props.title}
                    </Text>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: maxItem,
                        marginRight: AppConfig.DISTANCE_SAFE
                    }}>
                        {
                            this.props.rightText ?
                                <TouchableButton onPress={() => {
                                    if (this.props.onPress) {
                                        this.props.onPress();
                                    }
                                }}>
                                    <Text
                                        numberOfLines={1}
                                        style={[
                                            AppStyles.textNormalGray,
                                            {
                                                width: maxItem - 15,
                                                textAlign: 'right',
                                                color: this.props.colors ? this.props.colors.COLOR_WHITE : AppConfig.COLOR_WHITE,
                                            }
                                        ]}>
                                        {this.props.rightText}
                                    </Text>
                                </TouchableButton>
                                : null
                        }
                        {
                            this.props.showMore ?
                                <TouchableButton
                                    onPress={() => {
                                        if (this.props.onPressRight) {
                                            this.props.onPressRight();
                                        }
                                    }}>
                                    <View
                                        style={{marginLeft: 3}}
                                    >
                                        <Image
                                            resizeMode={Platform.OS === 'android' ? "center" : "contain"}
                                            style={{
                                                width: 12,
                                                height: 20,
                                            }}
                                            source={require('../img/ic_more_vert_white_48pt.png')}/>
                                    </View>
                                </TouchableButton>
                                : null
                        }
                    </View>

                </View>
            </View>
        )
    }
}
