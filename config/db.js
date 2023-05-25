const mongoose = require('mongoose');

const dbUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("connected", function () {
  console.log(`test 数据库已经连接...`);
});
