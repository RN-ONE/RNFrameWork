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
import {Actions} from 'react-native-router-flux';

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

        this.state = {
            opacity: new Animated.Value(0),
        };
    }

    componentWillReceiveProps(next) {

    }

    componentDidMount() {
        Animated.timing(this.state.opacity, {
            duration: 200,
            toValue: 1
        }).start();
    }

    render() {
        console.log("=====");
        console.log(this.props.picData);
        return (

            <Animated.View style={[
                styles.container,
                {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    opacity: this.state.opacity
                }]}>
                <View style={{alignItems: 'center'}}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.pop();
                        }}>
                        <View style={{
                            backgroundColor: 'white',
                            height: width,
                            width: width,
                            justifyContent: 'flex-end'
                        }}>
                            <Image
                                style={{width: width, height: width}}
                                source={{uri: this.props.item.uri}}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Animated.View>
        );
    }
}


export default connect(state => ({
    colors: state.ColorReducer.colors,
}), dispatch => ({}))(ImageShowModal);