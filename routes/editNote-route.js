const Router = require('router');
const router = Router();

const editNoteController = require('../controllers/editNote-controller')

router.post('/editnote/:noteid' , editNoteController.editNote_post);
router.post('/updatenote/:noteid' , editNoteController.updateNote_post);
router.post('/edittopic/:topicid' , editNoteController.editTopic_post)
router.post('/updatetopic/:topicid' , editNoteController.updateTopic_post)
module.exports = router;