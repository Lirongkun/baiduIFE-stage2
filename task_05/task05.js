
/*数据格式演示
var aqiSourceData = {
	"北京":{
		"2016-01-01":10,
		"2016-01-02":10,
		"2016-01-03":10,
		"2016-01-04":10,
	}
}
*/
//以下两个函数用于随机模拟生成测试数据
function getDateStr(dat){
	var y = dat.getFullYear();         //取得4位数的年份
	var m = dat.getMonth() + 1;	       //返回日期中的月份，其中0表示一月，11表示啊12月
	m = m < 10 ? "0" + m : m;
	var d = dat.getDate();             //返回日期中月份的天数（1到31）
	d = d < 10 ? "0" + d : d;
	return y + "-" + m + "-" + d;
}
function randomBuildData(seed){             //seed,种子
	var returnData = {};
	var dat = new Data("2016-01-01");
	var datstr = "";
	for(var i = 1; i < 92; i++){
		datStr = getDataStr(dat);
			
	}
}    
