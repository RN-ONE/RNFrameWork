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
    Image
} from 'react-native';
import TouchableButton from "./TouchableButton";
import * as AppConfig from "../config/AppConfig";
import * as AppStyles from '../config/AppStyles';
import ToastAI from "./ToastAI";

let {height, width} = Dimensions.get('window');

export default class PerRowPhoto extends Component {
    static propTypes = {
        radius: PropTypes.int,
        text: PropTypes.string,
        onPress: PropTypes.func,
        borderWidth: PropTypes.int,
        borderColor: PropTypes.color,
        backgroundColor: PropTypes.backgroundColor,
        textColor: PropTypes.color,
    };

    /**
     *
     * */

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imgNum: 0
        };
    }



    render() {
        return (
            <View style={{padding: 10, flexDirection: 'row'}}>
                {(() => {
                    let picItem = [];
                    if (picItem instanceof Array) {
                        for (let k = 0; k < this.props.imgNum; k++) {
                            ( picItem[k] = (
                                <View>
                                    <Image style={{
                                        width: this.props.width || 100,
                                        height: this.props.width || 100,
                                        marginLeft: 5
                                    }} source={require('../img/dog1.jpg')}/>
                                </View>
                            ));
                        }
                    }
                    return picItem;
                })()}

                <TouchableButton onPress={() => {
                    if (this.state.imgNum <= this.props.maxImageNum) {
                        this.setState({
                            imgNum: this.state.imgNum + 1
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
        )
    }
}