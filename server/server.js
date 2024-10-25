const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const apiUserForAdmin = require('./api/api_user_for_admin');
// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173"]
};
app.use(cors(corsOptions));

// Security headers
app.use(helmet());

// Logging
app.use(morgan('dev'));

// Body parsing
app.use(bodyParser.json());

// Routes
app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "orange", "banana"] });
});
app.use("/api/side_menu", require("./api/api_side_menu"));
app.use("/api/user_for_admin", apiUserForAdmin);
app.use("/api/Table_Temp", require("./api/api_Table_Temp"));
// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server listening
const PORT = process.env.PORT || 2030;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
