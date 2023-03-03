const Router = require('router');
const router = Router();

const addNoteController = require('../controllers/addNote-controller')

router.post('/addnote/:topicid' , addNoteController.addNote_post)
module.exports = router;