const Post = require('../models/Post-model');
const PostModel = require('../models/Post-model')
const TopicModel = require('../models/Topic-model')
const ImageModel = require('../models/Image-model')
const VideoModel = require('../models/Video-model');
const Topic = require('../models/Topic-model');

const mongodb = require('mongodb')

module.exports.editNote_post = function(req , res , next) {
    let t;
    let n;
    // find topic with topic query
    Topic.findById(req.query.topicid)
    .then(topic => {
        t = topic;
        topic.notes.forEach(note => {
            if (note._id.toString() ===(req.params.noteid)) {
                n = note;
            }
        })
        res.render('editnote' , {note:n , images:n.imageUrl , videos:n.videoUrl , topic:t})
    }).catch(err => console.log(err))
}
module.exports.updateNote_post = function(req , res , next) {
    let t;
    let n;
    Topic.findById(req.query.topicid)
    .then(topic => {
        t = topic;
        topic.notes.forEach(note => {
            if (note._id.toString() === req.params.noteid) {
                let imagesArray = [];
                let videosArray = [];

                if (req.body.imageUrl != null || req.body.imageUrl != undefined) {
                    if (!(req.body.imageUrl instanceof Array)) {
                        imagesArray[0] = req.body.imageUrl;
                    } else {
                        imagesArray = req.body.imageUrl
                    }
                }
                if (req.body.videoUrl != null || req.body.videoUrl != undefined) {
                    if (!(req.body.videoUrl instanceof Array)) {
                        videosArray[0] = req.body.videoUrl;
                    } else {
                        videosArray = req.body.videoUrl
                    }
                }

                
                note.title = req.body.title;
                note.description = req.body.description;
                note.imageUrl = imagesArray;
                note.videoUrl = videosArray;

                Topic.updateNote(topic._id , topic.notes)
                .then(() => {
                    res.redirect('/seenotes')
                })
            }
        })
    }).catch(err => console.log(err))
}
/*
module.exports.editNote_post = function(req,res,next) {
    let imagePromise; let videoPromise;
    let n;
    let topic;
    PostModel.findOne({where: {id:req.params.noteid}})
    .then(note => {
        let arr = [];
        imagePromise = note.getImages();
        return note;
    })
    .then((note) => {
        let arr = [];
        videoPromise = note.getVideos();
        return note;
    })
    .then((note) => {
        n = note;
        return Promise.all([
            imagePromise.then(imgs => {
                if (imgs instanceof Array) {
                     return imgs
                } else {
                    return [...imgs];
                }
            }),
            videoPromise.then(vids => {
                if (vids instanceof Array) {
                    return vids
                } else {
                    return [...vids];
                }
            })
        ])
    })
    .then(([imagesPromiseRes,videosPromiseRes]) => {
        TopicModel.findOne({where: {id:req.query.topicid}})
        .then(topic => {
            res.render('editnote' , {note:n , images:imagesPromiseRes , videos:videosPromiseRes , topic:topic})
        }).catch(err => {console.log(err)})
    })
    .catch(err => console.log(err))
}

module.exports.updateNote_post = function(req , res , next) {

    let n; // req.body have updated elemenets for this note
    PostModel.findOne({where:{id:req.params.noteid}})
    .then(note => {
        note.set({
            title:req.body.title,
            description:req.body.description,
        })
        note.save()
        return note;
    })
    .then(note => {
        n = note;
        if (req.body.imageUrl == undefined || req.body.imageUrl == null) {
            return n.setImages([])
        } else {
            return n.getImages({
                where:{
                    url:req.body.imageUrl
                }
            })
            .then(imgsAlredyInDb => { // already created images that we want to keep
                let imgsUrlsAlredyInDb = imgsAlredyInDb.map(img => img.url);
                if (req.body.imageUrl instanceof Array) {
                    return Promise.all(req.body.imageUrl.map(imgUrl => {
                        if (!(imgsUrlsAlredyInDb).includes(imgUrl)) {
                             return n.createImage({url:imgUrl})
                        }
                        return Promise.resolve("done")
                    })).catch(err => console.log(err))
                } else {
                    if (!(imgsUrlsAlredyInDb).includes(req.body.imageUrl)) {
                        return n.createImage({url:req.body.imageUrl})
                    }
                }
            })
            .then(() => {
                return n.getImages({
                    where:{
                        url:req.body.imageUrl
                    }
                })
            })
            .then(imgsToSet => {
               return n.setImages(imgsToSet)
            })
            .catch(err => console.log(err))
        }
    })
    .then(() => {
        if (req.body.videoUrl == undefined || req.body.videoUrl == null) {
            return n.setVideos([])
        } else {
            return n.getVideos({
                where:{
                    url:req.body.videoUrl
                }
            })
            .then(vidsAlredyInDb => { // already created images that we want to keep
                let vidsUrlsAlredyInDb = vidsAlredyInDb.map(vid => vid.url);
                if (req.body.videoUrl instanceof Array) {
                    return Promise.all(req.body.videoUrl.map(vidUrl => {
                        if (!(vidsUrlsAlredyInDb).includes(vidUrl)) {
                             return n.createVideo({url:vidUrl})
                        }
                        return Promise.resolve("done")
                    })).catch(err => console.log(err))
                } else {
                    if (!(vidsUrlsAlredyInDb).includes(req.body.videoUrl)) {
                        return n.createVideo({url:req.body.videoUrl})
                    }
                }

            })
            .then(() => {
                return n.getVideos({
                    where:{
                        url:req.body.videoUrl
                    }
                })
            })
            .then(vidsToSet => {
               return n.setVideos(vidsToSet)
            })
            .catch(err => console.log(err))
        }
    })
    .then(() => {
        ImageModel.destroy({where:{
            postId:null
        }})
    })
    .then(() => {
        VideoModel.destroy({where:{
            postId:null
        }})
    })
    .then(() => {
        res.redirect("/seenotes")  
    })
    .catch(err => console.log(err));

}
*/
module.exports.editTopic_post = function(req , res , next) {
    // TopicModel.findOne({where:{
    //     id:req.params.topicid
    // }})
    // .then((topic) => {
    //     res.render('edittopic' , {topic:topic})
    // })
    TopicModel.findById(req.params.topicid)
    .then(topicToEdit => {
        res.render('edittopic' , {topic:topicToEdit})
    })
}

module.exports.updateTopic_post = function(req , res , next) {
    // let t;
    // TopicModel.findOne({where: {
    //     id: req.params.topicid
    // }})
    // .then((topic) => {
    //     t = topic;
    //     return topic.set({
    //         title:req.body.title
    //     })
    // })
    // .then(() => {
    //     return t.save()
    // })
    // .then(() => {
    //     res.status(302).redirect(`/seenotes`)
    // })
    // .catch(err => console.log(err))
    Topic.updateById(req.params.topicid , req.body.title)
    .then(() => {
        res.status(302).redirect(`/seenotes`)
    })
}