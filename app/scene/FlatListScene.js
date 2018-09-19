/**
 * 测试的flatList
 *
 * @Author:JACK-GU
 * @Date:2018-09-17
 * @E-Mail:528489389@qq.com
 */

import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import {View, Dimensions, Text, StyleSheet} from "react-native";
import RefreshableFlatList from '../component/rlFlatList/index';
import TitleBar from "../component/TitleBar";
import MyFlatList from "../component/MyFlatList";


const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        padding: 10,
        height: 125,
        width,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        marginBottom: -1,
        borderBottomColor: '#E5EDF5',
        borderTopColor: '#E5EDF5',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: '#6da3d0'
    },
    navText: {
        color: '#6da3d0',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 30
    }
});

class FlatListScene extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {data: [],};
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    title="测试FlatList"
                    showBack={true}
                    leftText="返回"
                    colors={this.props.colors}/>

                <MyFlatList
                    data={this.state.data}
                    total={20}
                    renderItem={({item}) => (
                        <View key={item.id} style={styles.row}>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    )}
                    onRefreshing={(resolve) => {
                        setTimeout(() => {
                            this.setState({
                                data: new Array(15).fill(1).map((x, i) =>
                                    ({id: i, text: `Item No. ${i}`})),
                            });
                            resolve();
                        }, 3000);
                    }}
                    onLoadMore={(resolve) => {
                        setTimeout(() => {
                            const no = this.state.data.length;
                            const newArr = new Array(5).fill(1).map((x, i) => ({
                                id: i + no,
                                text: `Item No. ${i + no}`
                            }));
                            this.setState({data: this.state.data.concat(newArr)});
                            resolve();
                        }, 3000);
                    }}
                />
            </View>
        );
    }
}


export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(FlatListScene);
