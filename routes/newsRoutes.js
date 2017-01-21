var express = require('express');
var router = express.Router();
var newsController = require('../controllers/newsController.js');

/*
 * GET
 */
router.get('/', newsController.list);

/*
 * GET
 */
router.get('/:id', newsController.show);

/*
 * POST
 */
router.post('/', newsController.create);

/*
 * PUT
 */
router.put('/:theCode/:id', newsController.update);

/*
 * DELETE
 */
router.delete('/:theCode/:id', newsController.remove);

module.exports = router;
