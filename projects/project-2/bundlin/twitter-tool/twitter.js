"use strict";

var OAuth = require('oauth');
var jf = require('jsonfile');
var cron = require('cron');

var file = '/home/deploy/users.json';

var twitter = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
);

var messages = [
    "we're excited to announce the launch of our beta! You can now log in and start creating bundles on bundlin.com",
    "we just launched our public beta! You’re amongst the first users with access to bundlin.com",
    "thanks for signing up on bundlin.com! We just launched the beta version and are looking forward to your feedback",
    "thanks for signing up! As a beta user, you can now create, discover and share great bundles on bundlin.com",
    "we need your help with our beta of Bundlin. You now have early access to bundlin.com, check it out!",
    "you can now check out the beta version of Bundlin! We’re looking forward to your amazing Bundles. bundlin.com",
    "I hope you haven’t forgot about us. We launched the public beta of Bundlin! Start Bundlin content on bundlin.com",
    "remember Bundlin? The beauty of the web, bundled. We just launched our public beta, check it out! bundlin.com",
    "it's been a while, we just launched our public beta! Looking forward to your feedback. bundlin.com",
    "thanks for waiting, like promised we just launched our beta and you're part of the first user group! bundlin.com"
];

var job = new cron.CronJob('0 */1 * * * *', function() {
    var users = jf.readFileSync(file);
    var user = users.shift();

    if (! user) {
        console.log('No more users, exiting');
        return process.exit(0);
    }

    jf.writeFileSync(file, users);

    var message = '@' + user + ' ' + messages[Math.floor(Math.random() * messages.length)];

    twitter.post(
        'https://api.twitter.com/1.1/statuses/update.json',
        process.env.TWITTER_ACCESS_TOKEN_KEY,
        process.env.TWITTER_ACCESS_TOKEN_SECRET,
        { 'status': message },
        function (error, data, response) {
            if (error) return console.log(error);

            console.log(message);
        }
    );
}, function(){}, false);

job.start();
