/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native';
import {connect} from "react-redux";
import TitleBar from "../component/TitleBar";
import * as TestAction from "../actions/TestAction";
import StepIndicator from "react-native-step-indicator";
import TouchableButton from "../component/TouchableButton";
import ThemeButton from "../component/ThemeButton";
import * as AppConfig from '../config/AppConfig';


const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPosition: 0
        }
    }

    render() {
        return (
            <View style={{backgroundColor: this.props.colors.COLOR_BG, flex: 1}}>
                <TitleBar
                    title="主页2"
                    showBack={false}
                    leftText="返回"
                    rightText="确定"
                    colors={this.props.colors}
                    onPress={() => {
                    }}/>
                <View
                    style={{paddingTop: AppConfig.DISTANCE_SAFE}}>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={this.state.currentPosition}
                        labels={labels}/>


                    <ThemeButton textColor={'#FFFFFF'} text={'上一个'} onPress={() => {
                        this.setState({
                            currentPosition: this.state.currentPosition - 1 >= 0
                                ? this.state.currentPosition - 1 : labels.length - 1
                        });
                    }}/>

                    <ThemeButton textColor={'#FFFFFF'} text={'下一个'} onPress={() => {
                        this.setState({
                            currentPosition: this.state.currentPosition + 1 >= labels.length
                                ? 0 : this.state.currentPosition + 1
                        });
                    }}/>
                </View>

            </View>
        )
    }

}

export default connect(state => ({
    text: state.TestReducer.text,
    colors: state.ColorReducer.colors,
}), dispatch => ({
    getMoveList: (data) => dispatch(TestAction.testGetMoves(data)),
}))(Main);