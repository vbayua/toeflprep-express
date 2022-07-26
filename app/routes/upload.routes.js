const
  express = require('express')
  , router = express.Router()

  , multer = require('multer')
  , inMemoryStorage = multer.memoryStorage()
  , uploadStrategy = multer({ storage: inMemoryStorage }).single('audiofile')

  , { BlockBlobClient } = require('@azure/storage-blob')
  , getStream = require('into-stream')
  , containerName = 'toeflprep-audio'
  ;

const getBlobName = originalName => {
  const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};

const removeSpaces = str => str.replace(/\s/g, '');

router.post('/api/azureBlob/upload', multer({ storage: multer.memoryStorage() }).single('audiofile'), (req, res) => {
  const
    blobName = removeSpaces(req.file.originalname)
    , blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, containerName, blobName)
    , stream = getStream(req.file.buffer)
    , streamLength = req.file.buffer.length
    ;

  blobService.uploadStream(stream, streamLength)
    .then(
      () => {
        res.status(200).send({
          message: 'File Uploaded To Blob Storage!'
        })
      }
    ).catch(
      (err) => {
        if (err) {
          res.status(500).send({
            message: err
          })
          return;
        }
      })
});

module.exports = router;