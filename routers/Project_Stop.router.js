// Generated by CoffeeScript 1.6.3
(function() {
  var exec, forever, refresh, throttler;

  throttler = require('../middleware.js').throttler;

  refresh = require('../procs.js').refresh;

  exec = require('child_process').exec;

  forever = require('forever');

  module.exports.apply = function(app) {
    return app.get('/project/:project/stop', throttler, function(req, res) {
      var child, project, session, stderr, stdout;
      project = req.project, session = req.session;
      if (project.proc == null) {
        return res.error({
          reason: "" + project.name + " 已经关闭",
          redirect: "/project/" + project.name
        }, req.session);
      }
      stdout = '';
      stderr = '';
      child = exec('forever stop --plain ' + project.file, function(err) {
        if (err != null) {
          err = err.message;
        }
        return res.render('project.jade', {
          err: err,
          stdout: stdout,
          stderr: stderr,
          project: project,
          session: session,
          redirect: true
        });
      });
      child.stdout.on('data', function(data) {
        return stdout += data;
      });
      return child.stderr.on('data', function(data) {
        return stderr += data;
      });
    });
  };

}).call(this);
