package com.framework.module;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.framework.util.AssetsJSBundleUtil;
import com.reactnativecomponent.swiperefreshlayout.BuildConfig;
import com.tencent.bugly.crashreport.CrashReport;

import org.json.JSONObject;

/**
 * @Author: JACK-GU
 * @Date: 2017-08-14
 * @E-Mail: 528489389@qq.com
 */
public class CatchJSModule extends ReactContextBaseJavaModule {
    private final static String NAME = "CatchJSModule";
    private Context context;

    public CatchJSModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void report(String catchStr) {
        try {
            if (context != null && !BuildConfig.DEBUG) {
                CrashReport.setUserId(catchStr);
                CrashReport.getAllUserDataKeys(context).clear();

                JSONObject jsonObject = new JSONObject(catchStr);

                CrashReport.putUserData(context, "name", jsonObject.getString("name"));
                CrashReport.putUserData(context, "message", jsonObject.getString("message"));
                CrashReport.putUserData(context, "stack", jsonObject.getString("stack"));

                //获取代码错误的行数
                String reason = jsonObject.getString("stack");
//                //获取行数
//                int lineNumber = -1;
//                //我们只需要前200个字符
//
//                String twoHStr = "";
//                if (reason.length() > 201) {
//                    twoHStr = reason.substring(0, 200);
//                } else {
//                    twoHStr = reason.substring(0, reason.length() - 1);
//                }
//
//                if (!twoHStr.isEmpty()) {
//                    String strs[] = twoHStr.split(":");
//                    try {
//                        lineNumber = Integer.parseInt(strs[1]);
//                    } catch (NumberFormatException e) {
//                        e.printStackTrace();
//                    }
//                }
//
//
//                //获取到了才进行
//                if (lineNumber >= 0) {
//                    String str = AssetsJSBundleUtil.get(context, lineNumber);
//
//                    if (!str.isEmpty()) {
//                        reason = str;
//                    }
//                }


                CrashReport.postCatchedException(new NullPointerException(reason));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
