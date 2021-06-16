var app = require('express')();

const Login = {
  app.post('/login', function(req, res) {
  res.redirect(307, '/test');
});
};

export default Login;
