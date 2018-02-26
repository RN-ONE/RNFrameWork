package com.framework.module;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.framework.BuildConfig;
import com.framework.MainActivity;

/**
 * @Author: JACK-GU
 * @Date: 2017-08-14
 * @E-Mail: 528489389@qq.com
 */
public class NativeUtilsModule extends ReactContextBaseJavaModule {
    private final static String NAME = "NativeUtilsModule";
    public NativeUtilsModule(ReactApplicationContext reactContext) {
        super(reactContext);
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
}
