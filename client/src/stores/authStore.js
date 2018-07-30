import { observable, action, computed } from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthStore {
  // user state
  @observable user = {};

  @action
  registerUser = data => {
    axios.post('api/users/register', data).then(user => this.user = user.data);
    console.log(this.user);
  };
}

export default new AuthStore();
