/**
 * @Author:JACK-GU
 * @Date:2017-08-16
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import {handleActions} from 'redux-actions';
import {Actions} from 'react-native-router-flux';
import * as ActionTypes from '../actions/ActionTypes';
import * as AppConfig from '../config/AppConfig';
import {Platform, NativeModules} from "react-native";
import * as Const from '../config/Const';
import SaveLocalUtil from "../util/SaveLoaclUtil";


/**
 * 换肤功能，可以实现换肤，使用方法：
 * export default connect(state => ({
    text: state.TestReducer.text,
    colors: state.ColorReducer.colors,
}), dispatch => ({
    changeColor: (data) => dispatch(ChangeColorAction.changeColor(data)),
}))(Main2);
 直接使用this.props.colors里面的颜色就可以通过调用changeColor方法进行改变
 * */
const colorState = {
    colors: {
        //主题色
        COLOR_THEME: AppConfig.COLOR_THEME,
        //黑色，不是000000
        COLOR_BLACK: AppConfig.COLOR_BLACK,
        //白色
        COLOR_WHITE: AppConfig.COLOR_WHITE,
        //字体灰色
        TEXT_COLOR_GRAY: AppConfig.TEXT_COLOR_GRAY,
        //背景色
        COLOR_BG: AppConfig.COLOR_BG,
        //线条的颜色
        COLOR_LINE: AppConfig.COLOR_LINE,
    }
}


export default handleActions({
    [ActionTypes.ACTION_CHANGE_COLOR]: (state, action) => {
        let data = action.data;
        let newState = {
            colors: {//主题色
                COLOR_THEME: data.COLOR_THEME ? data.COLOR_THEME : AppConfig.COLOR_THEME,
                //黑色，不是000000
                COLOR_BLACK: data.COLOR_BLACK ? data.COLOR_BLACK : AppConfig.COLOR_BLACK,
                //白色
                COLOR_WHITE: data.COLOR_WHITE ? data.COLOR_WHITE : AppConfig.COLOR_WHITE,
                //字体灰色
                TEXT_COLOR_GRAY: data.TEXT_COLOR_GRAY ? data.TEXT_COLOR_GRAY : AppConfig.TEXT_COLOR_GRAY,
                //背景色
                COLOR_BG: data.COLOR_BG ? data.COLOR_BG : AppConfig.COLOR_BG,
                //线条的颜色
                COLOR_LINE: data.COLOR_LINE ? data.COLOR_LINE : AppConfig.COLOR_LINE,
            }
        };

        //保存到本地
        SaveLocalUtil.save(Const.COLOR_LOCAL, JSON.stringify(newState.colors));
        return newState;
    }
}, colorState);
