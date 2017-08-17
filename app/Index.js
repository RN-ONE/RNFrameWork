/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 入口
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {NativeModules, Platform} from 'react-native';
import {connect} from "react-redux";
import App from './App';
import CreateStore from './CreateStore';
import SplashScreen from 'react-native-smart-splash-screen'

const __DEV__ = true;

const store = CreateStore();

class Index extends Component {
    constructor(props) {
        super(props);
        global.BARANDROIDHEIGHT = Platform.OS === "android" ? -1 : 0;

        //保证性能
        if (!__DEV__) {
            global.console = {
                info: () => {
                },
                log: () => {
                },
                warn: () => {
                },
                debug: () => {
                },
                error: () => {
                },
            };
        }

        if (Platform.OS === "android") {
            NativeModules.BarHeightModule.getHeight((height) => {
                global.BARANDROIDHEIGHT = height;
            });
        }


    }

    componentDidMount () {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 2000,
            delay: 500,
        })
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export default Index;