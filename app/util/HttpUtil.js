/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 网络请求的工具类
 */
import {Axios, CancelToken} from 'axios';
import SHA1 from 'jssha';
import ToastAI from "../component/ToastAI";
import * as Const from "../config/Const";

const TIMEOUT = 60 * 1000;
const responseType = "json";

//自定分块下载文件一次的大小
const FILE_SIZE = 1024 * 1000;
/**
 * 添加对应的状态码和消息就可以了，0比较特殊，表示网络没连接
 * */
const CodeMessages = [
    {code: 400, message: "错误请求"},
    {code: 401, message: "未授权"},
    {code: 403, message: "禁止访问"},
    {code: 404, message: "未找到的请求"},
    {code: 408, message: "请求超时，请检查网络"},
    {code: 500, message: "服务器内部错误"},
    {code: 0, message: "网络错误"}
];

var cancel;

export default class HttpUtil {
    static BASE = "http://101.207.135.239:31483";
    static BASE_URL = HttpUtil.BASE + "/controller/";
    static instance = new Axios({
        baseURL: HttpUtil.BASE_URL,
        timeout: TIMEOUT,
        responseType: responseType,
        headers: {'Accept': 'application/json'}
    });


    /**
     * get请求
     * @param params 请求的参数
     * @param url 请求地址
     * @param callBack 回调，{success: true, response: response}
     * */
    static connectGet(params, url, callBack) {
        HttpUtil.connectHttp(params, url, "get", callBack, null, null);
    }

    /**
     * post
     * @param params 请求的参数
     * @param url 请求地址
     * param callBack 回调,{success: true, response: response}
     * */
    static connectPost(params, url, callBack) {
        HttpUtil.connectHttp(params, url, "post", callBack, null, null);
    }

