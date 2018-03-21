/**
 *
 * 图片选择的控件
 *
 *@Author: JACK-GU
 *@Date: 2018/2/28 15:32
 *@E-Mail: 528489389@qq.com
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
    FlatList,
    TouchableOpacity,
    NativeModules
} from 'react-native';
import TouchableButton from "../TouchableButton";
import * as AppConfig from "../../config/AppConfig";
import * as AppStyles from '../../config/AppStyles';
import {connect} from "react-redux";
import ToastAI from "../ToastAI";

import {Actions} from 'react-native-router-flux';
import GridView from 'react-native-gridview';
import ImagePickerModal from "../../modal/ImagePickerModal";
import ImageShowModal from "../../modal/ImageShowModal";
import MyImage from "../MyImage";

let {height, width} = Dimensions.get('window');

let addItem = {};

class BasePhotoGallery extends Component {
    static TYPE_PIC = 1;
    static TYPE_VIDEO = 2; //预留
    static TYPE_ADD = 3;

    static propTypes = {
        layoutWidth: PropTypes.float,//这个控件的宽度,不传就是整个屏幕的宽度
        widthSeparator: PropTypes.float,//每个的间隔
        maxImageNum: PropTypes.int,//最多多少个
        perRowNum: PropTypes.int,//每一行的个数
        callBack: PropTypes.function,//这个是回调，返回的是一个方法，可以来调用获得数据
        imgs: PropTypes.array,//传入图片的uri，是一个string
        notShowRemove: PropTypes.bool,//不显示移除图标
        notShowLRSeparator: PropTypes.bool,//不显示左右的间隔
    };

    constructor(props) {
        super(props);
        addItem = {
            type: BasePhotoGallery.TYPE_ADD,
            uri: null,
            fileSize: 0,
            fileName: 'name',
            width: 0,
            height: 0,
        };

        let data = [];

        if (props.imgs) {
            //传入的是一个地址
            for (let item of props.imgs) {
                data.push({
                    type: BasePhotoGallery.TYPE_PIC,
                    path: item,
                    uri: item,
                });
            }
        } else {
            data.push(addItem);
        }


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
            if (item.type !== BasePhotoGallery.TYPE_ADD) {
                newData.push(item);
            }
        }
        return newData;
    }

    _renderGridView() {
        if (this.props.callBack) {
            this.props.callBack(this.getDataS.bind(this));
        }
        let number = this.props.notShowLRSeparator ? (this.props.perRowNum - 1) : (this.props.perRowNum + 1);
        let itemWidth = ((this.state.layoutWidth ? this.state.layoutWidth : width) - number * this.props.widthSeparator) / this.props.perRowNum;
        return (
            <View style={{paddingBottom: this.props.widthSeparator, backgroundColor: 'white'}}>
                <FlatList
                    data={this.state.data}
                    numColumns={this.props.perRowNum}
                    columnWrapperStyle={{marginTop: this.props.widthSeparator}}
                    rowStyle={{flexDirection: "row"}}
                    style={{
                        paddingRight: this.props.notShowLRSeparator ? 0 : this.props.widthSeparator,
                    }}
                    renderItem={({item, index}) => {
                        //index，用来当不显示左右的距离的时候计算，如果是每一行的第一个就不设置marginLeft
                        let notShowLRSeparator = false;
                        if ((index + 1) % this.props.perRowNum === 1 && this.props.notShowLRSeparator) {
                            notShowLRSeparator = true;
                        }
                        return (
                            <View>
                                {
                                    item.type === BasePhotoGallery.TYPE_ADD ?
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
                                            }} source={require('../../img/addPic.png')}/>
                                        </TouchableButton>
                                        :
                                        <PicItem
                                            itemID={index}
                                            itemWidth={itemWidth}
                                            notShowLRSeparator={notShowLRSeparator}
                                            item={item}
                                            notShowRemove={this.props.notShowRemove}
                                            remove={(index) => {
                                                this.removeIndex(index);
                                            }}
                                            info={() => {
                                                let index = 0;
                                                let items = this.getDataS();
                                                for (let i = 0; i < items.length; i++) {
                                                    let itemNew = items[i];
                                                    if (itemNew.uri === item.uri) {
                                                        index = i;
                                                        break;
                                                    }
                                                }


                                                Actions.imageShowModal({
                                                    items: items,
                                                    index: index,
                                                });
                                                //this.setState({modalVisible: true, item: item});
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
                            if (dataItem.type !== BasePhotoGallery.TYPE_ADD) {
                                newData.push(dataItem);
                            }
                        }

                        console.log({data});

                        // NativeModules.NativeUtilsModule.compress(data.path, false, (success, newPath) => {
                        //     console.log({success, newPath})
                        // });
                        newData.push({
                            type: BasePhotoGallery.TYPE_PIC,
                            path: data.path,
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


    removeIndex(index) {
        let newData = [];
        for (let i = 0; i < this.state.data.length; i++) {
            let dataItem = this.state.data[i];
            if (dataItem.type !== BasePhotoGallery.TYPE_ADD && index !== i) {
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
                    <MyImage style={{
                        width: this.props.itemWidth,
                        height: this.props.itemWidth,
                        marginLeft: this.props.notShowLRSeparator ? 0 : this.props.widthSeparator
                    }} source={{uri: this.props.item.uri}}/>
                </TouchableButton>

                {
                    this.props.notShowRemove ?
                        null
                        :
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
                                    source={require('../../img/remove_pic.png')}
                                    style={{height: 20, width: 20}}/>
                            </TouchableButton>
                        </View>
                }

            </View>
        );
    }
});


export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(BasePhotoGallery);