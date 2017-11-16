/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native';
import {connect} from "react-redux";
import TitleBar from "../component/TitleBar";
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import RLHeaderAndFooter from "../component/RLHeaderAndFooter";
import * as TestAction from "../actions/TestAction";

class Main extends Component {
    constructor(props) {
        super(props);

        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        let dataList = []

        this.state = {
            first: true,
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList),
        }
    }

    render() {
        return (
            <View style={{backgroundColor: this.props.colors.COLOR_BG, flex: 1}}>
                <TitleBar
                    title="主页2"
                    showBack={false}
                    leftText="返回"
                    rightText="确定"
                    colors={this.props.colors}
                    onPress={() => {
                    }}/>

                <PullToRefreshListView
                    ref={(component) => this._pullToRefreshListView = component}
                    viewType={PullToRefreshListView.constants.viewType.listView}
                    initialListSize={20}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderHeader={(viewState) => RLHeaderAndFooter.renderHeader(viewState)}
                    renderFooter={(viewState) => RLHeaderAndFooter.renderFooter(viewState)}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    pullUpDistance={80}
                    pullUpStayDistance={50}
                    pullDownDistance={80}
                    pullDownStayDistance={50}
                />

            </View>
        )
    }


    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.thumbnail}>
                <View style={styles.textContainer}>
                    <Text>{rowData.text}</Text>
                </View>
            </View>
        )
    }


    _onRefresh = () => {
        setTimeout(() => {
            let addNum = 8;
            let refreshedDataList = [];
            for (let i = 0; i < addNum; i++) {
                refreshedDataList.push({
                    text: `item-${i}`
                })
            }

            this.setState({
                dataList: refreshedDataList,
                dataSource: this._dataSource.cloneWithRows(refreshedDataList),
            })
            this._pullToRefreshListView.endRefresh()

        }, 3000)
    }

    _onLoadMore = () => {
        setTimeout(() => {
            let length = this.state.dataList.length
            let addNum = 2;
            let addedDataList = [];
            if (length >= 10) {
                addNum = 3
            }
            for (let i = length; i < length + addNum; i++) {
                addedDataList.push({
                    text: `item-${i}`
                })
            }
            length = length + addNum;

            let newDataList = this.state.dataList.concat(addedDataList)
            this.setState({
                dataList: newDataList,
                dataSource: this._dataSource.cloneWithRows(newDataList),
            })

            let loadedAll
            if (length >= 10) {
                loadedAll = true
                this._pullToRefreshListView.endLoadMore(loadedAll)
            }
            else {
                loadedAll = false
                this._pullToRefreshListView.endLoadMore(loadedAll)
            }

        }, 3000)
    }

}


const styles = StyleSheet.create({

    thumbnail: {
        padding: 6,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        overflow: 'hidden',
    },

    textContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default connect(state => ({
    text: state.TestReducer.text,
    colors: state.ColorReducer.colors,
}), dispatch => ({
    getMoveList: (data) => dispatch(TestAction.testGetMoves(data)),
}))(Main);