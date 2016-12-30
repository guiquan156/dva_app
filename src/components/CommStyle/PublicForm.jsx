import React from 'react';
import { DatePicker, Form, Input, Button, Icon, InputNumber, Popover, Select } from 'antd';
import { connect } from 'dva';
import { ColorPickerWrapped } from '../comm/colorPicker.jsx';

const formItemLayout = {
	labelCol: {span: 6},
	wrapperCol: {span: 14}
};

const tailFormItemLayout = {
	wrapperCol: {
		span: 14,
		offset: 6
	}
};

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

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


function _PublicForm(props) {
	const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = props.form;
	const { pubFormState, dispatch } = props;

    return (
      <Form onSubmit={(e) => handleSubmit(e, validateFields)}>

        <FormItem {...formItemLayout} label="专场名称：">
          {getFieldDecorator('actName', {
            rules: [{ required: true, message: '请填写你的专场名称！' }],
          })(
            <Input placeholder="专场名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="活动时间">
          {getFieldDecorator('selectTime', {
            rules: [
            	{ type: 'array', required: true, message: '请选择活动时间！~' }
        	],
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="开始时间">
          {getFieldDecorator('startTime', {
            rules: [
            	{ type: 'object', required: true, message: '请选择活动的开始时间！~' }
        	],
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="结束时间">
          {getFieldDecorator('endTime', {
            rules: [
            	{ type: 'object', required: true, message: '请选择活动的结束时间！~' }
        	],
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="按钮颜色">
	        {getFieldDecorator('btnColor', {
	            rules: [
	            	{ type: 'object', required: true, message: '请选择活动按钮的颜色值！~' }
	        	],
	          })(
	          <ColorPickerWrapped color="#ffffff" />
    		)}
        </FormItem>

        <FormItem {...formItemLayout} label="排序值">
        	{getFieldDecorator('rank', {
	            rules: [
	            	{ required: true, message: '请填写活动排序值！~' }
	        	],
	        	initialValue: 0
	          })(
	        	<InputNumberWrapped min={0}/>
    		)}
        </FormItem>

        <FormItem {...formItemLayout} label="商品筛选">
        	{getFieldDecorator('productList', {
	        	initialValue: 0
	          })(
	          <ProductInputWrapped />
    		)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
}

//包裹InputNumber 用无状态函数组件来写有毒。。
class InputNumberWrapped extends React.Component {
	render(){
		const {
			onChange,
			min: min=0,
			max: max=Infinity,
			step: step=1,
			Value: defaultValue=0
		} = this.props;

		return (
			<div>
				<Popover 
					content={<p><Icon type="info-circle" />数值越大排得越前，相同数值的情况下，最新生成的拍前面~</p>}
					title="提示"
					placement="right"
					trigger="hover"
				>
					<div style={{width: '80px'}}>
						<InputNumber min={min} max={max} step={step} defaultValue={defaultValue} onChange={(v)=>onChange(v)} />
					</div>
				
				</Popover>
			</div>
		);
	}
}

class ProductInputWrapped extends React.Component {
	render(){
		return (
			<div>
				<Popover 
					content={<p><Icon type="info-circle" />多个数值请用‘|’分隔</p>}
					title="提示"
					placement="topLeft"
					trigger="hover"
				>
					<div style={{width: '100%'}}>
						<Input onChange={(e)=>this.props.onChange(e.target.value)}/>
					</div>
				</Popover>
			</div>
		);

	}
}

// function ProductInputWrapped(props){
// 	console.log('func', props.onChange);
// 	return (
// 		<div>
// 			<Popover 
// 				content={<p><Icon type="info-circle" />多个数值请用‘|’分隔</p>}
// 				title="提示"
// 				placement="topLeft"
// 				trigger="hover"
// 			>
// 				<div style={{width: '100%'}}>
// 					<Input onChange={(e)=>props.onChange(e.target.value)}/>
// 				</div>
// 			</Popover>
// 		</div>
// 	);
// }


//可以做成保存按钮
function handleSubmit(e, validateFields) {
    e.preventDefault();
    validateFields((err, values) => {
    	// console.log(values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
}

function onFieldsChange(props, fields) {
	const { dispatch } = props;
	//当表格修改，记录表格state
	dispatch({
		type: 'commStyle/updPubFormState', 
		value: fields
	});
}

function mapStateToProps({commStyle:{pubFormState}}) {
	return {
		pubFormState: pubFormState
	}
}

const PublicForm = Form.create({onFieldsChange})(_PublicForm);

export default connect(mapStateToProps)(PublicForm);

