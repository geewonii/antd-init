import React from 'react';
import ReactDOM from 'react-dom';
import Login from './component/Login';
require('isomorphic-fetch');
import { Alert, Checkbox, message } from 'antd';
import styles from './index.css';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginComponent extends React.PureComponent {
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
    //短信接口api
    fetch('./package.json')
    .then(function(response) {
      if (response.status >= 400) message.error('请求未成功');
      return response.json();
    })
    .then(function(res) {
      self.setState({captcha: true})
      console.log(res);
    });
  }

  changeAutoLogin = e => this.setState({autoLogin: e.target.checked})

  handleSubmit = (err, values) => {
    if (!err) {
      /*
        * type: tab类型 | String
        * mobile:手机号 | String
        * captcha：验证码 | String
        * Password:密码 | String
      */
      const { type } = this.state
      const argument = { type }
      const tipFunc = (tips) => {
        message.error(tips)
        return false
      }
      const checkFunc = (argument) => {
        argument.type === 'mobile'
        ?
        (argument.mobile === undefined ? tipFunc('未填写手机号')
          :
          (!argument.mobile.match(/^1\d{10}$/) ? tipFunc('手机号不正确')
            :
            argument.captcha.length !== 4 ? tipFunc('验证码不正确') : fetchFunc(argument)
          )
        )
        :
        (argument.mobiles === undefined ? tipFunc('未填写手机号')
          :
          (!argument.mobile.match(/^1\d{10}$/) ? tipFunc('手机号不正确')
            :
            argument.Password.length <= 6 ? tipFunc() : fetchFunc(argument)
          )
        )
      }
      const fetchFunc = (argument) => {
        //提交表单api
        fetch('./package.json', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(argument)
        })
        .then(response => {
          if (response.status >= 400) message.error('请求未成功');
          return response.json();
        })
        .then(res => {
          self.setState({captcha: true})
          console.log(res);
        });
      }

      Object.keys(values).forEach(item => argument[item] = values[item])
      checkFunc(argument)
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
          <Tab key="account" tab="账号密码登录">
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
            <a style={{ float: 'right' }} href="https://www.phonelee.com/God/ForgotPassword">忘记密码</a>
          </div>
          <Submit loading={this.state.submitting}>登录</Submit>
          <div className={styles.other}>
            <a style={{ float: 'right' }} href="https://www.phonelee.com/God/Create">马上注册</a>
          </div>
        </Login>
      </div>
    )
  }
}

ReactDOM.render(<LoginComponent />, document.getElementById('LoginComponent'));
