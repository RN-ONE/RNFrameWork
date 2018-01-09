/**
 * @Author:JACK-GU
 * @Date:2018/1/8
 * @E-Mail:528489389@qq.com
 * @Describe:
 *
 * 上拉或者下拉的
 */

import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    ListView,
    ScrollView,
    RefreshControl
} from 'react-native';
import {connect} from "react-redux";
import TitleBar from "../component/TitleBar";
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';//1.6.10
import RLHeaderAndFooter from "../component/RLHeaderAndFooter";
import * as TestAction from "../actions/TestAction";
import * as AppConfig from "../config/AppConfig";

export default class ListViewPullAndLoad extends Component {
    static propTypes = {
        onRefresh: PropTypes.function,//刷新回调
        onLoadMore: PropTypes.function,//加载更多回调
        dataList: PropTypes.array,//数据，数组
        renderRow: PropTypes.function,//每一行的样子
        noDataStr: PropTypes.string,//没有数据的时候提示的文字,默认是"暂无数据"
    };

    constructor(props) {
        super(props);

        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataList: props.dataList,
            refreshing: false,
            height: 20,
            dataSource: this._dataSource.cloneWithRows(props.dataList),
        };
    }

    componentWillReceiveProps(next) {
        if (next !== this.props) {
            this.setState({
                dataList: next.dataList,
                dataSource: this._dataSource.cloneWithRows(next.dataList),
            });
        }
    }

    render() {
        return (
            <View style={{flex: 1}} onLayout={(e) => {
                console.log({e: e.nativeEvent.layout.height});
                this.setState({height: e.nativeEvent.layout.height});
            }}>
                {
                    this.state.dataList.length <= 0 ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    onRefresh={() => {
                                        this.setState({refreshing: true});
                                        this.props.onRefresh();
                                    }}
                                    refreshing={this.state.refreshing}/>
                            }
                            style={{
                                height: this.state.height,
                            }}>
                            <View style={{
                                height: this.state.height,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontSize: AppConfig.TEXT_SIZE_BIG,
                                    textAlign: 'center',
                                }}>
                                    {this.props.noDataStr ? this.props.noDataStr : '暂无数据'}
                                </Text>
                            </View>
                        </ScrollView>
                        :
                        <PullToRefreshListView
                            ref={(component) => this._pullToRefreshListView = component}
                            viewType={PullToRefreshListView.constants.viewType.listView}
                            initialListSize={20}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            renderRow={this.props.renderRow}
                            renderHeader={(viewState) => RLHeaderAndFooter.renderHeader(viewState)}
                            renderFooter={(viewState) => RLHeaderAndFooter.renderFooter(viewState)}
                            onRefresh={this.props.onRefresh}
                            onLoadMore={this.props.onLoadMore}
                            pullUpDistance={80}
                            pullUpStayDistance={50}
                            pullDownDistance={80}
                            pullDownStayDistance={50}
                        />
                }

            </View>
        )
    }

    /**
     * @Author: JACK-GU
     * @Date: ${DATE}
     * @E-Mail: 528489389@qq.com
     * @Describe: 判断是不是空的list
     */
    isEmpty() {
        if (this.state.dataList.length <= 0) {
            //添加一个
            this.state = {
                dataSource: this._dataSource.cloneWithRows(['']),
            }
        }
    }

    /**
     * @Author: JACK-GU
     * @Date: ${DATE}
     * @E-Mail: 528489389@qq.com
     * @Describe: 是不是没有第二页，这里面需要进行特殊的处理
     *
     * @param loadAll 已经加载完成
     */
    endRefresh(loadAll) {
        this.setState({refreshing: false});
        this._pullToRefreshListView.endRefresh();
        if (loadAll) {
            setTimeout(() => {
                this._pullToRefreshListView.endLoadMore(true);
            }, 300);
        }
    }

    endLoadMore(loadAll) {
        this._pullToRefreshListView.endLoadMore(loadAll);
    }


}