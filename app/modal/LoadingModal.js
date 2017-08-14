import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    ProgressViewIOS,
    ActivityIndicator
} from "react-native";
import {Actions} from "react-native-router-flux";
import ProgressView from '../native/ProgressView';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';

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

export default class LoadingModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0),
        }
        ;
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, {
            duration: 200,
            toValue: 1
        }).start();
    }

    render() {
        return (
            <Animated.View style={[
                styles.container,
                {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    opacity: this.state.opacity
                }]}>
                <View style={{
                    justifyContent: "center",
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: AppConfig.COLOR_BLACK,
                    alignItems: "center",
                    padding: AppConfig.DISTANCE_SAFE,
                    backgroundColor: AppConfig.COLOR_BLACK,
                }}>

                    <View style={{alignItems: 'center'}}>
                        {
                            Platform.OS === 'android' ?
                                <ProgressView color={AppConfig.COLOR_WHITE}
                                              style={{width: 30, height: 30}}/>
                                :
                                <ActivityIndicator
                                    size="small"
                                    color={AppConfig.COLOR_WHITE}/>
                        }

                        <Text style={
                            [AppStyles.textSmallGray,
                                {
                                    color: AppConfig.COLOR_WHITE,
                                    marginTop: AppConfig.DISTANCE_SAFE,
                                }
                            ]}>
                            {this.props.message ? this.props.message : '加载中...'}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        );
    }
}
