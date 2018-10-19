/**
 *
 * 选择图片的类，建议集成这个，不用再回调里面来获得获取图片数据得方法在调用
 *
 * @Author:JACK-GU
 * @Date:2018/2/28 15:34
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasePhotoGallery from "./BasePhotoGallery";

export default class PhotoGallery extends Component {
    static propTypes = {
        layoutWidth: PropTypes.float,//这个控件的宽度,不传就是整个屏幕的宽度
        widthSeparator: PropTypes.float,//每个的间隔
        maxImageNum: PropTypes.int,//最多多少个
        perRowNum: PropTypes.int,//每一行的个数
        callBack: PropTypes.function,//这个是回调，返回的是一个方法，可以来调用获得数据
        imgs: PropTypes.array,//传入图片的uri，是一个string
        notShowRemove: PropTypes.bool,//不显示移除图标
        notShowLRSeparator: PropTypes.bool,//不显示左右的间隔
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
