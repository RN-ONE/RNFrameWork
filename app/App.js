/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe: 场景配置
 */
import React, {Component} from 'react';
import {
    ToastAndroid,
    NativeModules
} from 'react-native';
import * as AppConfig from "./config/AppConfig";
import {
    Router,
    Scene,
    Reducer,
    Actions,
    TabBar,
    Route,
} from 'react-native-router-flux';
import {connect} from "react-redux";
import Main from "./scene/Main";
import ChangeTheme from "./scene/ChangeTheme";
import LoadingModal from "./modal/LoadingModal";
import * as Const from './config/Const';
import * as ChangeColorAction from './actions/ChangeColorAction';
import SaveLocalUtil from "./util/SaveLoaclUtil";
import TabIcon from "./component/TableIcon";
import Main2 from "./scene/Main2";
import Main3 from "./scene/Main3";
import ImageShowModal from "./modal/ImageShowModal";
import ToastAI from "./component/ToastAI";
import SelectModal from "./modal/SelectModal";

this.isEnd = true;

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
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
        //自己写的system.exit(0)，不然不能完全退出软件
        NativeModules.NativeUtilsModule.exit();
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
// 构造
    constructor(props) {
        super(props);
        // 读取主题色
        SaveLocalUtil.load(Const.COLOR_LOCAL, (data) => {
            let colors = JSON.parse(data);
            props.changeColor(colors);
        })
    }

    render() {
        return (
            <Router
                backAndroidHandler={() => backAndroidHandler()}
                createReducer={reducerCreate}
                getSceneStyle={getSceneStyle}>
                <Scene key="modal" modal initial lightbox>
                    <Scene key="root">
                        <Scene key="tabbar">
                            <Router
                                tabs
                                tabBarComponent={TabIcon}
                                swipeEnabled={false}
                                tabBarPosition="bottom">
                                <Route hideNavBar
                                       key="main" title="main">
                                    <Scene key="main" component={Main}/>
                                    <Scene
                                        hideTabBar
                                        key="changeTheme"
                                        component={ChangeTheme}/>

                                </Route>

                                <Route hideNavBar
                                       key="main2" title="main2">
                                    <Scene key="main2" component={Main2}/>
                                </Route>

                                <Route hideNavBar
                                       key="main3" title="main3">
                                    <Scene key="main3" component={Main3}/>
                                </Route>
                            </Router>
                        </Scene>
                    </Scene>

                    <Scene key="loading"
                           hideNavBar
                           component={LoadingModal}
                           getSceneStyle={getModalStyle}/>

                    <Scene key="selectModal"
                           hideNavBar
                           component={SelectModal}
                           getSceneStyle={getModalStyle}/>

                    <Scene key="imageShowModal"
                           hideNavBar
                           component={ImageShowModal}
                           getSceneStyle={getModalStyle}/>
                </Scene>
            </Router>
        )
    }
}

export default connect(state => ({}), dispatch => ({
    changeColor: (data) => dispatch(ChangeColorAction.changeColor(data)),
}))(App);