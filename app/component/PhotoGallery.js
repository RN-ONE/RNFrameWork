/**
 * @Author:hgq
 * @Date:2018/1/5
 * @Describe:
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    Platform,
    Slider,
    StyleSheet,
    Switch,
    TouchableOpacity,
} from 'react-native';
import TouchableButton from "./TouchableButton";
import * as AppConfig from "../config/AppConfig";
import * as AppStyles from '../config/AppStyles';
import ToastAI from "./ToastAI";


import GridView from 'react-native-gridview';
let {height, width} = Dimensions.get('window');

export default class PhotoGallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            dataSource: null,
            itemCount: this.props.maxImageNum,
            itemsPerRow: 4,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderGridView()}
                <TouchableButton onPress={() => {
                    if (this.state.data.length <= this.props.maxImageNum) {
                        let dataNew = this.state.data;
                        dataNew.push({});
                        this.setState({
                            data: dataNew,
                        })
                    } else {
                        ToastAI.showShortBottom("最多只能添加这么多图片！")
                    }

                }}>
                    <View style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 30}}>+</Text>
                    </View>
                </TouchableButton>
            </View>
        );
    }

    _renderGridView() {
        return (
            <GridView
                data={this.state.data}
                dataSource={this.state.dataSource}
                padding={4}
                itemsPerRow={this.state.itemsPerRow}
                renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
                    return (
                        <View>
                            <Image style={{
                                width: this.props.width || 100,
                                height: this.props.width || 100,
                                marginLeft: 5
                            }} source={require('../img/dog1.jpg')}/>
                        </View>
                    );
                }}
            />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    options: {
        padding: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    slider: {
        flex: 1,
    },
    sliderText: {
        width: 30,
        textAlign: 'right',
    },
    button: {
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
    item: {
        flex: 1,
        borderColor: 'blue',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        overflow: 'hidden',
    },
});