    /**
     * @param params 请求的参数
     * @param url 请求地址
     * @param method 请求的方式，post，get
     * @param onUploadProgress 上传进度，一般不用传null
     * @param onDownloadProgress 下载进度，一般不用传null
     * param callBack 回调,{success: true, response: response}
     * */
    static connectHttp(params, url, method, callBack, onUploadProgress, onDownloadProgress) {
        params.network = 0;
        params.timestamp = Date.parse(new Date());
        params.timeZone = "Asia/Shanghai";
        params.userLocaleId = "zh_CN";
        if (global.userInfo) {
            params.userId = global.userInfo.userId;
            params.userName = global.userInfo.userName;
        }


        let postData = JSON.stringify(params);
        let map = {};
        map = {
            "actionName": params.actionName,
            "postData": postData,
            "limit": params.limit ? params.limit : 15,
            "start": params.start ? params.start : 1
        };


        console.log({map});
        HttpUtil.instance.request({
            url: url,
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            }),
            method: method,
            params: map,
            onUploadProgress: onUploadProgress,
            onDownloadProgress: onDownloadProgress,
        }).then(function (response) {
            console.log({response});
            //请求的结果
            if (callBack) {
                if (response.status == 200) {
                    if (response.data.errorcode) {
                        //框架的错误，直接提示
                        ToastAI.showShortBottom(response.data.error);
                    } else {
                        //框架判断,登录的特殊处理
                        if (map.actionName === 'sys-user-login') {
                            callBack({success: true, response: response.data});
                        } else {
                            if (response.data.code === Const.CODE.success) {
                                callBack({success: true, response: response.data});
                            } else {
                                HttpUtil.showMessage(response.data.codeDesc);
                                callBack({success: false, response: response.data});
                            }
                        }
                    }
                } else {
                    callBack({success: false, response: response});
                    HttpUtil.showMessage(response.status);
                }
            }
        }).catch(function (error) {
            console.log({error});
            if (callBack) {
                callBack({success: false, response: error});
            }
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                HttpUtil.showMessage(error.response.status);
            } else {
                //显示错误消息
                HttpUtil.showMessage(0);
            }
        });
    }

    /**
     * 取消当前请求的方法方法
     * */
    cancel() {
        cancel();
    }

    static showMessage(code) {
        for (let i = 0; i < CodeMessages.length; i++) {
            if (CodeMessages[i].code === code) {
                ToastAI.showShortBottom(CodeMessages[i].message);
                break;
            }
        }
    }

    /**
     * @Author: JACK-GU
     * @Date: ${DATE}
     * @E-Mail: 528489389@qq.com
     * @Describe: 上传文件到服务器
     * @param map 是一个数组，里面存放对象{path:"",key:""}
     * @param params 参数
     * @param url 请求的地址
     */
    static uploadFilePost(url, map, params, callBack) {
        // 创建一个formData（虚拟表单）
        var formData = new FormData();
        map.forEach((item) => {
            formData = HttpUtil.appendToFormData(formData, item.path, item.key);
        });

        // 请求头文件
        const config = {
            Accept: 'Application/json',
            'Content-Type': 'multipart/form-data',
            params: params ? params : {},
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent);
            },
        };

        HttpUtil.uploadFile(url, formData, config, callBack);
    }


    /**
     *
     * 上传文件到服务器,文件是一个数组
     *
     * @param map 是一个数组，里面存放对象{path:["",""],key:""}
     * @param params 参数
     * @param url 请求的地址
     * @param callBack 回调
     *
     * @Author: JACK-GU
     * @Date: 2018/3/21 11:01
     * @E-Mail: 528489389@qq.com
     */
    static uploadFileArrayPost(url, map, params, callBack) {
        // 创建一个formData（虚拟表单）
        var formData = new FormData();
        map.forEach((item) => {
            formData = HttpUtil.appendToFormData(formData, item.path, item.key);
        });

        // 请求头文件
        const config = {
            Accept: 'Application/json',
            'Content-Type': 'multipart/form-data',
            params: params ? params : {},
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent);
            },
        };

        HttpUtil.uploadFile(url, formData, config, callBack);
    }


    /**
     *
     * 上传文件
     * @param url 地址
     * @param formData 传文件的虚拟表单
     * @param config 配置
     * @param callBack 回调
     *
     * @Author: JACK-GU
     * @Date: 2018/3/21 10:55
     * @E-Mail: 528489389@qq.com
     */
    static uploadFile(url, formData, config, callBack) {
        //然后开始上传
        HttpUtil.instance.post(url, formData, config)
            .then(function (response) {
                console.log({response});
                //请求的结果
                if (callBack) {
                    if (response.status == 200) {
                        if (response.data.errorcode) {
                            //框架的错误，直接提示
                            ToastAI.showShortBottom(response.data.error);
                        } else {
                            //框架判断,登录的特殊处理
                            if (map.actionName === 'sys-user-login') {
                                callBack({success: true, response: response.data});
                            } else {
                                if (response.data.code === Const.CODE.success) {
                                    callBack({success: true, response: response.data});
                                } else {
                                    HttpUtil.showMessage(response.data.codeDesc);
                                    callBack({success: false, response: response.data});
                                }
                            }
                        }
                    } else {
                        callBack({success: false, response: response});
                        HttpUtil.showMessage(response.status);
                    }
                }
            }).catch(function (error) {
            console.log({error});
            if (callBack) {
                callBack({success: false, response: error});
            }
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                HttpUtil.showMessage(error.response.status);
            } else {
                //显示错误消息
                HttpUtil.showMessage(0);
            }
        });
    }


    /**
     * @Author: JACK-GU
     * @Date: ${DATE}
     * @E-Mail: 528489389@qq.com
     * @Describe: 将文件拼接成formData
     * @param formData 需要的
     * @param fileUri 文件的路径
     * @param key 关键字
     * @return formData 返回拼接后的
     */
    static appendToFormData(formData, fileUri, key) {
        // 需要上传的文件
        var strS = fileUri.split("/");
        const file = {uri: fileUri, type: 'multipart/form-data', name: strS[strS.length - 1]};   // 这里的key(uri和type和name)不能改变,
        formData.append(key, file);   // 这里的files就是后台需要的key
    }

    /**
     *
     * 放入一个数组
     * @param formData 需要的
     * @param fileUriS 文件的路径的数组
     * @param key 关键字
     * @return formData 返回拼接后的
     *
     * @Author: JACK-GU
     * @Date: 2018/3/21 10:50
     * @E-Mail: 528489389@qq.com
     */
    static appendArrayToFromData(formData, fileUriS, key) {
        let dataS = [];
        for (let fileUri of fileUriS) {
            var strS = fileUri.split("/");
            const file = {uri: fileUri, type: 'multipart/form-data', name: strS[strS.length - 1]};   // 这里的key(uri和type和name)不能改变,
            dataS.push(file);
        }

        formData.append(key, dataS);
    }


    /**
     * @Author: JACK-GU
     * @Date: ${DATE}
     * @E-Mail: 528489389@qq.com
     * @Describe: 暂时不可以用
     */
    static downloadFile(url) {
        HttpUtil.getFileLength(url, (length) => {
            if (length > 0) {
                //长度大于0才可以进行继续操作
                HttpUtil.downLoadFileRange(url);
                let fromBytes = 0;
                let toBytes = 0;

                HttpUtil.downLoadFileRange(url, fromBytes, toBytes, length, (success, e) => {
                    console.log({e, success});
                });
            } else {
                console.log("获取文件失败！");
            }
        })
    }


    static downLoadFileRange(url, fromBytes, toBytes, length, callBack) {
        if (FILE_SIZE > length) {
            if (length <= 0) {
                return;
            }
            toBytes = fromBytes + length - 1;
        } else {
            toBytes = fromBytes + FILE_SIZE - 1;
        }

        let range = "Bytes=" + fromBytes + "-" + toBytes;
        console.log({range});
        let instance = new Axios({
            timeout: TIMEOUT,
            responseType: "arraybuffer",
            headers: {'Range': range}
        });

        instance.request({
            url: url,
            method: "GET",
            onUploadProgress: (e) => {
                console.log({e});
            },
            onDownloadProgress: (e) => {
                if (callBack) {
                    callBack(true, {loaded: e.loaded, total: e.total});
                }
            },
        }).then(function (response) {
            if (response.status == 200) {
                //计算from
                length -= FILE_SIZE;
                fromBytes += FILE_SIZE;

                HttpUtil.downLoadFileRange(url, fromBytes, toBytes, length, callBack);
                if (callBack) {
                    callBack(true);
                }
            } else {
                if (callBack) {
                    callBack(false);
                }
            }
        }).catch(function (error) {
            if (callBack) {
                callBack(false);
            }
        });
    }

    /**
     * @Author: JACK-GU
     * @Date: ${DATE}
     * @E-Mail: 528489389@qq.com
     * @Describe:  获取文件的长度
     */
    static getFileLength(url, callBack) {
        //第一步，获取文件的长度
        let instance = new Axios({
            timeout: TIMEOUT,
            headers: {'X-Custom-Header': 'foobar'}
        });

        instance.request({
            url: url,
            method: "HEAD",
            onUploadProgress: (e) => {
                console.log({e});
            },
            onDownloadProgress: (e) => {
                console.log({e});
            },
        }).then(function (response) {
            if (response.status == 200) {
                let str = JSON.stringify(response);
                str = str.replace("content-length", "contentLength");
                let json = JSON.parse(str);
                if (callBack) {
                    callBack(json.headers.contentLength);
                }
            } else {
                if (callBack) {
                    callBack(-1);
                }
            }
        }).catch(function (error) {
            if (callBack) {
                callBack(-1);
            }
        });
    }

    /**
     *
     * 获取加密过后的密码
     *
     * @Author: JACK-GU
     * @Date: 2018/3/6 15:05
     * @E-Mail: 528489389@qq.com
     */
    static getEncryptedPassword(userPwd) {
        var psw1 = HttpUtil.SHA1(userPwd);
        var pswHash = HttpUtil.SHA1(psw1 + "sMarT cLOud dEveLoPmEnT plAtForM");
        return pswHash;
    }

    static SHA1(input) {
        var hash = new SHA1('SHA-1', 'TEXT');
        hash.update(input);
        return hash.getHash('HEX');
    }

}