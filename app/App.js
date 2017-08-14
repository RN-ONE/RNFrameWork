/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe: 场景配置
 */

import React, {Component} from 'react';
import {
    ToastAndroid,
} from 'react-native';
import * as AppConfig from "./config/AppConfig";
import {
    Modal,
    Router,
    Scene,
    Reducer,
    Actions,
    ActionConst,
    Switch,
} from 'react-native-router-flux';
import {
    StackNavigator,
} from 'react-navigation';
import Main from "./scene/Main";
import Main2 from "./scene/Main2";
import LoadingModal from "./modal/LoadingModal";

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log("state:", state);
        console.log("action:", action);
        //index

        this.isEnd = false;
        this.loading = false;
        if (action.routeName) {
            if (action.routeName === 'loading') {
                this.loading = true;
            }

            if (action.routeName === 'main') {
                this.isEnd = true;
            }
        }
        return defaultReducer(state, action);
    };
};

const exitAppFn = params => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;

}


//重写了backAndroidHandler,exitAppFn就是无效的了
const backAndroidHandler = () => {
    if (this.loading) {
        return true;
    }
    if (this.isEnd) {
        if (exitAppFn) {
            return exitAppFn({});
        }
        return false;
    } else {
        Actions.pop();
        return true;
    }
};


const getSceneStyle = () => {
    const style = {
        flex: 1,
        backgroundColor: AppConfig.COLOR_BG,
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    return style;
};


const getModalStyle = () => {
    const style = {
        flex: 1,
        backgroundColor: 'transport',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    return style;
};

/**
 * lightbox:才可以让背景透明
 * */
class App extends Component {
    render() {
        return (
            <Router
                backAndroidHandler={() => backAndroidHandler()}
                createReducer={reducerCreate}
                getSceneStyle={getSceneStyle}>
                <Scene key="modal" modal initial lightbox>

                    <Scene key="root" hideTabBar hideNavBar>

                        <Scene key="main" component={Main}/>

                        <Scene key="main2" component={Main2}/>
                    </Scene>

                    <Scene key="loading"
                           hideNavBar
                           component={LoadingModal}
                           getSceneStyle={getModalStyle}/>
                </Scene>
            </Router>
        )
    }
}

export default App;