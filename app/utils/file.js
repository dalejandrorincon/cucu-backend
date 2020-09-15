// Packages
const AWS = require('aws-sdk')
const moment = require('moment-timezone')
const AmazonS3URI = require('amazon-s3-uri')
// config
const {
    BUCKET_NAME,
    IAM_USER_KEY,
    IAM_USER_SECRET
  } = process.env;
// Services
const { validateImage } = require('../validators/images')
// constants


exports.imageUpload = (req, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await imageLoad(req, req.files, folder)
      resolve(result)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

exports.deleteImage = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {key}= AmazonS3URI(req.body.location)
      let result = await deleteAWSBucketImage(key)
      res.status(200).send(JSON.parse(result))
      resolve(result)
    } catch (e) {
      console.log(e)
      res.status(400).send(e)
    }
  })
}

exports.deleteImageByKey=(location)=>{
  return new Promise(async (resolve, reject) => {
    try {
      let {key}= AmazonS3URI(location)
      let result = await deleteAWSBucketImage(key)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

exports.deleteManyImageByKey=(keyList)=>{
  return new Promise(async (resolve, reject) => {
    try {
      keyList.forEach(element => {
        let {key}= AmazonS3URI(element)
        let result = deleteAWSBucketImage(key)  
      });
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

const imageLoad = (req, files, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      files.forEach(async file => {
        try {
          await validateImage(file)
        } catch (error) {
          console.log(error)
          reject(error)
        }
      })
      let images = []
      for (let i = 0; i < files.length; i++) {
        try {
          let result = await saveAWSBucketImage(files[i], folder)
          images.push(result)
          if (i + 1 === files.length) {
            resolve(images)
          }
        } catch (error) {
          console.log(error)
          reject(error)
        }
      }
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

const saveAWSBucketImage = (file, folder) => {
  return new Promise((resolve, reject) => {
    let subname = `${folder}-${moment().format()}`
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    })
    s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        ACL:'public-read',
        Key: `${folder}/${subname}-${file.originalname}`,
        Body: file.buffer,
        //ContentType: 'image/jpeg',
      }
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback')
          console.log(err)
          reject(err)
        }
        resolve(JSON.stringify(data))
      })
    })
  })
}


const deleteAWSBucketImage = (key) => {
  return new Promise((resolve, reject) => {
    try {
      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
      })

      var params = {
        Bucket: BUCKET_NAME,
        Key: key
      }
      s3bucket.headObject(params, function (err, metadata) {
        if (err && err.code === 'NotFound') {//VALIDATE THAT THE FILE EXIST
          resolve(JSON.stringify(err))
        } else {
          s3bucket.createBucket(function () {//IF EXIST, DELETE IT
            s3bucket.deleteObject(params, function (err, data) {
              if (err) {
                console.log('error in callback')
                console.log(err)
                reject(err)
              } else {
                console.log({ resp: data })
                resolve(JSON.stringify(data))
              }
            })
    
          })
        }
      });
    } catch (e) {
      console.log(error)
      reject(error)
    }
  })
}
