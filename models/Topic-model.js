const mongodb = require('mongodb')

// const Topic = sequelize.define('topics' , {
//     id: {
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true,
//         unique:true,
//         type:Sequelize.INTEGER
//     },
//     title: {
//         type:Sequelize.STRING,
//         allowNull:false,
//     }
// }, {timestamps:false})

// module.exports = Topic;

let getDb = require('../util/sql-database').getDb;

class Topic {
    constructor(title) {
        this.title = title;
        this.notes = [];
    }

    save() {
        return getDb().collection('topics').insertOne(this)
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
    }

    static fetchLike(title) {
        return getDb().collection('topics').find({ "title":new RegExp(".*" + title + ".*") }).toArray()
    }

    static findById(topicId) {
        return getDb().collection('topics').find({_id:new mongodb.ObjectId(topicId)}).next();
    }

    static updateById(topicId , updatedTitle) {
        return getDb().collection('topics').updateOne(
            {
                _id:new mongodb.ObjectId(topicId)
            },
            {
                $set: {title:updatedTitle}
            }
        )
    }

    static deleteById(topicId) {
        return getDb().collection('topics').deleteOne(
            {
                _id:new mongodb.ObjectId(topicId)
            }
        )
    }

    static addNote(body , topicid) {
        let imagesArray = [];
        let videosArray = [];
        if (body.imageUrl != null || body.imageUrl != undefined) {
            if (!(body.imageUrl instanceof Array)) {
                imagesArray[0] = body.imageUrl;
            } else {
                imagesArray = body.imageUrl
            }
        }
        
        if (body.videoUrl != undefined || body.videoUrl != null) {
            if (!(body.videoUrl instanceof Array)) {
                videosArray[0] = body.videoUrl;
            } else {
                videosArray = body.videoUrl;
            }
        }
        
        return this.findById(topicid)
        .then(topic => {
            let noteToAppend = {};
            noteToAppend._id = new mongodb.ObjectId();
            noteToAppend.title = body.title;
            noteToAppend.description = body.description;
            noteToAppend.imageUrl = imagesArray;
            noteToAppend.videoUrl = videosArray;
            topic.notes.push(noteToAppend);

            getDb().collection('topics').replaceOne({_id:topic._id} , topic)
        })
        .catch(err => console.log(err))
    }

    static updateNote(topicid , updatedNotes) {
        return getDb().collection('topics').updateOne({_id:topicid} , {$set:{notes:updatedNotes}})
    }
}

module.exports = Topic;