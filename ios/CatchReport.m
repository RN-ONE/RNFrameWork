//
//  CatchReport.m
//  FrameWork
//
//  Created by 古智勇 on 2018/1/4.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CatchReport.h"
#import "Bugly.framework"

@implementation CatchReport
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(addEvent:(NSString *)name message:(NSString *)message stack:(NSString *)stack)
{
  BuglyConfig * config = [[BuglyConfig alloc] init];
  // 设置自定义日志上报的级别，默认不上报自定义日志
  config.reportLogLevel = BuglyLogLevelWarn;
  [Bugly startWithAppId:@"66772cbede" config:config];
}
@end
