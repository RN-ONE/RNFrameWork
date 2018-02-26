//
//  Utils.m
//  FrameWork
//
//  Created by 古智勇 on 2018/2/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "Utils.h"
/**
 用于完成一些JS需要的原生的参数的传递
 */
@implementation Utils
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(addEventIsDebug:(RCTResponseSenderBlock)callback)
{
  #ifdef DEBUG
    callback(@[@YES]);
  #else
    callback(@[@NO]);
  #endif
}
@end
