import { observable, action, computed } from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';

// message configuration
message.config({
  top: 100,
  duration: 4,
  maxCount: 3
});

class AuthStore {
  @observable registerLoading = false;
  @observable registerErrors = {};
  @observable user = {};
  @observable warningMessages = {};

  // if the errors objects has anything in it, show an error message and then clear errors
  @action
  checkRegisterErrors() {
    const errors = Object.values(this.warningMessages);
    if (errors.length) {
      errors.forEach(e => message.error(e));
      // clear the warnings so they don't persist
      this.warningMessages = {};
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
      message.success(
        `Welcome ${this.user.username} You have successfully registered.`
      );
    } catch (err) {
      this.registerErrors = err.response.data;
      this.warningMessages = err.response.data;
      this.registerLoading = false;
    }
  };

  @action
  checkLoginErrors() {
    const errors = Object.values(this.registerErrors);
    if (errors.length) {
      errors.forEach(e => message.error(e));
      this.registerErrors = {};
    }
  }
}

export default new AuthStore();
