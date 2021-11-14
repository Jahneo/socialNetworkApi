const {Schema, model, Types} = require ('mongoose');

// creating the Reaction Schema

 const ReactionSchema = new Schema ({
     reactionId: {
         type: Types.ObjectId,
         default: new Types.ObjectId()
     },
     reactionBody: {
         type: String,
         required: true,
         maxlength:280
     },
     username: {
         type: String,
         trim: true,
         required: "Username is required"
     },
     createdAt: {
         type:Date,
         default: Date.now,
         get:(createdAtVal) => moment(createAtVal).format("MM DD YYYY [at] hh:mm a")
     }
    
},

{ toJSON: { 
    getters: true
    } 
});

module.exports = ReactionSchema

