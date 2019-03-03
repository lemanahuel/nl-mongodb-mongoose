$('document').ready(function () {
  window.API_PATH = 'http://localhost:3000/';
  window.API_TASKS = window.API_PATH + 'tasks';

  window.TASKS_SRV = {
    create: function (params) {
      return $.ajax({
        url: window.API_TASKS,
        method: 'post',
        data: params.task
      });
    },
    list: function (params) {
      return $.ajax({
        url: window.API_TASKS,
        method: 'get',
        data: params
      });
    },
    get: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId,
        method: 'get',
        data: params
      });
    },
    update: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId,
        method: 'put',
        data: params
      });
    },
    delete: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId,
        method: 'delete'
      });
    },
    complete: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId + '/complete',
        method: 'put',
        data: params
      });
    },
    updateTitle: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/' + params.taskId + '/title',
        method: 'put',
        data: params
      });
    },
    stats: function (params) {
      return $.ajax({
        url: window.API_TASKS + '/stats',
        method: 'get',
        data: params
      });
    }
  };
});