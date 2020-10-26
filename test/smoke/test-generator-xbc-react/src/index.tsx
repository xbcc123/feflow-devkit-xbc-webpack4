import React from 'react';
import ReactDOM from 'react-dom';
import stores from './stores/index';
import { configure } from 'mobx';
import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';

// 开启mobx严格模式
configure({ enforceActions: "observed" });

// locale={zhCN}
ReactDOM.render(
	<ConfigProvider locale={zhCN}>
  <Provider { ...stores }>
    <App />
  </Provider>
	</ConfigProvider>,
	document.getElementById('root')
);
