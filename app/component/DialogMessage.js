/**
 * @Author:JACK-GU
 * @Date:17/2/19
 * @E-Mail:528489389@qq.com
 * @Describe:
 * 用法：
 * （1）弹出两个按钮的类型
 *  this.dialogbox.confirm({
 *          title: 'title',//标题
 *          contentColor: AppConfig.COLOR_THEME,//内容颜色
 *          content: ['come on!'],//内容
 *          ok: {
 *              text: 'Y',
 *              callback: () => {
 *                  this.dialogbox.alert('Good!');
 *              },
 *          },//右边按钮
 *          cancel: {
 *             text: 'N',
 *              callback: () => {
 *                 this.dialogbox.alert('Hurry up！');
 *              },
 *          },
 *          //左边按钮
 *      });
 *（1）弹出一个按钮的类型
 * 有个小bug，如果弹出两个按钮，两个的text的长度不同，会出现按钮的长度不同的问题
 * ，所以请用全角的空格来补齐。
 *
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    PixelRatio,
    Platform,
} from 'react-native';
import * as AppConfig from '../config/AppConfig';

class PopContent extends Component {

    static propTypes = {
        title: PropTypes.string,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])),
        ]),
        btns: PropTypes.array,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {title, content, btns, contentColor} = this.props;
        let btnNumber = btns.length;
        return (
            <View style={styles.tipBox}>
                {title && <View style={styles.tipTitleBox}><Text
                    style={styles.tipTitle}>{title}</Text></View>}
                <View style={styles.tipContentBox}>
                    {(() => {
                        let tipContent = [];
                        if (content instanceof Array) {
                            content.forEach((item, index, arr) => {
                                if (index > 9) {
                                    return;
                                }
                                item && ( tipContent[index] = (
                                    <Text
                                        style={[styles.tipContent, {color: contentColor ? contentColor : AppConfig.COLOR_BLACK}]}
                                        key={'tipContent' + index}>{item}</Text>) );
                            });
                        } else {
                            content && ( tipContent[0] = (
                                <Text
                                    style={[styles.tipContent, {color: contentColor ? contentColor : AppConfig.COLOR_BLACK}]}
                                    key={'tipContent'}>{content}</Text>) );
                        }
                        return tipContent;
                    })()}
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.line}/>
                </View>
                <View style={[styles.btnBox, btnNumber > 2 ? {flexDirection: 'column',} : {}]}>
                    {(() => {
                        let btnContent = [];
                        btns.forEach((btn, index,) => {
                            btnContent.push(
                                <TouchableOpacity style={styles.btnTextBox}
                                                  onPress={btn.callback}
                                                  key={'btnTextBox' + index}
                                                  activeOpacity={AppConfig.OPACITY}>
                                    <Text
                                        style={[styles.btnText, {color: btn.color}]}>{btn.text}</Text>
                                </TouchableOpacity>
                            );
                            index != btnNumber - 1 && btnContent.push(<View
                                style={styles.btnLine}
                                key={'btnLine' + index}/>);
                        });
                        return btnContent;
                    })()}
                </View>
            </View>
        );
    }

}
;

class DisplayPopup extends Component {

    static defaultProps = {
        isOverlay: true,
        isOverlayClickClose: true,
        btns: [{
            text: 'ok',
            callback: () => {
            },
        }],
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            isVisible: true,
        };

    }

    close() {
        this.setState({
            isVisible: false,
        });
    }

    _renderOverlay() {
        if (this.props.isOverlay) {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    if (this.props.isOverlayClickClose) {
                        this.close();
                    }
                }}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            );
        }
    }

    render() {
        let {isVisible, isOverlay,} = this.state;
        let {title, content, btns,} = this.props;
        btns = btns.map((item) => {
            return {
                text: item.text,
                callback: () => {
                    typeof item.callback === 'function' && item.callback();
                    this.close();
                },
            };
        });
        if (isVisible) {
            return (
                <View style={styles.popupContainer}>
                    {this._renderOverlay()}
                    <View style={styles.tipBoxView}>
                        <PopContent title={title} content={content} btns={btns}/>
                    </View>
                </View>
            );
        }
        return <View style={styles.hidden}/>;
    }

}
;

export default class DialogMessage extends Component {

    static DisplayPopup = DisplayPopup;

    static defaultProps = {
        isOverlay: true,
        isOverlayClickClose: true,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            isVisible: false,
            isOverlay: this.props.isOverlay,
            isOverlayClickClose: this.props.isOverlayClickClose,
            content: null,
        };
    }

    _pop(args) {
        this.setState({
            content: ( <PopContent {...args}/> ),
            isVisible: true,
        });
    }

    alert(...text) {
        text = text.map((text) => text);
        this._pop({
            content: text || '',
            btns: [{
                text: 'OK',
                callback: () => {
                    this.close();
                },
            }],
        });
    }

    tip(args) {
        let {title, content, btn,} = args;
        this._pop({
            title: title,
            content: content,
            contentColor: args.contentColor,
            btns: [{
                text: btn && btn.text || 'OK',
                callback: () => {
                    this.close();
                    btn && typeof btn.callback === 'function' && btn.callback();
                },
            }],
        });
    }

    confirm(args) {
        let {title, content, ok, cancel} = args;
        this._pop({
            title: title,
            content: content,
            contentColor: args.contentColor,
            btns: [
                {
                    text: cancel && cancel.text || 'Cancel',
                    color: cancel && cancel.color || AppConfig.COLOR_THEME,
                    callback: () => {
                        this.close();
                        cancel && typeof cancel.callback === 'function' && cancel.callback();
                    },
                },
                {
                    text: ok && ok.text || 'OK',
                    color: ok && ok.color || AppConfig.COLOR_THEME,
                    callback: () => {
                        this.close();
                        ok && typeof ok.callback === 'function' && ok.callback();
                    },
                },
            ],
        });
    }

    pop(args) {
        this._pop(args);
    }

    close() {
        this.setState({
            isVisible: false,
        });
    }

    _renderOverlay() {
        if (this.state.isOverlay) {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    if (this.state.isOverlayClickClose) {
                        this.close();
                    }
                }}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            );
        }
    }

    _renderContent() {
        return (
            <View style={styles.tipBoxView}>
                {this.state.content}
            </View>
        );
    }

    render() {
        let {isVisible, isOverlay,} = this.state;
        if (isVisible) {
            return (
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                    }}>
                    <View style={styles.popupContainer}>
                        {this._renderOverlay()}
                        {this._renderContent()}
                    </View>
                </Modal>
            );
        }
        return <View style={styles.hidden}/>;
    }

};

let styles = StyleSheet.create({
    popupContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'rgba(00, 00, 00, 0)',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: '#000',
        opacity: .6,
    },
    tipBoxView: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 80,
        borderRadius: 8,
        overflow: 'hidden',
    },
    tipBox: {
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipTitleBox: {
        marginHorizontal: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipTitle: {
        fontSize: AppConfig.TEXT_SIZE_BIG,
        fontWeight: 'bold',
        textAlign: 'center',
        color: AppConfig.COLOR_THEME,
    },
    tipContentBox: {
        flexDirection: 'column',
        marginBottom: 11,
        marginTop: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipContent: {
        fontSize: AppConfig.TEXT_SIZE_NORMAL,
        marginBottom: 5,
        color: AppConfig.COLOR_BLACK,
        textAlign: 'center',
    },
    line: {
        height: Platform.OS === 'ios' ? 1 : 0.5,
        flex: 1,
        backgroundColor: AppConfig.COLOR_LINE,
    },
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    btnTextBox: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    btnLine: {
        height: 40,
        width: Platform.OS === 'ios' ? 1 : 0.5,
        backgroundColor: AppConfig.COLOR_LINE,
    },
    btnText: {
        textAlign: 'center',
        fontSize: AppConfig.TEXT_SIZE_NORMAL,
        color: AppConfig.COLOR_THEME,
    },
    hidden: {
        position: 'absolute',
        height: 0,
        width: 0,
        top: 0,
        left: 0,
    },
});
//
// if (Platform.OS === 'ios') {
//     styles = {
//         ...styles,
//         tipTitle: {
//             fontSize: AppConfig.TEXT_SIZE_BIG,
//             fontWeight: '500',
//             textAlign: 'center',
//         },
//         tipContent: {
//             fontSize: AppConfig.TEXT_SIZE_NORMAL,
//             marginTop: 3,
//             marginBottom: 7,
//             textAlign: 'center',
//         },
//     }
// }
