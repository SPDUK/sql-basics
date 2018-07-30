import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { inject, observer } from 'mobx-react';
import authStore from '../../stores/authStore'

@inject('authStore')
@observer
export default class Register extends Component {
  render() {
    console.log(this.props.authStore.user);
    const {authStore} = this.props;
    return (
      <div className="register">
      {this.props.authStore.user.id}
      {authStore.user.name}
      {authStore.user.email}
        <RegistrationForm />
      </div>
    );
  }
}
