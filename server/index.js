const Koa = require('koa');
const serverPort = require('./config').serverPort;
const app = new Koa();

//router
const Router = require('koa-router');

//koa-cors
const cors = require('koa2-cors');

//父路由
const router = new Router();

app.use(cors({
    origin: function (ctx) {
        if (ctx.url) {
            return "*";
        }
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 3600,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))

//koa-body:该中间件用于post请求的数据
const koaBody = require('koa-body')
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}))
// app.use(koaBody())

//引入数据库操作方法
const Controller = require('./controller.js')

//引入上传图片操作方法
const { UploadFile } = require('./UploadFile.js')

//获取所有植物信息
const allPlantRouter = new Router();
allPlantRouter.get('/plant', Controller.GetAllPlant);
//添加植物
const addPlantRouter = new Router();
addPlantRouter.post('/addplant', Controller.AddPlant);
//删除植物信息
const delPlantRouter = new Router();
delPlantRouter.post('/delplant', Controller.DelPlant);

//获取所有用户信息
const allUserRouter = new Router();
allUserRouter.get('/user', Controller.FindAllUser);

//添加用户
const addUserRouter = new Router();
addUserRouter.post('/adduser', Controller.AddUser);

//删除用户
const delUserRouter = new Router();
delUserRouter.post('/deluser', Controller.DelUser);

//登录
const loginRouter = new Router();
loginRouter.post('/login', Controller.Login);

//上传图片
const uploadRouter = new Router();
uploadRouter.post('/uploadFile', UploadFile);

router.use('/api',allPlantRouter.routes(),allPlantRouter.allowedMethods());
router.use('/api',addPlantRouter.routes(),addPlantRouter.allowedMethods());
router.use('/api',delPlantRouter.routes(),delPlantRouter.allowedMethods());
router.use('/api',allUserRouter.routes(),allUserRouter.allowedMethods());
router.use('/api',addUserRouter.routes(),addUserRouter.allowedMethods());
router.use('/api',delUserRouter.routes(),delUserRouter.allowedMethods());
router.use('/api',loginRouter.routes(),loginRouter.allowedMethods());
router.use('/api',uploadRouter.routes(),uploadRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(serverPort, () => {
    console.log('The server is running at http://localhost:' + serverPort);
});