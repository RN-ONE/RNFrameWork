/**
 * 定义的flatlist，主要是一些基础的封装
 *
 * @Author:JACK-GU
 * @Date:2018/3/9 15:02
 * @E-Mail:528489389@qq.com
 */


import React, {Component, PropTypes} from 'react';
import {
    FlatList, Text, View, Dimensions, Platform, ActivityIndicator
} from 'react-native';
import * as AppConfig from "../config/AppConfig";
import ProgressView from "../native/ProgressView";
import ToastAI from "./ToastAI";
import * as AppStyles from "../config/AppStyles";
import IphoneXUtil from "../util/IphoneXUtil";

let {height, width} = Dimensions.get('window');

export default class MyFlatList extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {refreshing: false, y: 0};
    }

    static propTypes = {
        ...FlatList.propTypes,
        total: PropTypes.number.isRequired,//总共条数
        onRefresh: PropTypes.func,//刷新回调,不传不显示指示器
        onLoadMore: PropTypes.func,//加载更多回调，携带参数，true表示没有更多了,不传不显示指示器
    };

    render() {
        return (
            <View
                style={{flex: 1}}
                onLayout={(e) => {
                    let y = e.nativeEvent.layout.y;
                    console.log({y});
                    this.setState({y});
                }}>
                <FlatList
                    ref={(ref) => this.flatList = ref}
                    refreshing={this.state.refreshing}
                    ListEmptyComponent={() => <Empty y={this.state.y}
                                                     haveTable={this.props.haveTable}/>}
                    ListFooterComponent={this.props.onLoadMore ? () => <FooterItem
                        ref={(ref) => this.footerItem = ref}
                        data={this.props.data}
                        total={this.props.total}/> : null}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{
                                height: AppConfig.SEPARATOR_HEIGHT,
                                flex: 1,
                                width: width,
                                paddingVertical: 2
                            }}/>)
                    }}
                    {...this.props}
                    onEndReached={() => {
                        //如果没有显示
                        if (this.props.total <= this.props.data.length) {
                            //没有更多了
                            if (this.props.onLoadMore) {
                                this.props.onLoadMore(true);
                            }
                        } else {
                            if (this.props.onLoadMore) {
                                this.props.onLoadMore(false);
                            }
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    onRefresh={() => {
                        if (this.props.onRefresh) {
                            this.setState({refreshing: true});
                            this.props.onRefresh();
                        }
                    }}/>
            </View>
        );
    }

    /**
     *
     * 结束刷新
     *
     * @Author: JACK-GU
     * @Date: 2018/3/9 15:22
     * @E-Mail: 528489389@qq.com
     */
    endRefresh() {
        this.setState({refreshing: false});
        //刷新底部状态
        this.endLoadMore();
    }

    /**
     *
     * 开始刷新
     *
     * @Author: JACK-GU
     * @Date: 2018/3/14 15:30
     * @E-Mail: 528489389@qq.com
     */
    startRefresh() {
        this.setState({refreshing: true});
    }

    /**
     *
     * 结束加载更多
     *
     * @Author: JACK-GU
     * @Date: 2018/3/9 15:49
     * @E-Mail: 528489389@qq.com
     */
    endLoadMore() {
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

class FooterItem extends Component {
    // 构造
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.total) {
            if (this.props.total <= this.props.data.length) {
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        marginTop: AppConfig.SEPARATOR_HEIGHT,
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
                )
            } else {
                return (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        marginTop: AppConfig.SEPARATOR_HEIGHT,
                        height: 50
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: 50
                        }}>
                            {
                                Platform.OS === 'android' ?
                                    <ProgressView color={AppConfig.TEXT_COLOR_GRAY}
                                                  style={{width: 25, height: 25}}/>
                                    :
                                    <ActivityIndicator size={"small"}/>
                            }

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                加载中...
                            </Text>
                        </View>
                    </View>
                )
            }
        } else {
            return null;
        }

    }
}