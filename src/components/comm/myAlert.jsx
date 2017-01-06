/**
 * 对notification进行封装，在事件的回调函数中使用
 */
import React from 'react';
import {
	notification,
	Icon
} from 'antd';


var myAlert = {
	err: function(msg){
		notification.open({
			duration: 6,
			message: '错误',
			description: msg,
			icon: <Icon type="close-circle" style={{color: 'rgb(240, 64, 50)'}}/>
		});
	},
	info: function(){},
	warn: function(){}
}

export default myAlert;
