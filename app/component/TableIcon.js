/**
 * @Author:JACK-GU
 * @Date:2017-08-17
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import React, {
    PropTypes,
    Component
} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import ThemeButton from "./ThemeButton";
import {connect} from "react-redux";
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import ToastAI from "./ToastAI";

const items = [
    {title: "main", iconName: "home"},
    {title: "main2", iconName: "bug"},
    {title: "main3", iconName: "cog"},
];


class TabIcon extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {selectIndex: 0};
        console.log(props);
    }

    render() {
        return (
            <View style={{backgroundColor: this.props.colors.COLOR_WHITE, height: 60}}>
                <View style={{flexDirection: 'row'}}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: this.props.colors.COLOR_LINE,
                            height: AppConfig.LINE_HEIGHT
                        }}/>
                </View>

                <View style={{flexDirection: 'row', flex: 1}}>
                    {
                        (() => {
                            let btnContent = [];
                            items.forEach((btn, index,) => {
                                btnContent.push(
                                    <TouchableWithoutFeedback style={{flex: 1}} onPress={() => {
                                        this.props.jumpToIndex(index);
                                        this.setState({selectIndex: index});
                                    }}>
                                        <View style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flex: 1
                                        }}>
                                            <View style={{alignItems: 'center'}}>
                                                <Icon name={btn.iconName} size={25}
                                                      color={this.state.selectIndex === index ? this.props.colors.COLOR_THEME : this.props.colors.TEXT_COLOR_GRAY}
                                                      iconStyle={{padding: 0, margin: 0}}/>

                                                <Text
                                                    style={[AppStyles.textNormalGray, {color: this.state.selectIndex === index ? this.props.colors.COLOR_THEME : this.props.colors.TEXT_COLOR_GRAY}]}>
                                                    {btn.title}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })
                            return btnContent;
                        })()
                    }
                </View>
            </View>
        );
    }
}

export default connect(state => ({colors: state.ColorReducer.colors,}), dispatch => ({}))(TabIcon);