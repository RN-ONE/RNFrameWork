/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 这里合并reducer,因为一个项目不可能只有一个reducer
 */

import {combineReducers} from 'redux';
import TestReducer from './TestReducer';
import ColorReducer from './ColorReducer';

export default combineReducers({
    TestReducer,
    ColorReducer,
});