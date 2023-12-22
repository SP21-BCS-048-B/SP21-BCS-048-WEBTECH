import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
    operator1: {
        type: Number,
        required: true
    },
    operator2:{
        type: Number,
        required: true,
    }
}, {
    timestamps: true
}
)

const User = mongoose.model('User', userSchema)
//User variable is exported as follow is a ES module.
export default User