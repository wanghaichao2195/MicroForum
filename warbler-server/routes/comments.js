const express =require("express");
const router = express.Router({mergeParams:true});// allow us to get access to the id inside of this router

const{getComment,createComment,deleteComment} = require("../handlers/comments");

//   need id here so we use "mergeParams:true"
router.route("/").post(createComment);


router
    .route("/:comment_id")
    .get(getComment)
    .delete(deleteComment);

module.exports= router;