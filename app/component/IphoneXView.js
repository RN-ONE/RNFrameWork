/**
 * 使用这个view作为最外层的View就可以适配iPhone X
 *
 * @Author:JACK-GU
 * @Date:2018/2/28 17:17
 * @E-Mail:528489389@qq.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions
} from 'react-native';
import {connect} from "react-redux";
import IphoneXUtil from "../util/IphoneXUtil";
import * as AppConfig from '../config/AppConfig';

let {height, width} = Dimensions.get('window');

class IphoneXView extends Component {
    static propTypes = {
        bottomColor: PropTypes.color,
    };

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
                            width: width,
                            height: IphoneXUtil.iphoneXBottom(),
                        }}>
                            <View style={{
                                height: 2,
                                width: width,
                                backgroundColor: AppConfig.COLOR_BG
                            }}/>
                            <View style={{
                                width: width,
                                height: IphoneXUtil.iphoneXBottom() - 2,
                                backgroundColor: this.props.bottomColor ? this.props.bottomColor : 'white',
                            }}/>
                        </View>
                        : null
                }
            </View>
        );
    }
}

export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(IphoneXView);
