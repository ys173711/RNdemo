package com.demorn.rn;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AppModule extends ReactContextBaseJavaModule {
    private static final String TAG = "AppModule";

    public AppModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        // 返回原生模块注册时的名称; 因为js层要想调用原生模块, 需要知道这个名称;
        return "AppModule";
    }

    // 打开相册
    @ReactMethod
    public void openAlbum() {
        // 这里写打开相册的代码
        // 这里属于原生开发内容
    }
  
}
