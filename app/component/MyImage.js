/**
 * 自定义image
 *
 * @Author:JACK-GU
 * @Date:2018/3/21 16:03
 * @E-Mail:528489389@qq.com
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    ListView,
    Dimensions,
    Image,
    Platform,
    Slider,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    NativeModules, ActivityIndicator
} from 'react-native';
import TouchableButton from "./TouchableButton";
import ProgressView from '../native/ProgressView';
import * as AppConfig from "../config/AppConfig";
import * as AppStyles from '../config/AppStyles';
import {connect} from "react-redux";
import ToastAI from "./ToastAI";

import {Actions} from 'react-native-router-flux';
import GridView from 'react-native-gridview';
import ImagePickerModal from "../modal/ImagePickerModal";
import ImageShowModal from "../modal/ImageShowModal";

let {height, width} = Dimensions.get('window');

export default class MyImage extends Component {
    STATUS_LOADING = 0;
    STATUS_SUCCESS = 1;
    STATUS_FAIL = 2;
    success = false;

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {status: this.STATUS_LOADING, width: 1, height: 1};
        success = false;
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={[this.props.style, {
                backgroundColor: AppConfig.COLOR_BG,
                alignItems: 'center',
                justifyContent: 'center'
            }]}>
                {
                    this.state.status === this.STATUS_LOADING ?
                        Platform.OS === 'android' ?
                            <ProgressView
                                color={AppConfig.TEXT_COLOR_GRAY}
                                style={{width: 30, height: 30}}/>
                            :
                            <ActivityIndicator
                                size="small"
                                color={AppConfig.TEXT_COLOR_GRAY}/>
                        :
                        this.state.status === this.STATUS_FAIL ?
                            <Text style={{
                                fontSize: AppConfig.TEXT_SIZE_SMALL,
                                color: AppConfig.TEXT_COLOR_GRAY
                            }}>
                                加载失败
                            </Text>
                            : null
                }

                <Image
                    {...this.props}
                    style={[this.props.style, {
                        height: this.state.height,
                        width: this.state.width,
                        marginLeft: 0,
                    }]}
                    onLoad={() => {
                        this.success = true;
                    }}
                    onLoadEnd={() => {
                        this.setState({
                            status: this.success ? this.STATUS_SUCCESS : this.STATUS_FAIL,
                            height: this.success ? this.props.style.height : 0,
                            width: this.success ? this.props.style.width : 0
                        });
                    }}
                />
            </View>
        );
    }
}
