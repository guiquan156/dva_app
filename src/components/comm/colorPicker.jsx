/**
 * color picker base on react-color & rc-trigger
 */

import Trigger from 'rc-trigger';
import { SketchPicker as _ColorPicker} from 'react-color';
import React from 'react';
import { SketchPicker } from 'react-color';
import { Icon } from 'antd';

import 'rc-trigger/assets/index.css';


class ColorPicker extends React.Component {

	constructor(props) {
		super(props);
		this.onChangeComplete.bind(this);
		this.state = {
			color: props.color || '#fff'
		}
	}

	getPicker(){
		return (
			<div>
				<SketchPicker
					color={this.state.color}
					onChangeComplete={(color, event)=>this.onChangeComplete(color, event)}
				/>
			</div>
		);
	}

	render(){
		const styles = {
			pickBtn: {
				border: '1px solid #999',
			    display: 'inline-block',
			    padding: '2px',
			    borderRadius: '2px',
			    WebkitUserSelect: 'none',
			    MozUserSelect: 'none',
			    MsUserSelect: 'none',
			    userSelect: 'none',
			    width: '20px',
			    height: '20px',
			    cursor: 'pointer',
			    boxShadow: '0 0 0 2px #fff inset',
			}
		}
		styles.pickBtn.backgroundColor = this.state.color;

		const {
			popupAlign = {
		    	points: ['tl', 'bl'],
		    	offset: [0, 3]
		    }, popupStyle
		} = this.props;

		return (
			<div>
		        <Trigger
				    action={['click']}
				    popup={this.getPicker()}
				    popupAlign={popupAlign}
				    zIndex={100}
				    popupStyle={popupStyle}
				  >
				  	<div style={styles.pickBtn}></div>
				  </Trigger>
			</div>
		);

	}

	onChangeComplete(color, event) {
		this.setState({
			color: color.hex
		});
		this.props.onChangeComplete(color, event);
	}

}

//包装一层 让<FormItem>可以get到参数
class ColorPickerWrapped extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onChangeComplete(color, event){
		this.setState({
			color: color
		});
		this.props.onChange(color);//触发这个 事件 向FormItem传递参数
	}

	render(){
		const styles = {
			colorWrap: {
				marginTop: '5px'
			},
			colorPicker: {
				display: 'inline-block',

				verticalAlign: 'top'
			},
			colorInfo: {
				display: 'inline-block',
				lineHeight: '24px',
				marginLeft: '10px',
				verticalAlign: 'top'
			},
			colorTips: {
				marginTop: '-10px'
			}
		}

		const { color } = this.state;

		return(
			<div style={styles.colorWrap}>
	        	<div style={styles.colorPicker}>
			        <ColorPicker
			        	onChangeComplete={(color, event)=>this.onChangeComplete(color, event)}
			        />
		        </div>
	    		<span style={styles.colorInfo}>{color && this.state.color.hex}</span>
	    		<p style={styles.colorTips}><Icon type="info-circle" /> 注意：目前不支持透明度~</p>
    		</div>
		);
	}
}


export { ColorPicker, ColorPickerWrapped };
