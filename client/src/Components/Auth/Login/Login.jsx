import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import LoginForm from './LoginForm/LoginForm';

import authStore from '../../../stores/authStore';

@inject('authStore')
@observer
export default class Login extends Component {
  render() {
    console.log(this.props.authStore.user);
    // eslint-disable-next-line
    const { authStore } = this.props;
    return (
      <div className="register">
        <LoginForm />
      </div>
    );
  }
}
