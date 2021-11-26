const  {Thought,User,Reaction} = require ('../models/index');


const thoughtController = {
    getAllThought(req, res ){
        Thought.find({})
        
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get a THought by id
    getThoughtById({params,body}, res) {
        Thought.findOne({_id: params.id})
        
        .select('-__v')
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
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id"});
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
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
        .catch(err => {
           
            res.status(400).json(err);
        });
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
    .catch(err => {
       
        res.status(400).json(err);
    });
},
   addReaction ({params,body},res){
       Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$push: {reactions: body}},
        { runValidators: true, new: true }
      )
       .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought has this id'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
       
        res.status(400).json(err);
    });
},

    deleteReaction ({params}, res){
        Thought.findOneAndUpdate(
         {_id: params.thoughtId},
         {$pull: {reactions: {_id: params.reactionId}}},
         { runValidators: true, new: true }
        )
        .then(dbThoughtData => {
         if (!dbThoughtData) {
             res.status(404).json({ message: 'No thought has this id'});
             return;
         }
         res.json(dbThoughtData);
     })
     .catch(err => {
       
        res.status(400).json(err);
    });
},
   
}
module.exports= thoughtController;