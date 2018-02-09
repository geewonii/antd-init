import React from 'react';
import ReactDOM from 'react-dom';
// import Login from 'ant-design-pro/lib/Login';
import Login from './component/Login';
require('isomorphic-fetch');
import { Alert, Checkbox } from 'antd';
import styles from './index.css';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class App extends React.PureComponent {
  state = {
    status: '', //登录状态 success || error || other
    type: 'mobile',
    captcha: false,
    autoLogin: true,
    submitting: false,
  }

  onTabChange = type => this.setState({ status: '', type })

  renderMessage = (content, err) => <Alert style={{ marginBottom: 24 }} message={content} type={err || "error"} showIcon />

  getCaptcha = () => {
    const self = this;
    fetch('./package.json')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        self.setState({captcha: true})
        console.log(stories);
    });
  }

  changeAutoLogin = e => this.setState({autoLogin: e.target.checked})

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      fetch('./package.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          mobile: values.mobile,
          captcha: values.captcha
        })
      })
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(stories) {
          self.setState({captcha: true})
          console.log(stories);
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
              this.state.status === 'error' &&
              this.state.type === 'account' &&
              !this.state.submitting &&
              this.renderMessage('账号或密码错误')
            }
            <Mobile name="mobiles" />
            <Password name="password" placeholder="密码" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {
              this.state.status === 'error' &&
              this.state.type === 'mobile' &&
              !this.state.submitting &&
              this.renderMessage('验证码错误')
            }
            <Mobile name="mobile" />
            <Captcha name="captcha" onGetCaptcha={this.getCaptcha} />
            {
              this.state.captcha &&
              this.renderMessage('验证码已发送，请注意查收手机短信', 'info')
            }
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>记住账户</Checkbox>
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
