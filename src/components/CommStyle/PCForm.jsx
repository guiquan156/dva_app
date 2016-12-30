import React from 'react';
import { DatePicker, Form, Input, Button } from 'antd';


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

function _PublicForm(props) {
	const { getFieldDecorator, validateFields } = props.form;
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

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">完成</Button>
        </FormItem>
      </Form>
    );
}
function handleSubmit(e, validateFields) {
    e.preventDefault();
    validateFields((err, values) => {
    	// console.log(values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
}

const PublicForm = Form.create()(_PublicForm);

export default PublicForm;