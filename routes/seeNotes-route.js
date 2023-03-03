const Router = require('router');
const router = Router();

const seeNotesController = require('../controllers/seeNotes-controller')

router.get('/seenotes' , seeNotesController.seeNotes_get)
router.get('/seenotes/:topicid' , seeNotesController.seeNotes_getId)
router.post('/seenotes' , seeNotesController.seeNotes_post)
module.exports = router;