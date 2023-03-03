const Router = require('router');
const router = Router();

const addTopicController = require('../controllers/addTopic-controller')

router.get('/home' , addTopicController.addTopic_get)
router.post('/addtitle' , addTopicController.addTopic_post);
router.use('/' , addTopicController.addTopic_get);

module.exports = router;