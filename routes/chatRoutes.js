const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controller/chatController');
const router = express.Router();


// logged in user can access this route due to protect mw
router.route('/').post(protect,accessChat);
// get all chat of a user
router.route('/').get(protect,fetchChats);
// group creation
router.route('/group').post(protect,createGroupChat);
// rename group
router.route('/rename').put(protect,renameGroup);
// exit group
router.route("/groupremove").put(protect,removeFromGroup);
// add to grp
router.route('/groupadd').put(protect, addToGroup);

module.exports = router