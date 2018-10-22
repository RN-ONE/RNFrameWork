/**
 * iphoneX适配工具类
 *
 * @Author:JACK-GU
 * @Date:2018/2/28 16:10
 * @E-Mail:528489389@qq.com
 */
import {Dimensions, Platform} from 'react-native';

export default class IphoneXUtil {
    /**
     * 判断是不是iphoneX
     * @Author: JACK-GU
     * @Date: 2018/2/28 16:11
     * @E-Mail: 528489389@qq.com
     */
    static isIphoneX() {
        let {height, width} = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            (height === 812 || width === 812 //X XS
                || height === 896 || width === 896//XS MAX  XR
            )
        );
    }
    static iphoneXBottom() {
        if (IphoneXUtil.isIphoneX()) {
            return 34;
        } else {
            return 0;
        }
    }
}
