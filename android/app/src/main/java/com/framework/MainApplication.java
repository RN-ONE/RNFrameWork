package com.framework;

import android.app.Application;

import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.framework.viewpackage.BarColorPackage;
import com.framework.viewpackage.BarHeightPackage;
import com.framework.viewpackage.CatchJSPackage;
import com.framework.viewpackage.NativeUtilPackage;
import com.framework.viewpackage.ProgressViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.tencent.bugly.crashreport.CrashReport;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static MainApplication instance;

    public static MainApplication getInstance() {
        return instance;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new VectorIconsPackage(),
                    new RCTSplashScreenPackage(),
                    new ProgressViewPackage(),
                    new BarHeightPackage(),
                    new BarColorPackage(),
                    new RCTSwipeRefreshLayoutPackage(),
                    new ReactNativeExceptionHandlerPackage(),
                    new CatchJSPackage(),
                    new ReactNativeRestartPackage(),
                    new ImagePickerPackage(),
                    new NativeUtilPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        SoLoader.init(this, /* native exopackage */ false);

        if (!BuildConfig.DEBUG){
            CrashReport.initCrashReport(getApplicationContext(), "5a9639836b", false);
        }
    }
}
