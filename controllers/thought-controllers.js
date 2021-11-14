const { User,Thought,Reaction} = require ('../models');

const thoughtController = {
    getAllThought(req, res ){
        Thought.find({})
        .populate({path: 'reaction',select:'__v'})
        .select('__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get a THought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'thought',
            select: '__v'
        })
        .select('__v')
        .sort({_id: -1})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought with that ID'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create Thought
    createThought({ body}, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate({_id: body.userId},{$push: {thought:dbThoughtData._id}},{new:true})
        
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No User found with that id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    })
        .catch(err => res.status(400).json(err));
    },
    //update a Thought
    updateThought ({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData){
                res.status(404).json({ message: 'No Thought with that id'});
                return;
             }
             res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a Thought
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought has this id'});
                return;
            }
            res.json(dbThoughtData);
    })
    .catch(err => res.status(404).json(err));
}
}
module.exports= thoughtController;