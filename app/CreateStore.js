/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 入口
 */
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/IndexReducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

export default (data = {}) => {
    return createStore(reducers, data, middleware);
}
