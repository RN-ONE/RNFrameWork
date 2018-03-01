/**
 * 使用这个view作为最外层的View就可以适配iPhone X
 *
 * @Author:JACK-GU
 * @Date:2018/2/28 17:17
 * @E-Mail:528489389@qq.com
 */

import React, {Component} from 'react';
import {
    View,
    Dimensions
} from 'react-native';
import {connect} from "react-redux";
import IphoneXUtil from "../util/IphoneXUtil";

let {height, width} = Dimensions.get('window');

class IphoneXView extends Component {
    render() {
        return (
            <View style={[this.props.style, {
                justifyContent: 'flex-end',
                flex: 1,
            }]}>
                <View style={{justifyContent: 'flex-start', flex: 1}}>
                    {this.props.children}
                </View>
                {
                    IphoneXUtil.isIphoneX() ?
                        <View style={{
                            height: IphoneXUtil.iphoneXBottom(),
                            width: width,
                            backgroundColor: this.props.bottomColor ? this.props.bottomColor : 'white',
                        }}/>
                        : null
                }
            </View>
        );
    }
}

export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(IphoneXView);