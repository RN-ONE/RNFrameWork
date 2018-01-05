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

const BASE_SIZE = 30;
const RANDOM_FACTOR_MAX = 30;

let {height, width} = Dimensions.get('window');

export default class PhotoGallery extends Component {
    constructor(props) {
        super(props);

        this._itemCountChanged = this._itemCountChanged.bind(this);
        this._itemsPerRowChanged = this._itemsPerRowChanged.bind(this);
        this._randomizeContent = this._randomizeContent.bind(this);
        this._useRandomCountsChanged = this._useRandomCountsChanged.bind(this);
        this._renderTimeout = null;


        const data = generateData(props.maxImageNum);
        console.log('----data----');
        console.log(data);
        console.log('----data----');

        this.state = {
            data:[],
            dataSource: null,
            itemCount:this.props.maxImageNum,
            itemsPerRow: 4,
            variableContent: false,
            useRandomCounts: false,
            imgNum:0
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderGridView()}
                <TouchableButton onPress={() => {
                    if (this.state.imgNum <= this.props.maxImageNum) {
                        this.setState({
                            data: this.state.data.push( {
                                key: this.state.imgNum,
                                text: this.state.imgNum,
                                randomValue: Math.random() * RANDOM_FACTOR_MAX + BASE_SIZE,
                                backgroundColor: 'red',
                            })
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
                {this._renderOptions()}
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

    _renderOptions() {
        return (
            <View style={styles.options}>
                <Text>Items per section</Text>
                <View style={styles.row}>
                    <Slider
                        style={styles.slider}
                        minimumValue={1} maximumValue={10} step={1}
                        value={this.state.itemsPerRow}
                        onValueChange={this._itemsPerRowChanged}
                    />
                    <Text style={styles.sliderText}>{this.state.itemsPerRow}</Text>
                </View>
                <Text>Item count</Text>
                <View style={styles.row}>
                    <Slider
                        style={styles.slider}
                        minimumValue={10} maximumValue={250} step={1}
                        value={this.state.itemCount}
                        onValueChange={this._itemCountChanged}
                    />
                    <Text style={styles.sliderText}>{this.state.itemCount}</Text>
                </View>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <TouchableOpacity style={styles.button} onPress={this._randomizeContent}>
                        <Text style={styles.buttonText}>Randomize Content</Text>
                    </TouchableOpacity>
                    <View style={styles.row}>
                        <Switch
                            value={this.state.useRandomCounts}
                            onValueChange={this._useRandomCountsChanged}
                        />
                        <Text style={{ marginLeft: 8 }}>Vary items per row</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.row}>
                <Text>{sectionID}</Text>
            </View>
        );
    }

    /**
     * Helper methods
     */
    _createRandomRows(data) {
        const { itemsPerRow } = this.state;
        const rowData = [];
        for (let i = 0; i < data.length; i) {
            const endIndex = Math.max(Math.round(Math.random() * itemsPerRow), 1) + i;
            rowData.push(data.slice(i, endIndex));
            i = endIndex;
        }

        return rowData;
    }

    _createRandomData(data) {
        return {
            'Section 1': this._createRandomRows(data),
            'Section 2': this._createRandomRows(data),
            'Section 3': this._createRandomRows(data),
        };
    }

    _createRandomDataSource(data) {
        const rowData = this._createRandomData(data);

        return new GridView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        }).cloneWithRowsAndSections(rowData);
    }

    _itemCountChanged(itemCount) {
        clearTimeout(this._renderTimeout);
        this._renderTimeout = setTimeout(() => {
            const data = generateData(itemCount);
            let dataSource = null;
            if (this.state.useRandomCounts)
                dataSource = this._createRandomDataSource(data);

            this.setState({
                data,
                dataSource,
                itemCount,
                variableContent: false,
            });
        }, 500);
    }

    _itemsPerRowChanged(itemsPerRow) {
        clearTimeout(this._renderTimeout);
        this._renderTimeout = setTimeout(() => {
            this.setState({ itemsPerRow }, () => this.forceUpdate());

            if (this.state.useRandomCounts) {
                const randomData = this._createRandomData(this.state.data);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(randomData),
                });
            }
        }, 500);
    }

    _randomizeContent() {
        const data = generateData(this.state.itemCount);
        let dataSource = null;
        if (this.state.useRandomCounts)
            dataSource = this._createRandomDataSource(data);

        this.setState({
            data,
            dataSource,
            variableContent: true,
        });
    }

    _useRandomCountsChanged(useRandomCounts) {
        let { dataSource } = this.state;
        if (useRandomCounts)
            dataSource = this._createRandomDataSource(this.state.data);
        else dataSource = null;

        this.setState({
            dataSource,
            useRandomCounts,
        });
    }
}

function generateData(itemCount) {
    return Array(itemCount)
        .fill(null)
        .map((item, index) => {
            const colorIndex = index % 3;
            return {
                key: index,
                text: `${index + 1}`,
                randomValue: Math.random() * RANDOM_FACTOR_MAX + BASE_SIZE,
                backgroundColor: `#${colorIndex === 0 ? 'FF' : '88'}` +
                `${colorIndex === 1 ? 'FF' : '88'}` +
                `${colorIndex === 2 ? 'FF' : '88'}`,
            };
        });
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
