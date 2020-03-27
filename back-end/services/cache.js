const mongoose = require('mongoose');
const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.quoteNumber || '');
    return this;
}

mongoose.Query.prototype.exec = async function() {
    // If current query does not use cache then execute normal .exec function
    if(!this.useCache) {
        return exec.apply(this, arguments);
    }

    // Do we have any cached data in redis related to this query
    const cachedValue = await client.get(this.hashKey);

    // if yes then response to the request right away and return
    if(cachedValue) {
        console.log('serving from Cache');
        const doc = JSON.parse(cachedValue);
        return doc;
    }
    
    const result = await exec.apply(this, arguments);
    client.set(this.hashKey, JSON.stringify(result));
    return result;
}

module.exports = {
    clearHash(hashKey) {
        console.log(hashKey);
        client.del(JSON.stringify(hashKey));
    }
}
