import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
// import IndexPage from './routes/IndexPage';
// import Users from './routes/Users';

import Home from './routes/Home.jsx';
import AppWrap from './routes/AppWrap'; 
import CommStyleStyle from './routes/style/CommStyle.jsx';
import CommStyleEdit from './routes/style/CommStyleEdit.jsx';
import ActivityList from './routes/admin/ActivityList.jsx';
import CdnTool from './routes/tool/CdnTool.jsx';


//todo 路由做成异步加载
export default function({ history }) {
  return (
    <Router history={history}>
    	<Route path="/" component={AppWrap}>
    		<IndexRoute component={Home} />

    		<Route path="style">
	    		<Route path="CommStyleStyle" component={CommStyleStyle} />
    			<Route path="CommStyleStyleEdit" component={CommStyleEdit} />
    		</Route>

    		<Route path="admin">
    			<Route path="activityList" component={ActivityList} />
    		</Route>

    		<Route path="tool">
    			<Route path="cdnTool" component={CdnTool} />
    		</Route>
    	</Route>
    </Router>
  );
};
