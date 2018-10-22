/**
 *
 * 热更新检查更新
 *
 * @Author:JACK-GU
 * @Date:2018-10-22
 * @E-Mail:528489389@qq.com
 */
import codePush from "react-native-code-push";
import ToastAI from "../component/ToastAI";
import {
    Actions,
} from 'react-native-router-flux';

export default class CheckCodePushUpdateUtil {
    /**
     *
     * 开始检查更新
     *
     * @Author: JACK-GU
     * @Date: 2018-10-22 14:42
     * @E-Mail: 528489389@qq.com
     */
    static checkUpdate() {
        codePush.checkForUpdate(codePush.CheckFrequency.ON_APP_START)
            .then((update) => {
                if (update) {
                    //有更新，提示用户
                    Actions.messageDialogModal({
                        message: update.description, callBack: () => {
                            Actions.loading({message: "0%"});
                            codePush.disallowRestart();
                            //确定之后，开始下载
                            update.download(CheckCodePushUpdateUtil.down).then(instance => {
                                //下载完成了，调用这个方法
                                console.log("开始安装");
                                instance.install(codePush.InstallMode.IMMEDIATE).then(() => {
                                    console.log("安装完成");
                                    codePush.notifyAppReady();
                                    codePush.allowRestart();
                                    codePush.restartApp(true);
                                }).catch(reason => {
                                    Actions.tipMessage({
                                        message: '更新出错，请联系管理员！', callBack: () => {
                                        }
                                    });
                                });
                            }).catch((reason) => {
                                Actions.tipMessage({
                                    message: '更新出错，请联系管理员！', callBack: () => {
                                    }
                                });
                            });
                        }
                    });
                } else {
                }
            });
    }

    static down(downloadProgress) {
        let n = (downloadProgress.receivedBytes / downloadProgress.totalBytes) * 100;
        Actions.loading({refresh: {type: "refresh", message: n.toFixed(2) + "%"}});
    }
}
