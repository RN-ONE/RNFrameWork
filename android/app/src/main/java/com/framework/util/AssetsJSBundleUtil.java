package com.framework.util;

import android.content.Context;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

/**
 * JS异常分析的
 * <p>
 * Created by JACK-GU on 2018/1/4.
 */

public class AssetsJSBundleUtil {
    //获取某一行的代码
    public static String get(Context context, int number) throws IOException {
        InputStream is = context.getAssets().open("index.android.bundle");
        InputStreamReader inputStreamReader = new InputStreamReader(is);
        LineNumberReader lineNumberReader = new LineNumberReader(inputStreamReader);
        String str = "";
        while (lineNumberReader.readLine() != null) {
            if (number == lineNumberReader.getLineNumber() + 1) {
                str = lineNumberReader.readLine();
                break;
            }
        }
        return str;
    }
}
