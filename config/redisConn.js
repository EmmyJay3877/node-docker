const Redis = require('redis');
const redisClient = Redis.createClient({
    url: process.env.REDIS_URL
})

redisClient.on('connect', () => {
    console.log("Client connected to redis")
});

redisClient.on('ready', () => {
    console.log("Client connected to redis, and ready to use.")
});

redisClient.on('error', (err) => {
    console.log(err.message)
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectRedis;

