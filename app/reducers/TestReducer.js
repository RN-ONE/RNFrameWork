/**
 * Created by naiyu_wang on 16/10/14.
 */
import {handleActions} from 'redux-actions';
import {Actions} from 'react-native-router-flux';
import * as ActionTypes from '../actions/ActionTypes';


const userState = {
    text: '点击进行网络请求'
}

export default handleActions({
    [ActionTypes.ACTION_TEST]: (state, action) => {
        Actions.pop();
        let response = action.payload.data;
        console.log(response);
        if (response.success) {
            var movie = response.response.data.movies[0];
            return {
                text: '电影列表中的第一个信息《' + movie.title + "-" + movie.releaseYear + '》',
            }
        } else {
            return {
                text: "失败"
            }
        }
    }
}, userState);

