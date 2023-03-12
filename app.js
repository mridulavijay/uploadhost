const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path=require('path')
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// default options
app.use(express.static(path.join(__dirname,'/build')));  
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.post('/api/file', function(req, res) {
   
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = path.join(__dirname + '/tmp/' + sampleFile.name);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
app.get('/*', function(req, res) {   res.sendFile(path.join(__dirname ,'/build/index.html')); }); 
app.listen(8000,()=>{
    console.log('Server is running')
})