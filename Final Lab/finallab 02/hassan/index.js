const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.set('view engine', 'ejs');

app.get('/calculator', (req, res) => {
  res.render('calculator', { results: req.session.results || [] });
});

app.post('/calculate', (req, res) => {
  const operand1 = parseFloat(req.body.operand1);
  const operand2 = parseFloat(req.body.operand2);
  const operation = req.body.operation;
  let result;

  switch (operation) {
    case '+':
      result = operand1 + operand2;
      break;
    case '-':
      result = operand1 - operand2;
      break;
    case '*':
      result = operand1 * operand2;
      break;
    case '/':
      result = operand2 !== 0 ? operand1 / operand2 : 'Infinity';
      break;
    default:
      result = 'Invalid operation';
  }

  if (!req.session.results) {
    req.session.results = [];
  }

  req.session.results.push({
    operand1: operand1,
    operation: operation,
    operand2: operand2,
    result: result
  });

  res.redirect('/calculator');
});

app.listen(port, () => {
  console.log("Server started on http://localhost:${port}");
});