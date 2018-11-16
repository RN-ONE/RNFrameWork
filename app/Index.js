/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 入口
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {NativeModules, Alert, Platform, View} from 'react-native';
import App from './App';
import CreateStore from './CreateStore';
import SplashScreen from 'react-native-smart-splash-screen'
import {setJSExceptionHandler} from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';
import ToastAI from "./component/ToastAI";


const store = CreateStore();
// Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message} ${e.stack}

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        //Android和ios手机数据
        if (Platform.OS === 'android') {
            let data = {
                name: e.name,
                message: e.message,
                stack: e.stack,
            };
            let str = JSON.stringify(data);
            NativeModules.CatchJSModule.report(str);
        } else {
            var CatchReport = NativeModules.CatchReport;
            CatchReport.addEvent(e.name, e.message, e.stack);
        }

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

        //获取android状态栏的高度，因为框架使用的是沉浸式状态栏，布局是从上面开始的
        if (Platform.OS === "android") {
            NativeModules.BarHeightModule.getHeight((height) => {
                global.BARANDROIDHEIGHT = height;
            });
        }


        //保证性能
        if (Platform.OS === 'android') {
            NativeModules.NativeUtilsModule.isDebug((isDebug) => {
                if (!isDebug) {
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
            });
        } else {
            var Utils = NativeModules.Utils;
            Utils.addEventIsDebug((isDebug) => {
                if (!isDebug) {
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
