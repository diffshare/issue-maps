require('dotenv').config();
var s3 = require('s3');
var client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECKET_KEY
    }
});

var params = {
    localDir: "dist/",
    deleteRemoved: true,
    s3Params: {
        Bucket: process.env.BUCKET,
        Prefix: process.env.PREFIX
    }
};

var uploader = client.uploadDir(params);
uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
});
uploader.on('progress', function(err) {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function(err) {
    console.log("done uploading");
});
