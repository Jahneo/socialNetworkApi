const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
//const dateFormat = require('../dateFormat');
const moment = require('moment');
// thoughts Schema
const thoughtSchema = new Schema( {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
       
    },
    username: {
        type: String,
        trim: true,
        required: "Username is required"
    },
    reaction:[reactionSchema]

})
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

//create Thought model using the ThoughtSchema
const Thought = model ('Thought', thoughtSchema);
//export Thought model
module.exports = Thought;