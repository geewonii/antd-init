import React from 'react';
import ReactDOM from 'react-dom';
// import Login from 'ant-design-pro/lib/Login';
import Login from './component/Login';
import { Alert, Checkbox } from 'antd';
import './index.css';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class App extends React.PureComponent {
  render() {
    return (
      <Login children={[]}/>
    )
  }
}

// class App extends React.PureComponent {
//   state = {
//     notice: '',
//     type: 'tab2',
//     autoLogin: true,
//   }
//   onSubmit = (err, values) => {
//     console.log('value collected ->', { ...values, autoLogin: this.state.autoLogin });
//     if (this.state.type === 'tab1') {
//       this.setState({
//         notice: '',
//       }, () => {
//         if (!err && (values.username !== 'admin' || values.password !== '888888')) {
//           setTimeout(() => {
//             this.setState({
//               notice: '账号或密码错误！',
//             });
//           }, 500);
//         }
//       });
//     }
//   }
//   onTabChange = (key) => {
//     this.setState({
//       type: key,
//     });
//   }
//   changeAutoLogin = (e) => {
//     this.setState({
//       autoLogin: e.target.checked,
//     });
//   }
//   render() {
//     return (
//       <Login
//         defaultActiveKey={this.state.type}
//         onTabChange={this.onTabChange}
//         onSubmit={this.onSubmit}
//       >
//         <Tab key="tab1" tab="手机号登录">
//           {
//             this.state.notice &&
//             <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
//           }
//           <UserName name="username" />
//           <Password name="password" />
//         </Tab>
//         <Tab key="tab2" tab="动态登录">
//           <Mobile name="mobile" />
//           <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" />
//         </Tab>
//         <div>
//           <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
//           <a style={{ float: 'right' }} href="">忘记密码</a>
//         </div>
//         <Submit>登录</Submit>
//         <div>
//           <a style={{ float: 'right' }} href="">注册账户</a>
//         </div>
//       </Login>
//     );
//   }
// }

ReactDOM.render(<App />, document.getElementById('root'));
