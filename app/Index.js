/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 入口
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {NativeModules, Platform} from 'react-native';

import App from './App';
import CreateStore from './CreateStore';

const __DEV__ = false;

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

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}


export default Index;