const User = require("../models/User-model")
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const TopicModel = require("../models/Topic-model");
module.exports.seeNotes_get = function (req ,res , next) {
    res.render('notes')
}

module.exports.seeNotes_post = function (req ,res , next) {
    // req.user.getTopics({where:{
    //     userId:1,
    //     title: {
    //         [Op.substring]: "%" + req.body.title + "%"
    //     }
    // }})
    // .then(topics => {
    //     res.send(topics)
    // })
    TopicModel.fetchLike(req.body.title)
    .then(topics => {
        res.send(topics)
    })
}

/*
module.exports.seeNotes_getId = function (req ,res , next) {
    
    let n , topics;
    req.user.getTopics({where: {
        id: req.params.topicid
    }})
    .then(tops => {
        if (tops.length == 0) {
            res.render('topicnotes' , {topic:null , notes:[]})
            return Promise.reject("This topic does not exist")        
        }
        topics = tops;
        return topics[0]
    })
    .then((topic) => {
        return topic.getPosts()
    })
    .then(notes => {
        if (notes.length == 0) {
            res.render('topicnotes' , {topic:topics[0] , notes:[]})
            return Promise.reject("No Posots found for " + topics[0])
        }
        n = notes;
    })
    .then(() => {
        return Promise.all(n.map(note => {
           return note.getImages()
           .then(imgs => {
            // note.setDataValue("images" , imgs)
            note.imagesfromposts = imgs;
            return note.getVideos()
            .then(vids => {
                // note.setDataValue("videos" , vids)
                note.videosfromposts = vids;
            })
           }).catch(err => console.log(err))
        }))
    })
    .then(() => {
        n.forEach(note => {
            note.setDataValue("description" , note.description.replace(/(?:\r\n|\r|\n)/g, '<br>'))
        })
    })
    .then(() => {
        res.render('topicnotes' , {topic:topics[0] , notes:n})
    })
    .catch(err => console.log(err))
    
}
*/

module.exports.seeNotes_getId = function(req ,res , next) {
    TopicModel.findById(req.params.topicid)
    .then(topic => {
        if (topic) {
            res.render('topicnotes' , {topic:topic , notes:topic.notes});
        } else {
            res.redirect('/')
        }
    })
}