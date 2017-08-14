/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import HttpUtil from "../util/HttpUtil";
import * as ActionTypes from '../actions/ActionTypes';

export const testGetMoves = (params) => {
    return (dispatch, getState) => {
        let httpUtil = new HttpUtil();
        httpUtil.connectGet(params, "movies.json", (data) => {
            dispatch({
                type: ActionTypes.ACTION_TEST,
                payload: {
                    data
                }
            });
        });
    }
}