/**
 * @Author:JACK-GU
 * @Date:2018/1/4
 * @E-Mail:528489389@qq.com
 * @Describe:
 *  通过行号和列号获取源代码 ,直接右击，点RUN就可以了
 *
 */
/**
 * Created by cxmyDev on 2017/10/31.
 */
var sourceMap = require('source-map');
var fs = require('fs');

fs.readFile('../../ios-release.bundle.map', 'utf8', function (err, data) {
    var smc = new sourceMap.SourceMapConsumer(data);

    console.log(smc.originalPositionFor({
        line: 510,
        column: 1747
    }));
});