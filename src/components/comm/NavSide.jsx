//侧边导航栏组件
import React from 'react';
import { Row, Col, Icon, Menu } from 'antd';
import { Link } from 'dva/router';

const SubMenu = Menu.SubMenu;

const menuStyle = {
	width: '220px',
	height: '100%',
	// position: 'fixed',
	// top: '60px',
	// left: '0px'
}

function NavSide() {
	return (
		<Menu
			mode="inline"
			style={menuStyle}
			theme="dark"
			defaultOpenKeys={['sub1']} >
			<SubMenu key="sub1" title={<span><Icon type="laptop" />布局风格</span>}>
				<Menu.Item key="1"><Link to="style/CommStyleStyle">经典风格</Link></Menu.Item>
				<Menu.Item key="2">Option 2</Menu.Item>
			</SubMenu>
			<SubMenu key="sub2" title={<span><Icon type="edit" />专场管理</span>}>
				<Menu.Item key="3"><Link to="admin/activityList">专场列表</Link></Menu.Item>
				<Menu.Item key="4">Option 4</Menu.Item>
			</SubMenu>
			<SubMenu key="sub3" title={<span><Icon type="calculator" />工具</span>}>
				<Menu.Item key="5"><Link to="tool/cdnTool">CDN刷图工具</Link></Menu.Item>
				<Menu.Item key="6">Option 6</Menu.Item>
			</SubMenu>
		</Menu>
	);
}

export default NavSide;