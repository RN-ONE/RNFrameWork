/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import HttpUtil from "../util/HttpUtil";
import * as ActionTypes from '../actions/ActionTypes';

export const changeColor = (params) => {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.ACTION_COLORCHANGE,
            data: params,
        });
    }
}