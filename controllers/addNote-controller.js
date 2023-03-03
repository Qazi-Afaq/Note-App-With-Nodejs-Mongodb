const { reset } = require('nodemon')
const TopicModel = require('../models/Topic-model')
module.exports.addNote_post = function (req,res,next) {
    // TopicModel.findOne({where: {id : req.params.topicid}})
    // .then(topic => {
    //     let post = topic.createPost({title:req.body.title , description:req.body.description})
    //     return post;
    // })
    // .then(post => {
    //     if (req.body.imageUrl == undefined || req.body.imageUrl == null) {
    //         return post;
    //     } else {
    //         if (req.body.imageUrl instanceof Array) {
    //             req.body.imageUrl.forEach(imgUrl => {
    //                 post.createImage({url:imgUrl})
    //             })
    //             return post;
    //         }
    //         post.createImage({url:req.body.imageUrl})
    //         return post;
    //     }
    // }).then((post) => {
    //     if (req.body.videoUrl == undefined || req.body.videoUrl == null) { 
    //         return post;
    //     } else {
    //         if (req.body.videoUrl instanceof Array) {
    //             req.body.videoUrl.forEach(vidUrl => {
    //                 post.createVideo({url:vidUrl})
    //             })
    //             return;
    //         }
    //         return post.createVideo({url:req.body.videoUrl}) 
    //     }
    // })
    // .then(() => {
    //     res.status(302).redirect(`/seenotes/${req.params.topicid}`)
    // })
    // .catch(err => console.log(err))
    TopicModel.addNote(req.body , req.params.topicid)
    .then(() => {
        res.redirect(`/seenotes/${req.params.topicid}`)
    })
}