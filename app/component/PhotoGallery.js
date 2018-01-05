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
import ImageShowModal from "./ImageShowModal";

let {height, width} = Dimensions.get('window');

let addItem = {};

class PhotoGallery extends Component {
    static TYPE_PIC = 1;
    static TYPE_VIDEO = 2; //预留
    static TYPE_ADD = 3;

    static propTypes = {
        layoutWidth: PropTypes.float,//这个控件的宽度
        widthSeparator: PropTypes.float,//间隔
        maxImageNum: PropTypes.int,//最多多少个
        perRowNum: PropTypes.int,//每一行的个数
        callBack: PropTypes.function,//这个是回调，返回的是一个方法，可以来调用获得数据
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
            item: {},
            modalVisible: false,
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

    getDataS() {
        let newData = [];
        for (let item of this.state.data) {
            if (item.type !== PhotoGallery.TYPE_ADD) {
                newData.push(item);
            }
        }
        return newData;
    }

    _renderGridView() {
        if (this.props.callBack) {
            this.props.callBack(this.getDataS.bind(this));
        }
        let itemWidth = (this.state.layoutWidth - (this.props.perRowNum + 1) * this.props.widthSeparator) / this.props.perRowNum;
        return (
            <View style={{paddingBottom: this.props.widthSeparator, backgroundColor: 'white'}}>
                <GridView
                    data={this.state.data}
                    dataSource={this.state.dataSource}
                    itemsPerRow={this.state.itemsPerRow}
                    rowStyle={{flexDirection: "row", marginTop: this.props.widthSeparator}}
                    style={{paddingRight: this.props.widthSeparator}}
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
                                                width: itemWidth,
                                                height: itemWidth,
                                                marginLeft: this.props.widthSeparator
                                            }} source={require('../img/addPic.png')}/>
                                        </TouchableButton>
                                        :
                                        <PicItem
                                            itemID={itemID}
                                            itemWidth={itemWidth}
                                            item={item}
                                            remove={(index) => {
                                                this.removeIndex(index);
                                            }}
                                            info={() => {
                                                this.setState({modalVisible: true, item: item});
                                            }}
                                            widthSeparator={this.props.widthSeparator}/>
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

                <ImageShowModal
                    modalVisible={this.state.modalVisible}
                    item={this.state.item}
                    hideModal={() => {
                        this.setState({modalVisible: false})
                    }}
                />
            </View>
        );
    }

    removeIndex(index) {
        let newData = [];
        for (let i = 0; i < this.state.data.length; i++) {
            let dataItem = this.state.data[i];
            if (dataItem.type !== PhotoGallery.TYPE_ADD && index !== i) {
                newData.push(dataItem);
            }
        }

        //加入添加
        if (newData.length < this.props.maxImageNum) {
            newData.push(addItem);
        }


        this.setState({data: newData});
    }
}

const PicItem = React.createClass({
    render() {
        return (
            <View>
                <TouchableButton
                    onPress={() => {
                        this.props.info();
                    }}>
                    <Image style={{
                        width: this.props.itemWidth,
                        height: this.props.itemWidth,
                        marginLeft: this.props.widthSeparator
                    }} source={{uri: this.props.item.uri}}/>
                </TouchableButton>

                <View style={{
                    position: 'absolute',
                    marginLeft: this.props.itemWidth - 20,
                    alignItems: 'flex-end',
                    marginTop: this.props.widthSeparator
                }}>
                    <TouchableButton
                        onPress={() => {
                            this.props.remove(this.props.itemID);
                        }}>
                        <Image
                            source={require('../img/remove_pic.png')}
                            style={{height: 20, width: 20}}/>
                    </TouchableButton>
                </View>
            </View>
        );
    }
});


export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(PhotoGallery);