const jwt = require('jwt-simple');
const moment = require('moment');
const nodemailer = require('nodemailer');

const {
  SECRET_TOKEN,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
  MAIL_SECURE,
  APP_NAME,
  APP_EMAIL
} = process.env;

const createToken = async (userId, time = 7, format = 'days') => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: moment()
      .add(time, format)
      .unix()
  };
  let token = await jwt.encode(payload, SECRET_TOKEN)
  await refreshTimeout(token)
  return token;
};

const redis = require('redis')
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST
})

const decodeToken = async token => {
  try {
    let checkTimeout = await checkTokenTimeout(token)
    console.log(checkTimeout)
    if (checkTimeout){
      throw new Error("INACTIVE_SESSION");
    }else{
      await refreshTimeout(token)
    }
    const payload = jwt.decode(token, SECRET_TOKEN);
    return payload.sub;
  } catch (err) {
      if(err.message=="INACTIVE_SESSION"){
        throw new Error("INACTIVE_SESSION");
      }else{
        throw new Error("TOKEN_EXPIRED");
      }
  }
};

const checkTokenTimeout = async (token) => {
  return new Promise(async (resolve, reject) => {

    redisClient.hget('session-timeouts', token, (err, reply) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      let current = moment.duration(moment().diff(reply))
      let diff = current.hours();
      if(diff>=2){
        resolve(true)
      }
      resolve(false);
    })
  })
}

const refreshTimeout = async (token) => {
  await redisClient.hset('session-timeouts', token, moment().format(), redis.print)
}


async function saveSocketClient(data, socket) {
  await redisClient.hset('clients', data, socket, redis.print)
}

async function deleteSocketClient(socket) {
  await redisClient.hdel('clients', + socket + "", redis.print)
}


const validateSocket = async (data) => {

  return new Promise(async (resolve, reject) => {

    redisClient.hget('clients', data, (err, reply) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(reply);
    })
  })
}

async function saveSession(user) {
  return new Promise(async (resolve, reject) => {
    try {
      let { id } = user
      console.log("session id", id)
      user = JSON.stringify(user)
      console.log(user)
      const save = await redisClient.hset('sessions', id, user, redis.print)
      resolve(save)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

async function deleteSession(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(userId)
      let result = await redisClient.hdel('sessions', +userId + "", redis.print)
      console.log("delete")
      console.log(result)
      resolve(result)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}


const validateSession = async (id) => {

  return new Promise(async (resolve, reject) => {
    let result = await redisClient.hget('sessions', id + "", (error, result) => {
      if (!result) {
        reject(false)
      } else {
        resolve(true)
      }
    });
    return result
  }).catch(() => {
    return ("INVALID_SESSION")
  })
}


async function saveAttempts(userid, fail_time, attempts) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = { fail_time, attempts }
      console.log(data)
      const save = await redisClient.hset('attempts', userid + "", JSON.stringify(data), redis.print)
      resolve(save)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

const getAttempts = async (id) => {

  return new Promise(async (resolve, reject) => {
    let result = await redisClient.hget('attempts', id + "", (error, result) => {
      if (!result) {
        reject(false)
      } else {
        resolve(JSON.parse(result))
      }
    });
    return result
  }).catch(() => {
    return (false)
  })
}

async function saveMailToken(userId, token, used) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = { token, used }
      //console.log(data)
      const save = await redisClient.hset('mailtoken', userId + "", JSON.stringify(data), redis.print)
      resolve(save)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}


const getMailToken = async (userId) => {

  return new Promise(async (resolve, reject) => {
    let result = await redisClient.hget('mailtoken', userId + "", (error, result) => {
      if (!result) {
        reject(false)
      } else {
        resolve(JSON.parse(result))
      }
    });
    return result
  }).catch(() => {
    return (false)
  })
}


const getEmailTransporter = () => {

  transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    //secure: MAIL_SECURE,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  });
  //console.log(transporter)
  return transporter;
};

const sendMail = data => {
  const transporter = getEmailTransporter();
  const { subject, html, to, text } = data;
  const options = {
    from: `${APP_NAME} <${APP_EMAIL}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    text: text ? text : APP_NAME,
    html
  };

  // send mail with defined transport object
  return transporter.sendMail(options);
};

const formatError = ({ msg }) => {
  return `${msg}`;
};

module.exports = {
  createToken,
  decodeToken,
  saveSession,
  deleteSession,
  validateSession,
  saveAttempts,
  getAttempts,
  saveMailToken,
  getMailToken,
  sendMail,
  formatError,
  saveSocketClient,
  deleteSocketClient,
  validateSocket
};
