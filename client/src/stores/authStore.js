import { observable, action, computed } from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';

class AuthStore {
  @observable registerLoading = false;
  @observable registerErrors = {};
  @observable user = {};

  @action
  checkRegisterErrors() {
    const errors = Object.values(this.registerErrors);
    if (errors.length) {
      errors.forEach(message.error);
      this.registerErrors = {};
    }
  }

  @action
  registerUser = async data => {
    // reset
    this.registerLoading = true;
    this.registerErrors = false;
    this.user = {};
    try {
      this.user = (await axios.post('api/users/register', data)).data;
      this.registerLoading = false;
      message.success('You have successfully registered.');
    } catch (err) {
      this.registerErrors = err.response.data;
      this.registerLoading = false;
    }
  };
}

export default new AuthStore();
