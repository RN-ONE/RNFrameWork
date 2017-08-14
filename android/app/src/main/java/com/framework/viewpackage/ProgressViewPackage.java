package com.framework.viewpackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.framework.module.ProgressViewManger;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by JACK-GU on 2016/12/6.
 */

public class ProgressViewPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();


    }

    //一般情况createJSModules（）的返回值都是空集合。
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();

    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new ProgressViewManger());
    }
}
