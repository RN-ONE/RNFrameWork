/**
 * 刷新的指示器
 * @Author:JACK-GU
 * @Date:2018-09-17
 * @E-Mail:528489389@qq.com
 */

import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import {View, Dimensions, Text, StyleSheet, Platform, ActivityIndicator} from "react-native";
import * as AppConfig from "../../config/AppConfig";
import ProgressView from "../../native/ProgressView";

class RefreshingIcon extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={{paddingHorizontal: AppConfig.DISTANCE_SAFE}}>
                {
                    Platform.OS === 'android' ?
                        <ProgressView color={AppConfig.TEXT_COLOR_GRAY}
                                      style={{width: 25, height: 25}}/>
                        :
                        <ActivityIndicator
                            size="small"
                            color={AppConfig.TEXT_COLOR_GRAY}/>
                }
            </View>
        );
    }
}


export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(RefreshingIcon);
