const router = require('express').Router();
//const userRoutes = require('./user-routes');
// import all functions
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers');

// api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);
    
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    module.exports = router;
