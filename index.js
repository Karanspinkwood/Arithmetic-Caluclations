const express = require('express');
const app = express();
const arithmeticFunctions = require('./arithmeticFunctions');

app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const { operation, value_1, value_2 } = req.body;

  const num1 = Number(value_1);
  const num2 = Number(value_2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Invalid values');
  }

  let result;
  let operationText;
  switch (operation.toLowerCase()) {
    case 'add':
      result = arithmeticFunctions.add(num1, num2);
      operationText = 'Addition';
      break;
    case 'sub':
      result = arithmeticFunctions.sub(num1, num2);
      operationText = 'Subtraction';
      break;
    case 'mul':
      result = arithmeticFunctions.multiply(num1, num2);
      operationText = 'Multiplication';
      break;
    case 'div':
      result = arithmeticFunctions.divide(num1, num2);
      operationText = 'Division';
      break;
    default:
      return res.status(400).send('Invalid operation');
  }

  console.log(`\nOperation: ${operationText}\n`);
  console.log(`Value 1: ${num1}\n`);
  console.log(`Value 2: ${num2}\n`);
  console.log(`Result: ${result}\n`);

  res.send(`Operation: ${operationText}\n\nValue 1: ${num1}\n\nValue 2: ${num2}\n\nResult: ${result}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
