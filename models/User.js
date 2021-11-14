const { Schema, model } = require('mongoose');
// creating Schema for database
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true,
         unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thought:[{
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }]
},
{ toJSON: {
    virtual: true
    }
});
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);
module.exports = User;