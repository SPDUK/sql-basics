import { observable, action, computed } from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthStore {
  // user state
  @observable registerLoading = false;
  @observable registerErrors = {};
  @observable user = {};

  @action
  registerUser = data => {
    this.registerLoading = true;
    axios.post('api/users/register', data).then(user => this.user = user.data).then(() => {
      setTimeout(() => {
        this.registerLoading = false
      }, 400);
      }).catch( err => {
        this.registerErrors = err.response.data
        console.log(this.registerErrors);
        this.registerLoading = false;
      })
  };
}

export default new AuthStore();
