const express = require('express');
const fileUpload = require('express-fileupload');
// const AWS = require("aws-sdk");
// const s3 = new AWS.S3()
const app = express();
const path=require('path')
const cors=require('cors');
//process.env.BUCKET= 'testbucketcyc';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// default options
app.use(express.static(path.join(__dirname,'/tmp')));  
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/tmp' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
// app.post('/api/file', async function(req, res) {
//   let filename = req.path.slice(1)
// console.log(filename)
//   try {
//     let s3File = await s3.putObject({
//       Bucket: process.env.BUCKET,
//       Key: filename,
//     }).promise()

//    // res.set('Content-type', s3File.ContentType)
//     //res.send(s3File.Body.toString()).end()
//   } catch (error) {
//     if (error.code === 'NoSuchKey') {
//       console.log(`No such key ${filename}`)
//       res.sendStatus(404).end()
//     } else {
//       console.log(error)
//       res.sendStatus(500).end()
//     }
//   }
 
// });
app.get('/*', function(req, res) {   res.sendFile(path.join(__dirname ,'/build/index.html')); }); 
app.listen(8000,()=>{
    console.log('Server is running')
})