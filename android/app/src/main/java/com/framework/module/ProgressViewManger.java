package com.framework.module;

import android.graphics.Color;
import android.widget.ImageView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.framework.internal.ProgressDrawable;

/**
 * @Author: JACK-GU
 * @Date: 2017-08-10
 * @E-Mail: 528489389@qq.com
 */
public class ProgressViewManger extends SimpleViewManager<ImageView> {
    private final static String NAME = "AndroidProgressView";
    private ProgressDrawable progressDrawable;

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    protected ImageView createViewInstance(ThemedReactContext reactContext) {
        ImageView imageView = new ImageView(reactContext);
        progressDrawable = new ProgressDrawable();
        imageView.setImageDrawable(progressDrawable);
        progressDrawable.start();
        return imageView;
    }


    @ReactProp(name = "color")
    public void setColor(ImageView imageView, String color) {
        progressDrawable.setColor(Color.parseColor(color));
    }
}
