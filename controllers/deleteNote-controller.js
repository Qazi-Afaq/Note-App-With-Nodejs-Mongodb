const TopicModel = require('../models/Topic-model')
module.exports.deleteNote_post = function(req,res,next) {
    
}

module.exports.deleteTopic_post = function(req,res,next) {
    TopicModel.deleteById(req.params.topicid)
    .then(() => {
        res.status(302).redirect('/seenotes');
    })
}