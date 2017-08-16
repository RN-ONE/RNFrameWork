package com.framework.module;

import android.graphics.Color;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.framework.MainActivity;

/**
 * @Author: JACK-GU
 * @Date: 2017-08-14
 * @E-Mail: 528489389@qq.com
 */
public class SetBarColorModule extends ReactContextBaseJavaModule {
    private final static String NAME = "BarColorModule";

    public SetBarColorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void setColor(final String color) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            UiThreadUtil.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    MainActivity.tintManager.setStatusBarTintColor(Color.parseColor(color));
                }
            });
        }
    }
}
