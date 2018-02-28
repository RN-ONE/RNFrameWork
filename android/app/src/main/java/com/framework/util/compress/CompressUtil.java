package com.framework.util.compress;

import android.content.Context;
import android.graphics.Bitmap;
import android.support.annotation.NonNull;


import java.io.File;
import java.io.IOException;
import java.util.UUID;


/**
 * 图片压缩
 *
 * @Author:JACK-GU
 * @Date:2018/2/27 10:48
 * @E-Mail:528489389@qq.com
 */

public class CompressUtil {
    /**
     * 图片压缩，压缩完成后，图片会保存在同级目录中
     *
     * @param path            路径
     * @param isDeleteOldFile 是否删除原来的照片
     * @Author:JACK-GU
     * @Date:2018/2/27 10:52
     * @E-Mail:528489389@qq.com
     */
    public static void compress(@NonNull final String path, final Context context, final boolean
            isDeleteOldFile, final CallBack callBack) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                File file = new File(path);
                if (!file.exists()) {
                    callBack.callBack(false, null);
                } else {
                    //文件存在，开始压缩
                    //第一步，获取文件的根路径
                    try {
                        String directoryPath = path.substring(0, path.lastIndexOf(File.separator));
                        String newName = UUID.randomUUID().toString().replace("-", "") + ".jpg";
                        File compressedImage = new Compressor(context).setQuality(50)
                                .setCompressFormat(Bitmap.CompressFormat.JPEG)
                                .setDestinationDirectoryPath(directoryPath).compressToFile(file,
                                        newName);
                        //删除源文件
                        if (isDeleteOldFile && file != null && file.exists()) {
                            file.delete();
                        }

                        callBack.callBack(true, compressedImage.getAbsolutePath());
                    } catch (IOException e) {
                        callBack.callBack(false, null);
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }

    public interface CallBack {
        void callBack(boolean success, String path);
    }
}
