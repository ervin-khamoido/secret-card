const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const keys = require('./keys/index');

const app = express();

app.use(express.json({extended: true}));


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/create', require('./routes/createCard.routes'));
app.use('/api/history', require('./routes/historyCard.routes'));
app.use('/api/search', require('./routes/findCard.routes'));

if (process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.join(__dirname, 'client', 'build')));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || keys.PORT || 5000;

async function start() {
   try {
      //  || config.get('mongoURI')
      await mongoose.connect(process.env.MONGODB_URI || keys.MONGODB_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      });

      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
   } catch (error) {
      console.log('Server error: ', error.message);
      process.exit(1);
   }
}
start();