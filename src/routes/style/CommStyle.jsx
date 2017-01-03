import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

//less
import style from './content.less';

//components
import PublicForm from '../../components/CommStyle/PublicForm.jsx';
import PCForm from '../../components/CommStyle/PCForm.jsx';
import WapForm from '../../components/CommStyle/WapForm.jsx';

function CommStyle ({dispatch, commStyle, children }) {
	const {pubFormState} = commStyle;

	// console.log(pubFormState);

	return (
		<div className={style.content}>
			<div className={style.waterFall}>
				<div className={style.pin}>
					<Card title="公共配置">
						<PublicForm/>
					</Card>
				</div>

				<div className={style.pin}>
					<Card title="PC页面制作">
						<PCForm />
					</Card>
				</div>

				<div className={style.pin}>
					<Card title="wap页面制作">
						<WapForm />
					</Card>
				</div>

			</div>
		</div>
	)
}

function mapStateToProps({commStyle}) {
	return {
		commStyle
	}
}

export default connect(mapStateToProps)(CommStyle);

