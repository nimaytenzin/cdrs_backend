const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
import Util from '../utils/Utils';

const util=new Util();

module.exports = {
  /** Koa middleware function to check cache before continuing to any endpoint handlers */
  async checkResponseCache (req,res, next) {
    console.log('checkResponseCache');
    const cachedResponse = await redis.get(req.originalUrl);
    if(cachedResponse){
      util.setSuccess(200,'Pests Retrieved from cache',JSON.parse(cachedResponse));
      util.send(res);
    }else{
      next();
    }
  },
  /** Koa middleware function to insert response into cache */
  async addResponseToCache (req,res, next) {
    // console.log(JSON.stringify(req.data));
    if(req.data){
      var tocache=req.data;
      await redis.set(req.originalUrl,JSON.stringify(req.data));
    }
  }
}
