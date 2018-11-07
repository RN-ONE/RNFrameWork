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
    Platform,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import {connect} from "react-redux";
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import IphoneXUtil from "../util/IphoneXUtil";

let {height, width} = Dimensions.get('window');

const items = [
    {title: "主页", iconName: "home"},
    {title: "消息", iconName: "comments"},
    {title: "设置", iconName: "cog"},
];


class TabIcon extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {selectIndex: props.navigation.state.index};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectIndex: nextProps.navigation.state.index});
    }

    render() {
        return (
            <View style={{
                backgroundColor: this.props.colors.COLOR_WHITE,
                height: IphoneXUtil.isIphoneX() ? 60 + IphoneXUtil.iphoneXBottom() : 60,
                elevation: 10,
            }}>
                {Platform.OS === 'android' ?
                    null :
                    <View style={{flexDirection: 'row'}}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: this.props.colors.COLOR_LINE,
                                height: AppConfig.LINE_HEIGHT
                            }}/>
                    </View>
                }


                <View style={{flexDirection: 'row', flexGrow: 1,}}>
                    {
                        (() => {
                            let btnContent = [];
                            items.forEach((btn, index,) => {
                                btnContent.push(
                                    <TouchableWithoutFeedback style={{flex: 1}} onPress={() => {
                                        this.props.jumpTo(this.props.navigation.state.routes[index].key);
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
                                                    style={[AppStyles.textNormalGray, {
                                                        color: this.state.selectIndex === index ? this.props.colors.COLOR_THEME : this.props.colors.TEXT_COLOR_GRAY,
                                                        marginTop: 3
                                                    }]}>
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
                                backgroundColor: 'white',
                            }}/>
                        </View>
                        : null
                }
            </View>
        );
    }
}

export default connect(state => ({colors: state.ColorReducer.colors,}), dispatch => ({}))(TabIcon);
