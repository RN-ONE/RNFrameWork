/**
 * @Author:JACK-GU
 * @Date:2017/12/28
 * @E-Mail:528489389@qq.com
 * @Describe: 查看大图的modal
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    PixelRatio,
    NativeModules,
    Modal,
    Image,
    ActivityIndicator
} from "react-native";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';
import * as AppConfig from '../config/AppConfig';
import Gallery from '../component/gallery/Gallery';
import TouchableButton from "../component/TouchableButton";
import ToastAI from "../component/ToastAI";

let {width, height} = Dimensions.get('window');

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

class ImageShowModal extends React.Component {
    constructor(props) {
        super(props);

        let uris = [];
        for (let item of props.items) {
            uris.push({source: {uri: item.uri}});
        }

        this.state = {
            uris: uris,
            index: Platform.OS === 'android' ? 0 : props.index,
            images: uris.length,
        };


    }

    componentWillMount() {
        if (Platform.OS === "android") {
            //修改原生的
            NativeModules.BarColorModule.setColor('#000000');
        }
    }

    componentWillReceiveProps(next) {

    }


    render() {
        console.log({uris: this.state.uris});

        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    if (Platform.OS === "android") {
                        //修改原生的，默认的颜色就可以了
                        NativeModules.BarColorModule.setColor('#33000000');
                    }
                    Actions.pop();
                }}>
                <View style={[
                    styles.container,
                    {
                        backgroundColor: "rgba(0,0,0,0.8)"
                    }]}>
                    <View style={{alignItems: 'center'}}>
                        <View style={{
                            width: width,
                            height: height,
                        }}>
                            <Gallery
                                initialPage={Platform.OS === 'android' ? 0 : this.props.index}
                                style={{flex: 1, backgroundColor: 'black'}}
                                images={this.state.uris}
                                onPageSelected={(index) => {
                                    this.setState({index: index});
                                }}
                            />

                            {this.galleryCount}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    get galleryCount() {
        return (
            <View style={{
                top: 10,
                paddingTop: Platform.OS === 'android' ? global.BARANDROIDHEIGHT / PixelRatio.get() : 20,
                width: '100%',
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableButton onPress={() => {
                    if (Platform.OS === "android") {
                        //修改原生的
                        NativeModules.BarColorModule.setColor('#33000000');
                    }
                    Actions.pop();
                }}>
                    <Image
                        style={{
                            marginLeft: 20,
                            height: 30,
                            width: 30
                        }}
                        source={require('../img/view_image_pop.png')}/>
                </TouchableButton>

                <Text style={{
                    textAlign: 'right',
                    flex: 1,
                    color: 'white',
                    fontSize: 25,
                    fontStyle: 'italic',
                    paddingRight: 20
                }}>
                    {this.state.index + 1}

                    <Text style={{
                        textAlign: 'right',
                        color: 'white',
                        fontSize: AppConfig.TEXT_SIZE_BIG,
                        fontStyle: 'normal',
                        paddingRight: 20
                    }}> / {this.state.uris.length}
                    </Text>
                </Text>
            </View>
        );
    }
}


export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(ImageShowModal);