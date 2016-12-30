//应用主体
import React from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from 'dva/router';
import style from './index.less';
import NavSide from '../../components/comm/NavSide.jsx';

function AppWarp({ children }) {
	return (
		<div>
			<div className={style.bar}>
				<Row align="middle">
					<Col md={4}><div className={style.title}><Icon type="bars" /><Link to="/">ACTIVITY</Link></div></Col>
				</Row>
			</div>
			<NavSide/>
			<div className={style.contentWrap}>
				<Row>
					<Col md={22} offset={1}>
						{ children }
					</Col>
				</Row>
			</div>
			{/* todo 底部 */}
			<div className={style.footer}></div>
		</div>
	)
}


function AppWarp2({ children }) {
	return (
		<div>
			<div className={style.navSideWrap}>
				{/*用户信息处理*/}
				<div className={style.userInfo}>
					<img src={require('../../assets/avatar.jpg')} className={style.avtar}/>
					<p className={style.userName}>我是你爹地</p>
				</div>
				<NavSide/>
			</div>

			{/*可以抽离出来做一个UI组件*/}
			<nav className={style.navTop}>
				<div className={style.navCtn}>
					<p className={style.msg}><Icon type="message" /><span>这里可以改成tag</span></p>
					<p className={style.logout}><a href="javascript:;">退出</a></p>
				</div>
			</nav>

			<div className={style.contentWrap}>
				{ children }
			</div>
			{/* todo 底部 */}
			<div className={style.footer}></div>
		</div>
	)
}



export default AppWarp2;

