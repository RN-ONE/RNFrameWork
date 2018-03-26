/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ToastAndroid, FlatList,
} from 'react-native';
import {
    Modal,
    Router,
    Scene,
    Reducer,
    Actions,
    ActionConst,
    Switch,
} from 'react-native-router-flux';
import DialogMessage from "../component/DialogMessage";
import * as AppConfig from "../config/AppConfig";
import TitleBar from "../component/TitleBar";
import {connect} from "react-redux";
import ThemeButton from "../component/ThemeButton";
import * as ChangeColorAction from "../actions/ChangeColorAction";
import MoreMenu from "../component/moreMenu/MoreMenu";
import ToastAI from "../component/ToastAI";
import PhotoGallery from "../component/photoGallery/BasePhotoGallery";
import TouchableButton from "../component/TouchableButton";
import IphoneXView from "../component/IphoneXView";

let {height, width} = Dimensions.get('window');


let data = [
    {
        color: AppConfig.COLOR_THEME,
        params: {
            COLOR_BG: AppConfig.COLOR_BG,
            COLOR_THEME: AppConfig.COLOR_THEME,
        }
    },
    {
        color: '#75AE3F',
        params: {
            COLOR_BG: AppConfig.COLOR_BG,
            COLOR_THEME: "#75AE3F"
        }
    },
    {
        color: '#D15FEE',
        params: {
            COLOR_BG: AppConfig.COLOR_BG,
            COLOR_THEME: "#D15FEE"
        }
    },
    {
        color: '#CC7833',
        params: {
            COLOR_BG: AppConfig.COLOR_BG,
            COLOR_THEME: "#CC7833"
        }
    },
    {
        color: '#F40007',
        params: {
            COLOR_BG: AppConfig.COLOR_BG,
            COLOR_THEME: "#F40007"
        }
    },
    {
        color: '#000000',
        params: {
            COLOR_BG: AppConfig.COLOR_BG,
            COLOR_THEME: "#000000"
        }
    }
];
let itemSeparator = AppConfig.DISTANCE_SAFE;
let itemWidth = (width - itemSeparator * 3 ) / 2;

class Main2 extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
    }

    render() {
        return (
            <IphoneXView style={{backgroundColor: this.props.colors.COLOR_BG, flex: 1}}>
                <TitleBar
                    title="换肤"
                    showBack={true}
                    leftText="返回"
                    colors={this.props.colors}/>

                <FlatList
                    data={data}
                    columnWrapperStyle={{marginTop: itemSeparator}}
                    style={{marginRight: itemSeparator}}
                    renderItem={({item, index}) => {
                        return (
                            <View>
                                <TouchableButton onPress={() => {
                                    this.props.changeColor(item.params);
                                }}>
                                    <View style={{
                                        marginLeft: itemSeparator,
                                        borderRadius: 5,
                                        height: itemWidth,
                                        width: itemWidth,
                                        borderWidth: 0,
                                        backgroundColor: item.color,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    </View>
                                </TouchableButton>
                            </View>
                        );
                    }}
                    numColumns={2}/>
            </IphoneXView>
        )
    }
}

export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({
    changeColor: (data) => dispatch(ChangeColorAction.changeColor(data)),
}))(Main2);