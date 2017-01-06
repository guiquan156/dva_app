import React from 'react';
import { connect } from 'dva';
import { ColorPickerWrapped } from '../comm/colorPicker.jsx';
import myAlert from '../comm/myAlert.jsx';
import {
	DatePicker,
	Form,
	Input,
	Button,
	Icon,
	InputNumber,
	Popover,
	Select,
	Upload,
	Modal,
	Switch,
	notification
} from 'antd';

const Option = Select.Option;
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

//样式！
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

	//商品筛选下拉框
	const SelectBefore = getFieldDecorator(
			'listType', {
				rules: [{required: true, message: '请选择ID类型！~'}],
				initialValue: '0'
			}
		)(
			<Select style={{width: '80px'}}>
				<Option value="0">产品ID</Option>
				<Option value="1">供应商ID</Option>
				<Option value="2">aaaa</Option>
			</Select>
		);

    return (
		<div>
      <Form onSubmit={(e) => handleSubmit(e, validateFields, dispatch, pubFormState)}>

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

        <FormItem {...formItemLayout} label="按钮颜色">
	        {getFieldDecorator('btnColor', {
	            rules: [
	            	{ type: 'object', required: true, message: '请选择活动按钮的颜色值！~' },
	        	],
	          })(
	          <ColorPickerWrapped />
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
        	{getFieldDecorator('idList', {
	        	initialValue: 0
	          })(
	          <ProductInputWrapped addonBefore={SelectBefore} />
    		)}
        </FormItem>

		<FormItem {...formItemLayout} label="入口图上传">
			{getFieldDecorator('entryImg', {
				rules: [{type: "object", required: true, massage: "请上传入口图片！~"}]
			})(
				<UploadWrapped fileObj={pubFormState.entryImg}/>
			)}
		</FormItem>

		<FormItem {...formItemLayout} label="是否开启活动">
			{getFieldDecorator('isOpen', {
				rules: [{type: "boolean"}],
				initialValue: true
			})(
				<Switch 
					defaultChecked={pubFormState.isOpen}
					checkedChildren="是"
					unCheckedChildren="否"
				/>
			)}
		</FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>

		</div>
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
					content={<p><Icon type="info-circle" /> 数值越大排得越前，相同数值的情况下，最新生成的拍前面~</p>}
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
					content={<p><Icon type="info-circle" /> 多个数值请用‘|’分隔</p>}
					title="提示"
					placement="top"
					trigger="hover"
				>
					<div style={{width: '100%'}}>
						<Input addonBefore={this.props.addonBefore} onChange={(e)=>this.props.onChange(e.target.value)}/>
					</div>
				</Popover>
			</div>
		);

	}
}

class UploadWrapped extends React.Component {
	
	state = {
		disable: !!this.props.fileObj,
		previewvisible: false,
		previewImg: ''
	}

	render() {
		//入口图片上传插件配置
		const { disable, previewvisible, previewImg } = this.state;
		const upLoadSetting = {
			listType: "picture",
			action: "/api/upload/banner",
			accept: "image/*",
			beforeUpload: ()=>this.beforeUpload(),
			onChange: (params)=>this.onChange(params),
			onRemove: ()=>this.onRemove(),
			onPreview: (file)=>this.onPreview(file),
			disabled: disable
		};
		return (
			<div>
				<Upload {...upLoadSetting}>
					<Button type="ghost" onClick={()=>this.clickHdlr()}><Icon type="upload" /> 上传</Button>
				</Upload>
				<Modal visible={ previewvisible } footer={null} onCancel={()=>this.onClose()} width={830}>
					<img src={ previewImg } width="100%"/>
				</Modal>
			</div>
		);
	}

	beforeUpload(file, fileList){
		if(this.state.disable){
			// notification.open({
			// 	duration: 6,
			// 	message: '错误',
			// 	description: '亲，入口图只能上传一张哦！~',
			// 	icon: <Icon type="close-circle" style={{color: 'rgb(240, 64, 50)'}}/>
			// });
			myAlert.err('亲，入口图只能上传一张哦！~');
		}
	}

	onChange({file, fileList, event}){
		if(file.status == 'done' && fileList && fileList.length > 0){
			const data = file.response
			if(data.code == 200){
				this.setState({...this.state, disable: true});
				const fileState = {
					...file,
					thumbUrl: '',
					url: data.result.url
				}
				this.props.onChange(fileState);
			}else{
				//todo 错误的情况也会显示图片
				// notification.open({
				// 	duration: 6,
				// 	message: '错误',
				// 	description: data.result,
				// 	icon: <Icon type="close-circle" style={{color: 'rgb(240, 64, 50)'}}/>
				// });
				myAlert.err(data.result);
			}
		}
	}

	clickHdlr(){
		if(this.state.disable){
			// notification.open({
			// 	duration: 6,
			// 	message: '错误',
			// 	description: '亲，入口图只能上传一张哦！~',
			// 	icon: <Icon type="close-circle" style={{color: 'rgb(240, 64, 50)'}}/>,
			// });
			myAlert.err('亲，入口图只能上传一张哦！~');
		}
	}

	//移除已上传的方法
	onRemove(){
		this.setState({...this.state, disable: false});
		this.props.onChange();
	}

	//预览图片方法
	onPreview(file){
		this.setState({
			...this.state,
			previewvisible: true,
			previewImg: file.url || file.thumbUrl
		})
	}	

	onClose(){
		this.setState({
			...this.state,
			previewvisible: false
		})
	}
}


//可以做成保存按钮
function handleSubmit(e, validateFields, dispatch, pubFormState) {
    e.preventDefault();
    validateFields((err, values) => {
      // if (err) {
      //   // console.log('Received values of form: ', values);
      //   throw err;
      // }
      //todo 每一个专场都应该有一个对应的id 暂时写成0
      dispatch({type: 'commStyle/saveCommState', value: pubFormState});

    });
}

function onFieldsChange(props, fields) {
	const { dispatch } = props;
	//当表格修改，记录表格state
	const value = {};
	for(let k in fields) {
		if(fields[k].dirty || fields[k].validating) return; //如果是验证中的话 直接返回
		value[k] = fields[k].value;
	}

	dispatch({
		type: 'commStyle/updPubFormState',
		value: value,
	});
}

function mapStateToProps({commStyle:{pubFormState}}) {
	return {
		pubFormState: pubFormState
	}
}

const PublicForm = Form.create({onFieldsChange})(_PublicForm);

export default connect(mapStateToProps)(PublicForm);
