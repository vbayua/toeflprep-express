require('dotenv')
const { BlobServiceClient, BlockBlobClient } = require('@azure/storage-blob');
const { MulterAzureStorage } = require('multer-azure-blob-storage');
const azureConfig = require('../config/azureConfig');
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
const containerName = 'toeflprep-audio';

exports.listBlobs = async (req, res, next) => {
  try {
    const blobs = blobServiceClient.getContainerClient(containerName).listBlobsFlat()
    const files = []
    for await (let blob of blobs) {
      files.push(blob.name)
    }
    await res.status(200).send({
      azureAccount: azureConfig.getStorageAccountName(),
      blobList: blobs,
      files: files

    })
  } catch (error) {
    res.status(500).send({
      message: error,
    })
  }
}

exports.getBlobInfo = async (req, res, next) => {
  const fileName = req.params.filename
  try {
    const blobs = blobServiceClient.getContainerClient(containerName).getBlobClient(fileName)
    const url = blobs.url
    console.log(blobs.url)
    const blobName = blobs._name
    await res.status(200).send({
      name: blobName,
      blobUrl: url,
      blobs
    })
  } catch (error) {
    res.status(500).send({
      message: error
    })
  }
}

exports.deleteBlob = async (req, res, next) => {
  const fileName = req.params.filename
  try {
    const blobs = blobServiceClient.getContainerClient(containerName).deleteBlob(fileName)
    await res.status(200).send({
      message: 'Deleted Blob'
    })
  } catch (error) {
    res.status(500).send({
      error
    })
  }
}