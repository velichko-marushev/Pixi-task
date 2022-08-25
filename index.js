const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));