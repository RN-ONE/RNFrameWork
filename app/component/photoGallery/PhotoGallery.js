/**
 *
 * 选择图片的类，建议集成这个，不用再回调里面来获得获取图片数据得方法在调用
 *
 * @Author:JACK-GU
 * @Date:2018/2/28 15:34
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import React, {Component, PropTypes} from 'react';
import BasePhotoGallery from "./BasePhotoGallery";

export default class PhotoGallery extends Component {
    static propTypes = {
        layoutWidth: PropTypes.float,//这个控件的宽度,不传就是整个屏幕的宽度
        widthSeparator: PropTypes.float,//每个的间隔
        maxImageNum: PropTypes.int,//最多多少个
        perRowNum: PropTypes.int,//每一行的个数
    };

    render() {
        return (
            <BasePhotoGallery
                {...this.props}
                callBack={(call) => {
                    this.photoGalleryCallBack = call;
                }}
            />
        );
    }

    /**
     *
     * 获取图片的数据
     *
     *@Author: JACK-GU
     *@Date: 2018/2/28 15:37
     *@E-Mail: 528489389@qq.com
     */
    getDataS() {
        return this.photoGalleryCallBack();
    }
}
