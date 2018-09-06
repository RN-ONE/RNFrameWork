/**
 * @Author:JACK-GU
 * @Date:2017-08-17
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import React, {Component, PropTypes} from 'react';
import {Dimensions, Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from "react-redux";
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import IphoneXUtil from "../util/IphoneXUtil";

let {height, width} = Dimensions.get('window');
const height_tab = 120;


class TabIcon extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {selectIndex: props.navigationState.index};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectIndex: nextProps.navigationState.index});
    }

    render() {
        let jumpToIndex = this.props.jumpToIndex;
        console.log({props: this.props});

        return (
            <View style={{
                backgroundColor: "transport",
                height: IphoneXUtil.isIphoneX() ? height_tab + IphoneXUtil.iphoneXBottom() : height_tab,
            }}>
                <View style={{flexDirection: 'row', flexGrow: 1, justifyContent: 'center'}}>
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        height: height_tab / 2, flexGrow: 1,
                        backgroundColor: 'white',
                    }}>
                        <Item index={0} title={"信息录入"}
                              status={this.state.selectIndex === 0 ? 1 : 0}
                              colors={this.props.colors}
                              jumpToIndex={(index) => {
                                  jumpToIndex(index);
                              }}/>
                        <Item index={1} title={"信息审核"}
                              status={this.state.selectIndex === 1 ? 1 : 0}
                              colors={this.props.colors}
                              jumpToIndex={(index) => {
                                  jumpToIndex(index);
                              }}/>
                        <View style={{width: 100}}/>
                        <Item index={3} title={"批量上传"}
                              status={this.state.selectIndex === 0 ? 3 : 0}
                              colors={this.props.colors}
                              jumpToIndex={(index) => {
                                  jumpToIndex(index);
                              }}/>
                        <Item index={4} title={"设置"}
                              status={this.state.selectIndex === 4 ? 1 : 0}
                              colors={this.props.colors}
                              jumpToIndex={(index) => {
                                  jumpToIndex(index);
                              }}/>
                    </View>


                    <View style={{
                        width: 100,
                        height: height_tab,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'
                    }}>

                        <TableCenter jumpToIndex={(index) => {
                            jumpToIndex(index);
                        }}/>
                    </View>
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


/**
 *
 * @Author: JACK-GU
 * @Date: 2018-09-05 15:51
 * @E-Mail: 528489389@qq.com
 */
class Item extends Component {
    static propTypes = {
        status: PropTypes.number, //1 选中，0位选中，-1禁用
        index: PropTypes.number,
        title: PropTypes.string,
        jumpToIndex: PropTypes.func,
    };

    render() {
        let index = this.props.index;
        let status = this.props.status;

        let source = index === 0 ?
            status === 1 ? require("../img/tabicon/table_one_select.png") :
                status === -1 ? require("../img/tabicon/table_one_not_enable.png") :
                    require("../img/tabicon/table_one_normal.png")
            : index === 1 ?
                status === 1 ? require("../img/tabicon/table_two_select.png") :
                    status === -1 ? require("../img/tabicon/table_two_not_enable.png") :
                        require("../img/tabicon/table_two_normal.png")
                : index === 3 ?
                    status === 1 ? require("../img/tabicon/table_three_select.png") :
                        status === -1 ? require("../img/tabicon/table_three_not_enable.png") :
                            require("../img/tabicon/table_three_normal.png")
                    :
                    status === 1 ? require("../img/tabicon/table_four_select.png") :
                        status === -1 ? require("../img/tabicon/table_four_not_enable.png") :
                            require("../img/tabicon/table_four_normal.png")
        ;

        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.jumpToIndex(index);
            }}>
                <View style={{
                    height: height_tab / 2,
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={source}
                           style={{height: 25, width: 25}}/>

                    <Text style={[AppStyles.textSmallGray, {
                        color: status === 1 ? this.props.colors.COLOR_THEME : this.props.colors.TEXT_COLOR_GRAY,
                        marginTop: AppConfig.DISTANCE_SAFE / 2,
                    }]}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class TableCenter extends Component {
    static propTypes = {
        jumpToIndex: PropTypes.func,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {status: 0}; //默认暂停的
    }


    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                        status: this.state.status === 1 ? 0 : 1
                    });
                    this.props.jumpToIndex(2);
                }}>
                    <Image style={{height: 75, width: 75}}
                           source={this.state.status === 0 ? require("../img/tabicon/table_center_pause.png")
                               : require("../img/tabicon/table_center_start.png")}/>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default connect(state => ({colors: state.ColorReducer.colors,}), dispatch =>
    ({}))(TabIcon);
