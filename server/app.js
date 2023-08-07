const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chatRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Chat routes
app.use('/api/chat', chatRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
