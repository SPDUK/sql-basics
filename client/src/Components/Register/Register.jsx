import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm/RegistrationForm';

import './register.css';

export default class Register extends Component {
  render() {
    return (
      <div className="register">
        <RegistrationForm />
      </div>
    );
  }
}
