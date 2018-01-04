//
//  CatchReport.m
//  FrameWork
//
//  Created by 古智勇 on 2018/1/4.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CatchReport.h"
#import <Bugly/BuglyConfig.h>
#import <Bugly/Bugly.h>
#import "GetInfoPlist.h"

@implementation CatchReport
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(addEvent:(NSString *)name message:(NSString *)message stack:(NSString *)stack)
{
  BuglyConfig * config = [[BuglyConfig alloc] init];
  // 设置自定义日志上报的级别，默认不上报自定义日志
  config.reportLogLevel = BuglyLogLevelWarn;
  [Bugly setUserValue:name forKey:@"name"];
  [Bugly setUserValue:message forKey:@"message"];
  [Bugly setUserValue:stack forKey:@"stack"];
  [Bugly startWithAppId:[GetInfoPlist getKeyString:@"BuglyAppID"] config:config];
  
  [Bugly reportException:[[NSException alloc] initWithName:@"JS" reason:stack userInfo:nil]];
}
@end
