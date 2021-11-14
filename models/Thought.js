const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');


// thoughts Schema
const ThoughtSchema = new Schema( {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get:(createdAt) => moment(createdAt).format('MM DD YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        trim: true,
        required: "Username is required"
    },
    reactions: [ReactionSchema]
},
{ toJSON: { 
    getters: true
 } 
});

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reaction.length;
});
const Thought = model ('Thought', ThoughtSchema);
//export Thought model
module.exports = Thought;