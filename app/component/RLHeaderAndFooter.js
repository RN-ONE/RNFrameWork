/**
 * @Author:JACK-GU
 * @Date:2017-09-11
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    ActivityIndicator,
    View,
    Image,
    ProgressBarAndroid,
    ListView,
    Platform,
    StyleSheet
} from 'react-native';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import ProgressView from "../native/ProgressView";

const footerHeight = 50;//和pullUpStayDistance保持一致
const headerHeight = 50;//pullDownStayDistance保持一致
const backgroundColor = "#FFFFFF";

/**
 *
 *配合PullToRefreshListView使用，如果第一次加载就没有更多了，就
 * this._pullToRefreshListView.endRefresh(true);
 * ,加载完成了，就使用
 * this._pullToRefreshListView.endLoadMore(true)；
 * 切记不能两个方法一起调用，不然会出问题的
 * */


export default class RLHeaderAndFooter {

    static renderFooter(viewState) {
        let {pullState, pullDistancePercent} = viewState
        let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all,} = PullToRefreshListView.constants.viewState;

        pullDistancePercent = Math.round(pullDistancePercent * 100);

        switch (pullState) {
            case load_more_none:
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: footerHeight
                        }}>
                            <Image
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                                source={require("../img/up_refresh.png")}/>

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                上拉加载更多
                            </Text>
                        </View>
                    </View>
                )
            case load_more_idle:
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: footerHeight
                        }}>
                            <Image
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                                source={require("../img/up_refresh.png")}/>

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                上拉加载更多
                            </Text>
                        </View>
                    </View>
                )
            case will_load_more:
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: footerHeight
                        }}>
                            <Image
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                                source={require("../img/down_refresh.png")}/>

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                释放加载更多
                            </Text>
                        </View>
                    </View>
                )
            case loading_more:
                return (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: footerHeight
                        }}>
                            <ProgressView color={AppConfig.TEXT_COLOR_GRAY}
                                          style={{width: 25, height: 25}}/>

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                加载中...
                            </Text>
                        </View>
                    </View>
                )
            case loaded_all:
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: footerHeight
                        }}>
                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                我也是有底线的╭(╯^╰)╮
                            </Text>
                        </View>
                    </View>
                )
        }
    }

    static renderHeader(viewState) {
        let {pullState, pullDistancePercent} = viewState
        let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState;
        pullDistancePercent = Math.round(pullDistancePercent * 100);

        switch (pullState) {
            case refresh_none:
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: headerHeight
                        }}>
                            <Image
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                                source={require("../img/down_refresh.png")}/>

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                下拉刷新
                            </Text>
                        </View>
                    </View>
                )
            case refresh_idle:
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: headerHeight
                        }}>
                            <Image
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                                source={require("../img/down_refresh.png")}/>

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                下拉刷新
                            </Text>
                        </View>
                    </View>
                )
            case will_refresh:
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: headerHeight
                        }}>
                            <Image
                                resizeMode="contain"
                                style={{width: 20, height: 20}}
                                source={require("../img/up_refresh.png")}/>

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                释放刷新
                            </Text>
                        </View>
                    </View>
                )
            case refreshing:
                return (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            height: headerHeight
                        }}>
                            <ProgressView color={AppConfig.TEXT_COLOR_GRAY}
                                          style={{width: 25, height: 25}}/>

                            <Text
                                style={[AppStyles.textSmallGray, {marginLeft: AppConfig.DISTANCE_SAFE}]}>
                                刷新中...
                            </Text>
                        </View>
                    </View>
                )
        }
    }
}