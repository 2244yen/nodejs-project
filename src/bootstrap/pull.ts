// "use strict";

// import * as config from "../config/env.json";
// const Queue = require('bull');
// const REDIS_URL = config.REDIS_URL;

// const Redis = require('ioredis');
// const client = new Redis(REDIS_URL);
// const subscriber = new Redis(REDIS_URL);

// const opts = {
//   // redisOpts here will contain at least a property of connectionName which will identify the queue based on its name
//   createClient: function (type: String, redisOpts) {
//     switch (type) {
//       case 'client':
//         return client;
//       case 'subscriber':
//         return subscriber;
//       case 'bclient':
//         return new Redis(REDIS_URL, redisOpts);
//       default:
//         throw new Error('Unexpected connection type: ' + type);
//     }
//   }
// }

// const queueFoo = new Queue('foobar', opts);

// queueFoo.process(function (job, done) {

//   // job.data contains the custom data passed when the job was created
//   // job.id contains id of this job.

//   // transcode video asynchronously and report progress
//   job.progress(42);

//   // call done when finished
//   done();

//   // or give a error if error
//   done(new Error('error transcoding'));

//   // or pass it a result
//   done(null, { framerate: 29.5 /* etc... */ });

//   // If the job throws an unhandled exception it is also handled correctly
//   throw new Error('some unexpected error');
// });

// queueFoo.add({ video: 'http://example.com/video1.mov' });
