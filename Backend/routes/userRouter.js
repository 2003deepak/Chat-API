const express = require('express');
const router = express.Router();
const generateResponse  = require('../controllers/userController/generateResponse');
const chatSave = require('../controllers/userController/chatSave');
const getChat = require('../controllers/userController/getChat');


router.get('/generate/:question', generateResponse);


router.post('/saveChat', chatSave);


router.get("/getChat" , getChat)

module.exports = router;
