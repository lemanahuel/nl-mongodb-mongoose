$('document').ready(function () {
  window.API_PATH = 'http://localhost:3000/';
  window.API_USERS = window.API_PATH + 'users';

  window.USERS_SRV = {
    list: function (params) {
      return $.ajax({
        url: window.API_USERS,
        method: 'get',
        data: params
      });
    }
  };
});