const express = require('express');
const fileUpload = require('express-fileupload');
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
const app = express();
const path=require('path')
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// default options
app.use(express.static(path.join(__dirname,'/build')));  
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

app.post('/api/file', async function(req, res) {
  let filename = req.path.slice(1)
console.log(filename)
  try {
    let s3File = await s3.getObject({
      Bucket: process.env.BUCKET,
      Key: filename,
    }).promise()

    res.set('Content-type', s3File.ContentType)
    res.send(s3File.Body.toString()).end()
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      console.log(`No such key ${filename}`)
      res.sendStatus(404).end()
    } else {
      console.log(error)
      res.sendStatus(500).end()
    }
  }
 
});
app.get('/*', function(req, res) {   res.sendFile(path.join(__dirname ,'/build/index.html')); }); 
app.listen(8000,()=>{
    console.log('Server is running')
})