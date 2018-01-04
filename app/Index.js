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

const __DEV__ = true;

const store = CreateStore();



const errorHandler = (e, isFatal) => {
    if (isFatal) {
        Alert.alert(
            'Unexpected error occurred',
            `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

        We will need to restart the app.
        `,
            [{
                text: 'Restart',
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