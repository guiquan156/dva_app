import React from 'react';
import {Upload, Button, Icon} from 'antd';


function ActivityList () {
	const upLoadSetting = {
      listType: "picture",
      action: "/api/upload/banner",
      accept: "image/*",
      // beforeUpload: ()=>this.beforeUpload(),
      // onChange: (params)=>this.onChange(params),
      // onRemove: ()=>this.onRemove(),
      // onPreview: (file)=>this.onPreview(file),
      // disabled: disable
    };
	return (
		<div>
			ActivityList


			<Upload {...upLoadSetting}>
              <Button type="ghost"><Icon type="upload" /> 上传</Button>
            </Upload>
		</div>
	)
}

export default ActivityList;