//
//  getInfoPlist.m
//  FrameWork
//
//  Created by 古智勇 on 2018/1/4.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "GetInfoPlist.h"

@implementation GetInfoPlist
+(NSString *)getKeyString:(NSString *)key{
    NSString *bundlePath = [[NSBundle mainBundle] pathForResource:@"Info" ofType:@"plist"];
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithContentsOfFile:bundlePath];
    NSString *value = [dict objectForKey:key];
    return value;
}
@end
