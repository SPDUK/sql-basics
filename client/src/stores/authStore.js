import { observable, action, computed } from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthStore {
  // user state
  @observable user = {};

  @action
  registerUser = data => {
    console.log(data);
    axios.post('api/users/register', data).then(res => console.log(res));
  };
}

export default new AuthStore();
