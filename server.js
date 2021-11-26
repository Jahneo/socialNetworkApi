const express = require ('express');
const mongoose = require ('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const { User } = require('./models');
app.use(express.json());
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-Network', {
  //useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
//mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));