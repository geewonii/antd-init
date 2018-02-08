import React from 'react';
import ReactDOM from 'react-dom';
require('isomorphic-fetch');
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox, message } from 'antd';
import './index.css';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class App extends React.PureComponent {
  state = {
    notice: '',
    type: 'tab2',
    autoLogin: true,
    captcha: false,
    mobile: '',
  }
  componentDidMount() {
    const {autoLogin} = this.state
    if(autoLogin) {
      const Mobiles = localStorage.getItem("phoneleeMobile")
    }
    fetch('./package.json')
    .then(response => {
        if (response.status >= 400) {
            message.error("服务器未响应")
            throw new Error("Bad response from server")
        }
        return response.json();
    })
    .then(stories => {
        console.log(stories);
    })
  }

  onTabChange = key => this.setState({type: key})

  updateMobile = e => this.setState({mobile: e.target.value})

  changeAutoLogin = e => this.setState({autoLogin: e.target.checked})

  getCaptcha = () => {
    if(this.state.mobile.match(/^1\d{10}$/)){
      this.setState({captcha: true})
    }
  }

  onSubmit = (err, values) => {
    console.log('value collected ->', { ...values, autoLogin: this.state.autoLogin });
    if (this.state.type === 'tab1') {
      this.setState({notice: ''}, () => {
        if (!err && (values.mobile !== '13632422291' || values.PassWord !== '1')) {
          this.setState({notice: '账号或密码错误！'});
        }
      });
    }
  }

  render() {
    return (
      <Login
        defaultActiveKey={this.state.type}
        onTabChange={this.onTabChange}
        onSubmit={this.onSubmit}
      >
        <Tab key="tab1" tab="密码登录">
          {
            this.state.notice &&
            <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
          }
          <Mobile name="mobile" onChange={this.updateMobile} />
          <Password name="PassWord" />
        </Tab>
        <Tab key="tab2" tab="手机登录">
          <Mobile name="Mobile" onChange={this.updateMobile} />
          <Captcha onGetCaptcha={ this.getCaptcha } name="captcha" />
          {
            this.state.captcha &&
            <Alert style={{ marginBottom: 24 }} message="已发送短信验证码，请注意查收" type="info" showIcon />
          }
        </Tab>
        <div>
          <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
          <a style={{ float: 'right' }} href="https://www.phonelee.com/God/ForgotPassword">忘记密码</a>
        </div>
        <Submit>登录</Submit>
        <div>
          <a style={{ float: 'right' }} href="https://www.phonelee.com/God/Create">注册账户</a>
        </div>
      </Login>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('newLogin'));
