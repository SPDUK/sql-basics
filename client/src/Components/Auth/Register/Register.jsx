import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import RegistrationForm from './RegistrationForm/RegistrationForm';

// import authStore from '../../../stores/authStore';

@inject('authStore')
@observer
export default class Register extends Component {
  render() {
    console.log(this.props.authStore.user);
    // eslint-disable-next-line
    const { authStore } = this.props;
    return (
      <div className="register">
        <RegistrationForm />
      </div>
    );
  }
}
