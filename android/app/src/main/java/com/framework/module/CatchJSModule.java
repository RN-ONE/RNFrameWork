package com.framework.module;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
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
            if (context != null) {
                CrashReport.setUserId(catchStr);
                CrashReport.getAllUserDataKeys(context).clear();

                JSONObject jsonObject = new JSONObject(catchStr);

                CrashReport.putUserData(context, "name", jsonObject.getString("name"));
                CrashReport.putUserData(context, "message", jsonObject.getString("message"));
                CrashReport.putUserData(context, "stack", jsonObject.getString("stack"));
                CrashReport.postCatchedException(new NullPointerException(jsonObject.getString("stack")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
