const { User,Thought } = require ('../models');

const userController = {
    //get all users
    getAllUser(req, res) {
        User.find({})
        .select('__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // get user by Id
    getUserById({params},res){
        User.findOne({ _id: params.id})
        .populate({
            path: 'thought',
            select: '__v'
        })
        .select('__v')
        .sort({_id: -1})
        .then(dbUsertData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // create user
    createUser({body}, res) {
        User.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    //update user by id
    updateUser({params,body}, res) {
        User.findOneAndUpdate({ _id: params.id},body , {new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404),json({message: 'No User with that ID present'});
                return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
    },
    //delete a user
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404),json({message: 'No User with that ID found'});
                return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
    }
    
};
module.exports = userController;