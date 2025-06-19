import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: true, enum: ['guest', 'owner', 'creator'] }
})


UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword
  }
})


// Prevent model overwrite on hot reloads
const User = models.User || model('User', UserSchema);

export default User;
