/**
 * 更多菜单
 * @flow
 */

'use strict';
import React, {Component, PropTypes} from 'react'
import {
    ListView,
    StyleSheet,
    RefreshControl,
    TouchableHighlight,
    PixelRatio,
    Dimensions,
    Text,
    Image,
    Linking,
    Platform,
    View,
} from 'react-native'
import Popover from './Popover';
import ToastAI from "../ToastAI";
import * as AppConfig from '../../config/AppConfig';

export const MORE_MENU = {
    Custom_Language: 'Custom Language',
    Sort_Language: 'Sort Language',
    Custom_Theme: 'Custom Theme',
    Custom_Key: 'Custom Key',
    Sort_Key: 'Sort Key',
    Remove_Key: 'Remove Key',
    About_Author: 'About Author',
    About: 'About',
    Website: 'Website',
    Feedback: 'Feedback',
}

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
        }
    }

    static propTypes = {
        contentStyle: View.propTypes.style,
        menus: PropTypes.array,
    }

    open() {
        this.showPopover();
    }

    showPopover() {
        //专门为适配bar做的
        let y = AppConfig.TITLE_HEIGHT;
        if (Platform.OS === 'android') {
            y = y + global.BARANDROIDHEIGHT / PixelRatio.get() - (AppConfig.TITLE_HEIGHT - 20) / 2;
        } else {
            //ios是20的高度状态栏
            y = y + 20 - (AppConfig.TITLE_HEIGHT - 20) / 2;
        }

        var {width} = Dimensions.get('window');

        this.setState({
            isVisible: true,
            buttonRect: {x: width, y: y, width: 0, height: 0},
        });
    }

    closePopover() {
        this.setState({
            isVisible: false,
        });
        if (typeof(this.props.onClose) == 'function') this.props.onClose();
    }

    onMoreMenuSelect(tab) {
        this.closePopover();
        if (typeof(this.props.onMoreMenuSelect) == 'function') this.props.onMoreMenuSelect(tab);
    }

    renderMoreView() {
        let view = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            onClose={() => this.closePopover()}
            contentStyle={{opacity: 0.82, backgroundColor: '#343434'}}
            contentMarginRight={AppConfig.DISTANCE_SAFE}>
            <View style={{alignItems: 'center',}}>
                {this.props.menus.map((result, i, arr) => {
                    return <TouchableHighlight key={i} onPress={() => this.onMoreMenuSelect(arr[i])}
                                               underlayColor='transparent'>
                        <Text
                            style={{
                                fontSize: AppConfig.TEXT_SIZE_NORMAL,
                                color: 'white',
                                paddingHorizontal: AppConfig.DISTANCE_SAFE,
                                paddingVertical: AppConfig.DISTANCE_SAFE / 2,
                            }}>
                            {arr[i]}
                        </Text>
                    </TouchableHighlight>
                })
                }
            </View>
        </Popover>;
        return view;
    }

    render() {
        return (this.renderMoreView());
    }

}