// JavaScript Document
//DOM2级事件处理程序，兼容浏览器差异性。接收三个参数：要处理的事件的名称，事件处理程序的函数,一个布尔值，其中false,表示在冒泡阶段调用事件处理程序。如果前两个方法无效，默认采用DOM0级事件处理程序
function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);	
	}else if(element.attachEvent){
		element.attachEvent("on" + type,handler);		
	}else{
		element["on" + type] = handler;	
	}
}

var container = document.getElementById("container");
var buttonList = document.getElementsByTagName("button");
//定义队列