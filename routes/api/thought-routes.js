const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
    } = require ('../../controllers/thought-controllers')
// set up all and Post at /api/thought
router
    .route('/')
    .get(getAllThought)
    .post(createThought)
// set up Get one,put and delete at api/thought/:id

router  
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)
    
module.exports = router;