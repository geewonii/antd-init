import React from 'react';
import ReactDOM from 'react-dom';
// import Login from 'ant-design-pro/lib/Login';
import Login from './component/Login';
import { Alert, Checkbox } from 'antd';
import styles from './index.css';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class App extends React.PureComponent {
  state = {
    type: 'account',
    autoLogin: true,
    submitting: false,
  }

  onTabChange = type => this.setState({ type })

  renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {...values,type}
      });
    }
  }

  render() {
    return (
      <div>
        <Login
          defaultActiveKey={this.state.type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="账户密码登录">
            {
              // login.status === 'error' &&
              // login.type === 'account' &&
              // !login.submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')
            }
            <UserName name="userName" placeholder="admin/user" />
            <Password name="password" placeholder="888888/123456" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {
              // login.status === 'error' &&
              // login.type === 'mobile' &&
              // !login.submitting &&
              this.renderMessage('验证码错误')
            }
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div>
          <Submit loading={this.state.submitting}>登录</Submit>
          <div className={styles.other}>
            <a style={{ float: 'right' }} href="">注册账户</a>
          </div>
        </Login>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
