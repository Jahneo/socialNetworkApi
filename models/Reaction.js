const {Schema, Types} = require ('mongoose');
//const dateFormat = require('../dateFormat');
const moment = require('moment');

const reactionSchema = new Schema ({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    username: {
        type: String,
        required: true
    },
    reactionBody:{
        type: String,
        required: true,
        minlength: 1,
        maxlength:280

    },
   
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
        },
    
    {
        toJSON:{vitrul:true, getters: true},
        id:false
    }
);

module.exports = reactionSchema;