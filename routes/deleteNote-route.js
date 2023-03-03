const Router = require('router');
const router = Router();

const deleteNoteController = require('../controllers/deleteNote-controller')

router.post('/deletenote/:noteid' , deleteNoteController.deleteNote_post)
router.post('/deletetopic/:topicid' , deleteNoteController.deleteTopic_post)

module.exports = router;