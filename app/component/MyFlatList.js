/**
 * 定义的flatlist，主要是一些基础的封装
 *
 * @Author:JACK-GU
 * @Date:2018/3/9 15:02
 * @E-Mail:528489389@qq.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    FlatList, Text, View, Dimensions, Platform, ActivityIndicator
} from 'react-native';
import * as AppConfig from "../config/AppConfig";
import ProgressView from "../native/ProgressView";
import ToastAI from "./ToastAI";
import * as AppStyles from "../config/AppStyles";
import IphoneXUtil from "../util/IphoneXUtil";
import RefreshableFlatList from './rlFlatList/index';
import CustomIndicator from "./rlFlatList/CustomIndicator";

let {height, width} = Dimensions.get('window');

export default class MyFlatList extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {y: 0};
    }

    static propTypes = {
        ...FlatList.propTypes,
        total: PropTypes.number.isRequired,//总共条数
        onRefreshing: PropTypes.func,//刷新回调,会携带resolve方法作为参数，调用该方法表示结束刷新
        onLoadMore: PropTypes.func,//刷新回调,会携带resolve方法作为参数，调用该方法表示结束加载更多
    };

    render() {
        return (
            <View
                style={{flex: 1}}
                onLayout={(e) => {
                    let y = e.nativeEvent.layout.y;
                    this.setState({y});
                }}>
                <RefreshableFlatList
                    ref={(ref) => this.flatList = ref}
                    ListEmptyComponent={() => <Empty y={this.state.y}
                                                     haveTable={this.props.haveTable}/>}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{
                                height: AppConfig.LINE_HEIGHT,
                                width: width,
                                backgroundColor: AppConfig.COLOR_LINE
                            }}/>)
                    }}
                    {...this.props}
                    onRefreshing={() => new Promise((resolve) => {
                        //我们用自己的在拦截回去
                        if (this.props.onRefreshing) {
                            this.props.onRefreshing(resolve);
                        }
                    })}
                    onLoadMore={() => new Promise((resolve) => {
                        if (this.props.data.length >= this.props.total) {
                            //不需要回调
                            resolve();
                        } else {
                            //我们用自己的在拦截回去
                            if (this.props.onLoadMore) {
                                this.props.onLoadMore(resolve);
                            }
                        }
                    })}
                    bottomIndicatorComponent={this.props.data.length >= this.props.total ?
                        NoMoreData : CustomIndicator
                    }
                />
            </View>
        );
    }
}

class NoMoreData extends Component {
    render() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                height: 50
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    height: 50
                }}>
                    <Text
                        style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                        我也是有底线的╭(╯^╰)╮
                    </Text>
                </View>
            </View>
        );
    }
}

class Empty extends Component {
    // 构造
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    height: height - this.props.y - IphoneXUtil.iphoneXBottom() - (this.props.haveTable ? 60 : 0),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}>
                <Text style={{
                    fontSize: AppConfig.TEXT_SIZE_NORMAL,
                    colors: AppConfig.COLOR_BLACK,
                }}>
                    暂无数据
                </Text>
            </View>
        );
    }
}
