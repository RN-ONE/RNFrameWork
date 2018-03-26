/**
 * 自定义image
 *
 * @Author:JACK-GU
 * @Date:2018/3/21 16:03
 * @E-Mail:528489389@qq.com
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import ProgressView from '../native/ProgressView';
import * as AppConfig from "../config/AppConfig";

let {height, width} = Dimensions.get('window');


export default class MyImage extends Component {
    STATUS_LOADING = 0;
    STATUS_SUCCESS = 1;
    STATUS_FAIL = 2;
    success = false;

    static propTypes = {
        ...Image.propTypes,
        total: PropTypes.number.isRequired,//总共条数
        onRefresh: PropTypes.func,//刷新回调,不传不显示指示器
        onLoadMore: PropTypes.func,//加载更多回调，携带参数，true表示没有更多了,不传不显示指示器
        backgroundColor: PropTypes.string,//背景色
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {status: this.STATUS_LOADING};
        success = false;
    }

    componentDidMount() {
    }

    render() {
        return (
            <View
                style={[this.props.style, {
                    backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : AppConfig.COLOR_BG,
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}>
                {
                    this.state.status === this.STATUS_LOADING ?
                        Platform.OS === 'android' ?
                            <ProgressView
                                color={AppConfig.TEXT_COLOR_GRAY}
                                style={{width: 20, height: 20}}/>
                            :
                            <ActivityIndicator
                                size="small"
                                color={AppConfig.TEXT_COLOR_GRAY}/>
                        :
                        this.state.status === this.STATUS_FAIL ?
                            <Image
                                resizeMode={this.props.style.width ? "contain" : "center"}
                                source={require('../img/img_load_fail.png')}
                                style={{
                                    resizeMode: this.props.style.width ? "contain" : "center",
                                    width: this.props.style.width ? this.props.style.width : width,
                                    height: this.props.style.height ? this.props.style.height : height
                                }}/>
                            : null
                }

                <Image
                    {...this.props}
                    style={[this.props.style, {
                        marginLeft: 0,
                        opacity: this.state.status === this.STATUS_SUCCESS ? 1 : 0,
                        position: 'absolute',
                    }]}
                    onLoad={() => {
                        this.success = true;
                    }}
                    onLoadEnd={() => {
                        this.setState({
                            status: this.success ? this.STATUS_SUCCESS : this.STATUS_FAIL,
                        });
                    }}
                />
            </View>
        );
    }
}
