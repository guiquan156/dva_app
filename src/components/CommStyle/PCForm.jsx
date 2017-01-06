import React from 'react';
import {connect} from 'dva';
import { ColorPickerWrapped } from '../comm/colorPicker.jsx';
import myAlert from '../comm/myAlert.jsx';
import {
  DatePicker,
  Form,
  Input,
  Button,
  Switch,
  Upload,
  Icon,
  Modal
} from 'antd';


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

function _PCForm(props) {
	const { getFieldDecorator, validateFields, setFieldsValue } = props.form;
  const { pcFormState, dispatch } = props;

  const bgUpLoadSetting = {
    listType: "picture",
    action: "/api/upload/banner",
    accept: "image/*",
    onChange: bgOnChange,
    onRemove: bgOnRemove,
    fileList: pcFormState.bgPC
  };

  function bgOnChange(params){




    let fileList = params.fileList;
    fileList = fileList.slice(-1);
    fileList = fileList.map((file)=>{
      //上传成功，把url给file
      if( file.response && file.response.code == 200 ){
        file.url = file.response.result.url;
      }
      return file;
    });


    console.log(fileList);

    setFieldsValue({bgPC: fileList});
  }

  

  function bgOnRemove(){

  }


  return (
    <Form onSubmit={(e) => handleSubmit(e, validateFields)}>

      <FormItem {...formItemLayout} label="是否展示商品：">
        {getFieldDecorator('isShowListPC', {
          rules: [{ required: true, message: '' }],
        })(
          <Switch 
            defaultChecked={pcFormState.isShowListPC}
            checkedChildren="是"
            unCheckedChildren="否"
          />
        )}
      </FormItem>

      <FormItem {...formItemLayout} label="PC页面背景图">
        {getFieldDecorator('bgPC2', {
          getValueFromEvent: (...args) => console.log(args)
        })(
          <div>
            <Upload {...bgUpLoadSetting}>
              <Button type="ghost"><Icon type="upload" /> 上传</Button>
            </Upload>
          </div>
        )}
      </FormItem>



      <FormItem {...formItemLayout} label="PC页面背景图">
        {getFieldDecorator('bgPC2', {
          getValueFromEvent: (...args) => console.log(args)
        })(
          <div>
            <UploadWrapped />
          </div>
        )}
      </FormItem>

      <FormItem {...formItemLayout} label="背景颜色">
        {getFieldDecorator('bgColorPC', {
            rules: [
              { type: 'object', required: true, message: '请选择PC页面的背景颜色值！~' },
          ],
          })(
          <ColorPickerWrapped />
        )}
      </FormItem>



      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">保存</Button>
      </FormItem>

    </Form>
  );
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
      //  duration: 6,
      //  message: '错误',
      //  description: '亲，入口图只能上传一张哦！~',
      //  icon: <Icon type="close-circle" style={{color: 'rgb(240, 64, 50)'}}/>
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
        //  duration: 6,
        //  message: '错误',
        //  description: data.result,
        //  icon: <Icon type="close-circle" style={{color: 'rgb(240, 64, 50)'}}/>
        // });
        myAlert.err(data.result);
      }
    }
  }

  clickHdlr(){
    if(this.state.disable){
      // notification.open({
      //  duration: 6,
      //  message: '错误',
      //  description: '亲，入口图只能上传一张哦！~',
      //  icon: <Icon type="close-circle" style={{color: 'rgb(240, 64, 50)'}}/>,
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

//表单改变触发事件的处理函数
function onFieldsChange(props, fields) {
  const { dispatch } = props;
  //当表格修改，记录表格state
  const value = {};

  for(let k in fields) {
    if(fields[k].dirty || fields[k].validating) return; //如果是验证中的话 直接返回
    value[k] = fields[k].value;
  }
  console.log('field');

  dispatch({
    type: 'commStyle/updPcFormState',
    value: value,
  });
}

function handleSubmit(e, validateFields) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
}

function mapStateToProps({commStyle:{pcFormState}}) {
  return {
    pcFormState: pcFormState
  }
}

const PCForm = Form.create({onFieldsChange})(_PCForm);

export default connect(mapStateToProps)(PCForm);;