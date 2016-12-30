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
			<Card title="公共配置">
				<PublicForm/>
			</Card>
			<div className={style.waterFall}>
				<div className={style.pin}>
					<Card title="公共配置">
						<PublicForm/>
					</Card>
				</div>

				<div className={style.pin}>
					<Card title="公共配置1">
						<PCForm />
					</Card>
				</div>

				<div className={style.pin}>
					<Card title="公共配置2">
						<WapForm />
					</Card>
				</div>


				<div className={style.pin}>
					<Card title="公共配置3">
						<WapForm />
					</Card>
				</div>


				<div className={style.pin}>
					<Card title="公共配置4">
						<WapForm />
					</Card>
				</div>



				<div className={style.pin}>
					<Card title="公共配置5">
						<PCForm />
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

