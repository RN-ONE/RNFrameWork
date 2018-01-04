/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 入口
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {NativeModules, Alert, Platform} from 'react-native';
import App from './App';
import CreateStore from './CreateStore';
import SplashScreen from 'react-native-smart-splash-screen'
import {setJSExceptionHandler} from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

const __DEV__ = true;

const store = CreateStore();
// Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message} ${e.stack}

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        let data = {
            name: e.name,
            message: e.message,
            stack: e.stack,
        };
        let str = JSON.stringify(data);


        Alert.alert(
            '错误提示！', '软件遇到点小问题，需要重新启动！',
            [{
                text: '重启软件',
                onPress: () => {
                    RNRestart.Restart();
                }
            }]
        );
    } else {
        console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
};

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

    componentDidMount() {
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


setJSExceptionHandler(errorHandler);

export default Index;