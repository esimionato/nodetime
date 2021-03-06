/*
 * Copyright (c) 2012 Dmitri Melikyan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the 
 * "Software"), to deal in the Software without restriction, including 
 * without limitation the rights to use, copy, modify, merge, publish, 
 * distribute, sublicense, and/or sell copies of the Software, and to permit 
 * persons to whom the Software is furnished to do so, subject to the 
 * following conditions:
 * 
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN 
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR 
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


var cassandra = require('cassandra');

module.exports = function(cb) {
  var client = new cassandra.Client("usergraph1.clyqz.com:9160");
  var CL = cassandra.ConsistencyLevel;

  client.consistencyLevel({
    write: CL.ONE,
    read: CL.ONE
  });

  client.connect("TestKeySpace");
  var cf = client.getColumnFamily("TestColumnFamily");

  var data = cf.get("testkey", function(err, data) {
    if(err) {
      console.error(err);
      return cb(err);
    }
 
    console.log(data);
    cb();
  });
};

module.exports(function(err) {
  if(err) console.log(err, err.stack);
  console.log('done');
});
