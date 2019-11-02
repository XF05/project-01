const express = require('express');
const userRouter = require('./routes/user.js');
let app = express();
const bodyParser = require('body-parser');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/user', userRouter);
app.listen(3000, () => {
    console.log('...................................')
    console.log('............请访问端口3000.............')
    console.log('....................................')
});