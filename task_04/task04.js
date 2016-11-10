
/**
 *aqiData,存储用户输入的空气指数数据
 *示例格式：
 *aqiData = {
 *		"北京"： 90,
 *		"上海"： 40
 *};
 */
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var aqiInput = document.getElementById("aqi-value-input");
var aqi_table = document.getElementById("aqi-table");
/**
 *从用户输入中获取数据，向aqiData中增加一条数据
 *然后渲染aqi-list列表，增加新的数据
 */
function getAqiData(){
	var city = cityInput.value.trim();
	var aqi = aqiInput.value.trim();
	//\u4E00-\u9FA5表示的是unicode中的中文字符的范围.match()方法用于在字符串中匹配模式，返回一个数组.
	if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
		alert("城市名必须为中英文字符!");
		return true;	
	}
	if(!aqi.match(/^\d+$/)){
		alert("空气质量指数必须为整数!");
		return true;	
	}
	aqiData[city] = aqi;             //这里为什么不能用.
}
/**
 *渲染aqi-table表格
 *
 */
function renderAqiTable(){
	var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	//for-in循环是一种精准的迭代语句，可以用来枚举对象的属性。for(var propName in window)每次执行循环时，都会将window对象中存在的一个属性名赋值给变量propName	
	for(var city in aqiData){
		item += "<tr><td>" + city +"</td><td>" + aqiData[city] + "</td><td><button data-city='" + city + "'>删除</button></td></tr>";
	}
	aqi_table.innerHTML = city ? item : "";         //city的值存在，就把item的值赋给aqi_table.innerHTML,若不存在，就把空值赋给它
}
/**
 * 点击add-btn时的处理逻辑 
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
 
function addBtnHandler(){
	getAqiData();
	renderAqiTable();
}
/**
 * 点击各个删除按钮时候的处理逻辑
 *获取到哪个城市数据被删，删除数据，更新表格显示
 *
 */
function delBtnHandler(city){
	//do something;
	delete aqiData[city];                            //delete运算符，只能删除对象中的属性
	renderAqiTable();       //需要重新渲染一下
}

function init(){
	//在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandler函数
	document.getElementById("add-btn").addEventListener("click",addBtnHandler);
	//想办法给aqi-table中的所有删除按钮绑定事件，点击时触发delBtnHabler函数
	aqi_table.addEventListener("click",function(event){
			if(event.target.nodeName.toLowerCase() === "button"){
				delBtnHandler.call(window,event.target.dataset.city);//html5规定可以为元素添加非标准的属性，但要添加前缀data-。可以通过元素的dataset属性来访问自定义属性的值	
			}
	},false);
}
init();