$('document').ready(function () {
  var tasks = [];
  var $list = $('#tasks-list');

  function get(el) {
    var _id = $(el).parents('.list-group-item').attr('id').trim();
    return tasks.find(function (item) {
      return item._id === _id;
    });
  }

  function onSubmitTitle(e) {
    var task = get(e.currentTarget);
    window.TASKS_SRV.updateTitle({
      taskId: task._id,
      title: task.$el.find('input').val()
    }).then(function (res) {
      task.$el = renderTask(res).$el;
      $('#' + task._id).replaceWith(task.$el);
    });
  }

  function onClickStatus(e) {
    var task = get(e.currentTarget);
    window.TASKS_SRV.complete({
      taskId: task._id
    }).then(function (res) {
      task.$el = renderTask(res).$el;
      $('#' + task._id).replaceWith(task.$el);
      updateStats();
    });
  }

  function onClickRemove(e) {
    var task = get(e.currentTarget);
    window.TASKS_SRV.delete({
      taskId: task._id
    }).then(function (res) {
      task.$el.remove();
      tasks = tasks.filter(function (item) {
        return item._id !== res._id;
      });
      updateStats();
    });
  }

  function renderTask(task) {
    task.$el = _.template(document.getElementById('task-tpl').innerHTML)({
      task: task
    });
    task.$el = $(task.$el);
    task.$el.find('input.form-control').on('keypress', function (e) {
      if (e && e.which == 13) {
        e.preventDefault();
        onSubmitTitle(e);
      }
    });
    task.$el.find('button.btn-task-status').on('click', onClickStatus);
    task.$el.find('button.btn-task-remove').on('click', onClickRemove);

    return task;
  }

  function renderTasks(items) {
    items = items.map(renderTask);
    $list.empty().append(items.map(function (item) {
      return item.$el;
    }));
    return items;
  }

  function listTasks() {
    window.TASKS_SRV.list({}).then(function (items) {
      tasks = renderTasks(items);
      updateStats();
    });
  }

  listTasks();

  $('#form-new-task').on('submit', function (e) {
    e.preventDefault();
    window.TASKS_SRV.create({
      task: {
        title: $('#new-task').val()
      }
    }).then(function (task) {
      task = renderTask(task);
      tasks.push(task);
      $list.prepend(task.$el);
      updateStats();
    });
  });

  function updateStats() {
    var stats = {};
    if (tasks && tasks.length) {
      stats.amount = tasks.length;
      stats.completed = tasks.filter(function (item) {
        return item.completed;
      }).length;
      stats.incompleted = tasks.filter(function (item) {
        return !item.completed;
      }).length;
    } else {
      window.TASKS_SRV.stats().then(function (res) {
        stats.amount = res.amount;
        stats.completed = res.completed;
        stats.incompleted = res.incompleted;
      });
    }
    $('#tasks-amount').text(stats.amount);
    $('#tasks-amount-completed').text(stats.completed);
    $('#tasks-amount-incompleted').text(stats.incompleted);
  }
});