const express =require("express");
const router = express.Router({mergeParams:true});// allow us to get access to the id inside of this router

const{createMessage,getMessage,deleteMessage} = require("../handlers/messages");

//prefix - /api/users/:id/messages   need id here so we use "mergeParams:true"
router.route("/").post(createMessage);

//prefix - /api/users/:id/messages/:message_id
router
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage);

module.exports= router;