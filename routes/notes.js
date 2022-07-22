const express =  require('express');

const router = express.Router();

const{ getAllNotes, updateNote, getNote} = require('../controllers/notes');

router.route('/').get(getAllNotes);
router.route('/:symbol').get(getNote);
router.route('/:id').patch(updateNote);

module.exports = router;