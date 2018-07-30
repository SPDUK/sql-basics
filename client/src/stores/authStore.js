import { observable, action, computed } from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthStore {
  // user state
  @observable registerLoading = false;
  @observable registerErrors = {};
  @observable user = {};

  @action
  registerUser = async data => {
    this.registerLoading = true;
    this.user = {};
    try {
      this.user = await axios.post('api/users/register', data);
      this.registerLoading = false;
      console.log('done');
      console.log(this.user);
    } catch (err) {
      this.registerErrors = err.response.data;
      this.registerLoading = false;
    }
  };
}

export default new AuthStore();

// .then(user => (this.user = user.data))
// .then(() => {
//   setTimeout(() => {
//     this.registerLoading = false;
//   }, 400);
// })
