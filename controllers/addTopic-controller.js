const TopicModel = require('../models/Topic-model');
module.exports.addTopic_get = function (req ,res , next) { // /home route
    res.render('home')
}

module.exports.addTopic_post = function (req ,res , next) {
    let newTopic = new TopicModel(req.body.title);
    newTopic.save()
    .then(() => {
        res.status(302).redirect('/')
    })
    .catch(err => console.log(err))
    
}