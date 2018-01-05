/**
 * @Author:hgq
 * @Date:2018/1/5
 * @Describe:
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
    Switch,
    TouchableOpacity,
} from 'react-native';
import TouchableButton from "./TouchableButton";
import * as AppConfig from "../config/AppConfig";
import * as AppStyles from '../config/AppStyles';
import {connect} from "react-redux";
import ToastAI from "./ToastAI";


import GridView from 'react-native-gridview';
import ImagePickerModal from "../modal/ImagePickerModal";

let {height, width} = Dimensions.get('window');

let addItem = {};

class PhotoGallery extends Component {
    static TYPE_PIC = 1;
    static TYPE_VIDEO = 2; //预留
    static TYPE_ADD = 3;

    static propTypes = {
        layoutWidth: PropTypes.float,//这个控件的宽度
        width: PropTypes.float,//每一行的宽度
        maxImageNum: PropTypes.int,//最多多少个
        perRowNum: PropTypes.int,//每一行的个数
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        addItem = {
            type: PhotoGallery.TYPE_ADD,
            uri: null,
            fileSize: 0,
            fileName: 'name',
            width: 0,
            height: 0,
        };

        let data = [addItem];
        this.state = {
            data: data,
            dataSource: null,
            itemCount: this.props.maxImageNum,
            itemsPerRow: 4,
            layoutWidth: props.layoutWidth ? props.layoutWidth : width,
        };
    }

    render() {
        return (
            <View>
                {this._renderGridView()}
            </View>
        );
    }

    _renderGridView() {
        let itemW = this.props.width ? this.props.width : 100;
        let marginLeft = parseInt((this.state.layoutWidth - this.props.perRowNum * itemW) / (this.props.perRowNum + 1));
        console.log({marginLeft});
        return (
            <View style={{paddingBottom: marginLeft, backgroundColor: 'white'}}>
                <GridView
                    data={this.state.data}
                    dataSource={this.state.dataSource}
                    itemsPerRow={this.state.itemsPerRow}
                    rowStyle={{flexDirection: "row", marginTop: marginLeft}}
                    style={{paddingRight: marginLeft}}
                    renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
                        return (
                            <View>
                                {
                                    item.type === PhotoGallery.TYPE_ADD ?
                                        <TouchableButton onPress={() => {
                                            if (this.state.data.length <= this.props.maxImageNum) {
                                                this.imagePickerModal.showPicker();
                                            } else {
                                                ToastAI.showShortBottom("最多选择" + this.props.maxImageNum + "张图片");
                                            }
                                        }}>
                                            <Image style={{
                                                width: this.props.width || 100,
                                                height: this.props.width || 100,
                                                marginLeft: marginLeft
                                            }} source={require('../img/addPic.png')}/>
                                        </TouchableButton>
                                        :
                                        <Image style={{
                                            width: this.props.width || 100,
                                            height: this.props.width || 100,
                                            marginLeft: marginLeft
                                        }} source={{uri: item.uri}}/>
                                }

                            </View>
                        );
                    }}
                />

                <ImagePickerModal
                    ref={(ref) => {
                        this.imagePickerModal = ref;
                    }}
                    titleColor={this.props.colors.COLOR_THEME}
                    callback={(data) => {
                        let newData = [];
                        for (let i = 0; i < this.state.data.length; i++) {
                            let dataItem = this.state.data[i];
                            if (dataItem.type !== PhotoGallery.TYPE_ADD) {
                                newData.push(dataItem);
                            }
                        }

                        newData.push({
                            type: PhotoGallery.TYPE_PIC,
                            uri: data.uri,
                            fileSize: data.fileSize,
                            fileName: data.fileName,
                            width: data.width,
                            height: data.height,
                        });

                        //加入添加
                        if (newData.length < this.props.maxImageNum) {
                            newData.push(addItem);
                        }


                        this.setState({data: newData});
                    }}/>
            </View>
        );
    }
}


export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(PhotoGallery);