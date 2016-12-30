
import React from 'react';
import { Input } from 'antd';

class InputForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.dValue || ''
		};
	}

	render() {
		return (
			<div>
				<Input 
					onChange={(e)=>this.changeHdr(e)}
					value={this.state.value}
				/>
			</div>
		);
	}

	changeHdr(e) {
		const limitValue = this.props.limitValue;
		const iptValue = e.target.value;

		this.setState({
			value: limitValue && limitValue(iptValue)
		});
		this.props.onChange(this.state.value);
	}

	static propTypes = {
		limitValue: React.PropTypes.func,
		dValue: React.PropTypes.string
	}

} 

export default InputForm;

