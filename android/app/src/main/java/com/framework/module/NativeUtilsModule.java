package com.framework.module;

import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.framework.BuildConfig;
import com.framework.MainActivity;
import com.framework.util.compress.CompressUtil;

/**
 * @Author: JACK-GU
 * @Date: 2017-08-14
 * @E-Mail: 528489389@qq.com
 */
public class NativeUtilsModule extends ReactContextBaseJavaModule {
    private final static String NAME = "NativeUtilsModule";
    private Context context;

    public NativeUtilsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void exit() {
        System.exit(0);
    }

    @ReactMethod
    public void isDebug(Callback callback) {
        callback.invoke(BuildConfig.DEBUG);
    }

    @ReactMethod
    public void compress(String path, boolean isDelete, final Callback callback) {
        CompressUtil.compress(path, context, isDelete, new CompressUtil.CallBack() {
            @Override
            public void callBack(boolean success, String path) {
                callback.invoke(success, path);
            }
        });
    }
}
