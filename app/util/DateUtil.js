/**
 * @Author:JACK-GU
 * @Date:2018/1/10
 * @E-Mail:528489389@qq.com
 * @Describe:
 *
 * 日期转换的工具类
 */

export default class DateUtil {
    /**
     * 获取时间和日期 1999-10-24 04:12:35
     * @param timeStamp 时间戳
     * @Author: JACK-GU
     * @Date: 2018/2/28 15:56
     * @E-Mail: 528489389@qq.com
     */
    static getDateAndTime(timeStamp) {
        let date = new Date(timeStamp);
        let sDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " "
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
            .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
        return sDate;
    }

    /**
     * 获取日期 1999-10-24
     * @Author: JACK-GU
     * @Date: 2018/2/28 15:55
     * @E-Mail: 528489389@qq.com
     * @param timeStamp 时间戳
     */
    static getDate(timeStamp) {
        let date = new Date(timeStamp);
        let sDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
            .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
        return sDate;
    }


    /**
     *  获取时间  04:12:35
     * @Author: JACK-GU
     * @Date: 2018/2/28 15:55
     * @E-Mail: 528489389@qq.com
     * @param timeStamp 时间戳
     */
    static getTime(timeStamp) {
        let date = new Date(timeStamp);
        let sDate = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
            .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
        return sDate;
    }


    /**
     * 获取当前的时间和日期 1999-10-24 04:12:35
     * @Author: JACK-GU
     * @Date: 2018/2/28 15:54
     * @E-Mail: 528489389@qq.com
     */
    static getNowDateAndTime() {
        let date = new Date();

        return DateUtil.getDateAndTime(Date.parse(date));
    }


    /**
     *  获取当前的日期 1999-10-24
     * @Author: JACK-GU
     * @Date: 2018/2/28 15:54
     * @E-Mail: 528489389@qq.com
     */
    static getNowDate() {
        let date = new Date();
        return DateUtil.getDate(Date.parse(date));
    }


    /**
     * 获取当前的时间  04:12:35
     * @Author: JACK-GU
     * @Date: 2018/2/28 15:54
     * @E-Mail: 528489389@qq.com
     */
    static getNowTime() {
        let date = new Date();
        return DateUtil.getTime(Date.parse(date));
    }


    /**
     * 获取当前的时间戳
     * @Author: JACK-GU
     * @Date: 2018/2/28 15:53
     * @E-Mail: 528489389@qq.com
     */
    static getNowTimeStamp() {
        return Number(new Date);
    }

    /**
     * 获取指定的时间戳
     * @Author: JACK-GU
     * @Date: 2018/2/28 15:53
     * @E-Mail: 528489389@qq.com
     *  @param date 1999-10-24 04:12:35/1999-10-24/04:12:35
     */
    static getTimeStamp(date) {
        return Date.parse(new Date(date));
    }
}
