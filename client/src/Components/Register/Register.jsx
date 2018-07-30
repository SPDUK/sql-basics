import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import RegistrationForm from './RegistrationForm/RegistrationForm';

import authStore from '../../stores/authStore';

@inject('authStore')
@observer
export default class Register extends Component {
  render() {
    console.log(this.props.authStore.user);
    // eslint-disable-next-line
    const { authStore } = this.props;
    return (
      <div className="register">
        <p>{authStore.user.id}</p>
        <p>{authStore.user.username}</p>
        <p>{authStore.user.email}</p>
        <DevTools />
        <RegistrationForm />
        <h1>{authStore.registerErrors.username}</h1>
        <h1>{authStore.registerErrors.email}</h1>
        <h1>{authStore.registerErrors.userexists}</h1>
      </div>
    );
  }
}
