import React from 'react';
import { connect } from 'dva';

//UI组件
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';

import styles from './Users.less';

function Users ({dispatch, users}) {

  const {list, total, loading, current} = users;

  const userSearchProps = {};
  //模拟list数据
  const userListProps = {
    dataSource: list,
    total,
    loading,
    current,
    deleteUserHandler(id){
      dispatch({type: 'users/delUser', payload:{id: id}});
    }
  };

  const userModalProps = {};

  return (
    <div className={styles.normal}>
      {/* 用户筛选搜索框 */}
      <UserSearch {...userSearchProps} />
      {/* 用户信息展示列表 */}
      <UserList {...userListProps} />
      {/* 添加用户 & 修改用户弹出的浮层 */}
      <UserModal {...userModalProps} />
    </div>
  );
}

function mapSateToProps ({users}) { //state.users ---> module/users.js的spacename
  return {users};
}

export default connect(mapSateToProps)(Users);