
/*
 * aqiData,存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *		"北京"： 90,
 *		"上海"： 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var aqiInput = document.getElementById("aqi-value-input");
var aqi_table = document.getElementById("aqi-table");
var addBtn = document.getElementById("add-btn");

/*
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新的数据
 */
function getAqiData() {

	// 字符串中的trim()方法会创建一个字符串的副本，删除前置及后缀的所有空格,然后返回结果
	var city = cityInput.value.trim();
	var aqi = aqiInput.value.trim();

	/*
	  \u4E00-\u9FA5表示的是unicode中的中文字符的范围.match()方法用于在字符串中匹配模式，匹配到返回一个数组，匹配不到，返回null.
	  流控制语句中，null值会被自动执行为布尔型的false.取反后，为布尔型的true。return true,返回正确的处理结果
	*/

	if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
		alert("城市名必须为中英文字符!");
	}

	if (!aqi.match(/^\d+$/)) {
		alert("空气质量指数必须为整数!");
	}

	// js中方括号表示法，优点是可以接收一个变量名
	aqiData[city] = aqi;         
}

/*
 * 渲染aqi-table表格
 *
 */
function renderAqiTable() {
	var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";

	// for-in循环是一种精准的迭代语句，可以用来枚举对象的属性。for(var propName in object)每次执行循环时，都会将object对象中存在的一个属性名赋值给变量propName	
	for (var city in aqiData) {
		item += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button data-city='" + city + "'>删除</button></td></tr>";
	}

	// city的值存在，就把item的值赋给aqi_table.innerHTML,若不存在，就把空值赋给它
	aqi_table.innerHTML = city ? item : "";         
}

/*
 * 点击add-btn时的处理逻辑 
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandler() {
	getAqiData();
	renderAqiTable();
}

/*
 * 点击各个删除按钮时候的处理逻辑
 * 获取到哪个城市数据被删，删除数据，更新表格显示
 *
 */
function delBtnHandler(city) {

	// delete操作符，用以删除对象中的属性，并且需要重新渲染一下
	delete aqiData[city];                            
	renderAqiTable();      
}

var eventUtil = {

	addHandler: function (element, type, handler) {
		
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
 	},
 	getEvent: function (event) {
 		return event ? event : window.event;
 	},
 	getTarget: function (event) {
 		return event.target || event.srcElement;
 	}
};

// 给添加按钮添加点击事件,点击后触发addBtnHandler事件处理函数
eventUtil.addHandler(addBtn, "click", addBtnHandler);

// 给aqi-table中的所有删除按钮添加点击事件，点击后触发delBtnHandler事件处理函数.
aqi_table.onclick = function (event) {
	
	/* 
	 * 使用这个方法时,必须假设有一个事件对象传入到事件处理程序中，而且要把该变量传给这个方法
	 * 跨浏览器获取event对象,把这行代码放在事件处理程序的开头，可确保随时都能使用event对象，不必担心用户使用的是什么浏览器
	 */
	event = eventUtil.getEvent(event);

	// 获取事件的目标
	var target = eventUtil.getTarget(event);

	// h5规定可以为元素添加非标准的属性,但要添加前缀data-,这些属性可以任意添加和命名，添加后可以通过dataset属性来访问自定义属性的值，访问时属性不需加data-前缀
	delBtnHandler(target.dataset.city);
}

// 给cityInput元素添加keyup事件,当按下回车键时，下一个input表单获得焦点
cityInput.onkeyup = function (event) {

	if (event.keyCode === 13) {
		aqiInput.focus();
	}
}
