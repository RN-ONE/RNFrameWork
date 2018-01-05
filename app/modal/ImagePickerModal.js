/**
 * @Author:JACK-GU
 * @Date:2017/12/28
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    ProgressViewIOS,
    TouchableWithoutFeedback,
    Modal,
    ActivityIndicator
} from "react-native";
import {Actions} from "react-native-router-flux";
import ProgressView from '../native/ProgressView';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import {connect} from "react-redux";
import SaveLocalUtil from "../util/SaveLoaclUtil";
import TouchableButton from "../component/TouchableButton";

let {width, height} = Dimensions.get('window');


var ImagePicker = require('react-native-image-picker');


var styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
});
/**
 * {
            uri: response.uri,
                fileSize: response.fileSize,
            fileName: response.fileName,
            width: response.width,
            height: response.height,
        }
 * */

export default class ImagePickerModal extends React.Component {
    static propTypes = {
        callback: PropTypes.function,
        titleColor: PropTypes.color
    };

    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0),
            options: props.options,
            visible: false,
        };
    }

    componentWillReceiveProps(next) {
        console.log({next});
        if (next.options) {
            this.setState({
                options: next.options,
                firstIndex: 0,
                secondIndex: 0,
            });
        }
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, {
            duration: 200,
            toValue: 1
        }).start();
    }


    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                    if (this.props.cancel) {
                        this.props.cancel();
                    }
                }}
            >
                <Animated.View style={[
                    styles.container,
                    {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        opacity: this.state.opacity,
                    }]}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.dismiss();
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <TouchableWithoutFeedback onPress={() => {
                            }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: AppConfig.COLOR_BLACK,
                                    width: width - 50,
                                }}>
                                    <Text style={{
                                        fontSize: AppConfig.TEXT_SIZE_BIG,
                                        fontWeight: 'bold',
                                        padding: AppConfig.DISTANCE_SAFE,
                                        color: this.props.titleColor ? this.props.titleColor : AppConfig.COLOR_THEME,
                                        backgroundColor: '#00000000',
                                    }}>{"请选择获取方式"}</Text>

                                    <View style={{
                                        flexGrow: 1,
                                        height: AppConfig.LINE_HEIGHT,
                                        backgroundColor: AppConfig.COLOR_LINE
                                    }}/>

                                    <Item text={'相机'} onPress={() => {
                                        //启动相机拍照
                                        ImagePicker.launchCamera({}, (response) => {
                                            //响应结果处理参考上面样例
                                        });
                                        this.dismiss();
                                    }}/>

                                    <View style={{
                                        flexGrow: 1,
                                        height: AppConfig.LINE_HEIGHT,
                                        backgroundColor: AppConfig.COLOR_LINE
                                    }}/>

                                    <Item text={'图库'} onPress={() => {
                                        //打开系统相册
                                        ImagePicker.launchImageLibrary({}, (response) => {
                                            //响应结果处理参考上面样例
                                            console.log({response});
                                            this.dismiss();
                                            if (this.props.callback) {
                                                this.props.callback({
                                                    uri: response.uri,
                                                    fileSize: response.fileSize,
                                                    fileName: response.fileName,
                                                    width: response.width,
                                                    height: response.height,
                                                });
                                            }
                                        });
                                    }}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </Modal>
        );
    }

    showPicker() {
        this.setState({visible: true});
    }

    dismiss() {
        this.setState({visible: false});
    }

}

const Item = React.createClass({
    render() {
        return (
            <TouchableButton onPress={this.props.onPress ? this.props.onPress : () => {
            }}>
                <View style={{paddingVertical: AppConfig.DISTANCE_SAFE}}>
                    <Text style={{fontSize: AppConfig.TEXT_SIZE_NORMAL, textAlign: 'center'}}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableButton>
        );
    }
});


// export default connect(state => ({
//     colors: state.ColorReducer.colors,
// }), dispatch => ({}))(ImagePickerModal);