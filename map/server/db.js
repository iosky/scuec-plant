const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/scuec-plant');

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('数据库连接出错！');
});
db.on('open', function(){
    console.log('数据库连接成功！');
});

//声明schema
const plantSchema = mongoose.Schema({
    name: String,
    eName: String,
    pos: Object,
    lng: String,
    lat: String,
    allReviser: Array,
    lastReviser: String,
    family: String,
    genus: String,
    img: Array,
    sharp: String,
    distribution: String,
    value: String
});

//声明schema
const userSchema = mongoose.Schema({
    userName: String,
    passWord: String,
    date: String
});

//根据schema生成model
const model = {
    Plant: mongoose.model('Plant', plantSchema),
    User: mongoose.model('User', userSchema)
};

module.exports = model