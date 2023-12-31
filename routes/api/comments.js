const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');
const likeController = require('../../controllers/likeController');
const tryCatch = require('../../utils/tryCatch');

router.route('/')
    .get(tryCatch(commentController.getComments))
    .post(tryCatch(commentController.createComment))

router.route('/:id')
    .get(tryCatch(commentController.getComment))
    .delete(tryCatch(commentController.deleteComment))

router.route('/replies')
    .post(tryCatch(commentController.createComment))

router.route('/replies/:id')
    .get(tryCatch(commentController.getCommentReplies))
    .delete(tryCatch(commentController.deleteComment))

router.route('/reply/likes')
    .post(tryCatch(likeController.createLike))

router.route('/reply/likes/:id')
    .get(tryCatch(commentController.getTotalLikes))
    .delete(tryCatch(likeController.deleteLike))

router.route('/comment/likes')
    .post(tryCatch(likeController.createLike))

router.route('/comment/likes/:id')
    .get(tryCatch(commentController.getTotalLikes))
    .delete(tryCatch(likeController.deleteLike))

router.route('/totalReplies/:id')
    .get(tryCatch(commentController.getTotalReplies))

module.exports = router;