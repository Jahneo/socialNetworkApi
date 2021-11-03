const { Thought} = require ('../models');

const thoughtController = {
    getAllThought(req, res ){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get a THought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
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
    createThought({ body}, res){
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
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