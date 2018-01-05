/**
 * @Author:JACK-GU
 * @Date:2017/12/28
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import React from 'react';
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
    Image,
    ActivityIndicator
} from "react-native";
import {connect} from "react-redux";

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

        this.state = {};
    }

    componentWillReceiveProps(next) {

    }

    componentDidMount() {

    }

    render() {
        console.log("=====");
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    if (this.props.hideModal) {
                        this.props.hideModal();
                    }
                }}
            >
                <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.8)'}]}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.hideModal();
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.props.hideModal();
                                }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    height: width,
                                    width: width,
                                    justifyContent: 'flex-end'
                                }}>
                                    <Image
                                        style={{width: width, height: width}}
                                        source={{uri:this.props.uri}}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>

        );
    }
}


export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(ImageShowModal);