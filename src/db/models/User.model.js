import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
const Schema = mongoose.Schema;
const default_image = config.DEFAULT_IMAGE_URL; 
const storage = config.CLOUDINARY_URL; // path where your images stored

let userSchema = new Schema({

     first_name: {
          type: String,
          trim: true,
          unique: true
     },// Will trigger a MongoError with code 11000 when you save a duplicate
     last_name: {
          type: String,
          trim: true
     },
     username: {
          type: String,
          trim: true,
          required: true
     },

     dob: {
          type: Date,
          // default: 'YYYY-MM-DD'
     },
     gender: {
          type: String,
          enum: ['male', 'female', 'other']
     },
     age: {
          type: Number,
          default: 15,
          min: 15,
          max: 100
     },

     profile_pic: {
          type: String,
          default: default_image,
          get: pic => `${storage}/${pic}`
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     email_verified: { type: Boolean, default: false },
     hash_salt: { type: String },

     is_online: { type: Boolean, default: false },
     self_delete: { type: Boolean, default: false },
     suspended: { type: Boolean, default: false },

     country: { type: String, default: '' },
     state: { type: String, default: '' },
     city: { type: String, default: '' },
     address: [{
          society: String,
          block: String,
          street: String,
          current: { type: Boolean, default: true },
     }],

     phone_number: { type: String },
     verified_number: { type: Boolean, default: false },

     blockedBy: [{
          // self
     }],

     blockedTo: [{
          //other
     }],

     followedBy: [{

     }],

     followers: [{

     }],

     login_history: [{
          ip: { type: String },
          login_at: { type: Date, default: Date.now() },
          os: { type: String }
     }]

}, {
     timestamps: true, versionKey: false, collection: 'User',
     minimize: true, strict: true, selectPopulatedPaths: true,
     toObject: { getters: true }, bufferCommands: false,
     toJSON: { getters: true, virtuals: true }
});

/**Virtual methods */

/**Change stream event call when ever change in schema */

// userSchema.watch().on('change', (data) => {
//      console.log(data, 'going to update/save to User Model', new Date());
// });
userSchema.virtual('full_name')
     .get(function () {
          return (this.first_name + ' ' + this.last_name);
     });


//aggregate hook
// userSchema.pre('aggregate', function () {
//      // Add a $match state to the beginning of each pipeline.
//      this.pipeline().unshift({ $match: { self_delete: { $ne: true } } });
// });

// Error handling middlware for unique field
// userSchema.post('save', function (error, doc, next) {
//      if (error.name === 'MongoError' && error.code === 11000) {
//           next(new Error('There was a duplicate key error'));
//      } else {
//           next();
//      }
// });

// pre validate hook
userSchema.pre('validate', function (next) {
     // console.log('this will run before any pre.save middlware'); you can apply custome validations
     next();
});

/** pre hooks */
userSchema.pre('save', async function (next) {
     if (this.isNew) {
          this.setPassword(this.password);
     }
     next();
});

// userSchema.pre('remove', { query: true }, function () {
//      // {query:true } will call this when we do Model.remove
//      // {document:true} will call this if we do document.remove
//      console.log('removing...');
// });

//Pre and post save() hooks are not executed on update(), findOneAndUpdate()
// userSchema.pre('find', function () {
//      this.start = Date.now();
// });

// userSchema.pre('updateOne', { document: true, query: false }, function () {
//      this.set({ updatedAt: new Date() });
// });
//You cannot access the document being updated in pre('updateOne') or pre('findOneAndUpdate') query middleware
// userSchema.pre('findOneAndUpdate', async function () {
//      // const docToUpdate = await this.model.findOne(this.getQuery());
//      console.log('docToUpdate'); // The document that `findOneAndUpdate()` will modify
// });


/** post hooks  call after all pre hooks middlwares*/
// userSchema.post('update', function (error, res, next) {
//      if (error.name === 'MongoError' && error.code === 11000) {
//           next(new Error('There was a duplicate key error'));
//      } else {
//           next(); // The `update()` call will still error out.
//      }
// });

userSchema.post('save', function (_, next) {
     // console.log('User saved', user.toJSON());
     next(); // call next run susequent hooks after this 
});

// userSchema.post('remove', function (user) {
//      console.log('User removed', user._id);
// });

// userSchema.post('find', function (doc) {
//      // prints returned documents
//      console.log('find() returned ' + JSON.stringify(doc));
//      // prints number of milliseconds the query took
//      console.log('find() took ' + (Date.now() - this.start) + ' millis');
//      //this refers to the query object rather than the document being updated
// });


/** Query methods of Schema */
userSchema.query = {
     getById: function (id) {
          return this.where({ _id: id }).lean();
     },
     getByEmail: function (email) {
          return this.where({ email: email }).lean();
     }
};

/** Instance methods of Schema */
userSchema.methods = {
     validatePassword: function (password) {
          let hashed = crypto.pbkdf2Sync(password, this.hash_salt, 1000, 512, 'sha512').toString('hex');
          return this.password = hashed;
     },
     setPassword: function (password) {
          let salt = crypto.randomBytes(16).toString('hex');
          this.hash_salt = salt;
          this.password = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
     },
     generateJWT: function () {
          return jwt.sign({
               id: this._id,
               username: this.username,
               email: this.email
           }, config.value.JWT_SECRET, { expiresIn: '1y' });
     },
     toJSON: function () {
          return {
               _id: this._id,
               username: this.username,
               email: this.email,
               full_name: this.full_name,
               nickname: this.nickname,
               first_name: this.first_name,
               last_name: this.last_name
          };
     },
     toAuthJSON: function () {
          return {
               id: this._id,
               username: this.username,
               first_name: this.first_name,
               email: this.email,
               Token: this.generateJWT(),
          };
     },
};

/** Static methods of Schema */
userSchema.statics = {
     newUser: async function (data) {
          const { first_name, last_name, email, nickname, age, password } = data;
          let user = new this();//{
          user.first_name = first_name,
          user.last_name = last_name,
          user.username = 'Mubbasher';
          user.email = email,
          user.nickname = nickname || '',
          user.age = age || 75,
          user.password = password;
          await user.save();
          return user;
     },
     Login: async function (data) {
          const { identifier, password } = data;

     },
     findByIdentifier: async function (data) {
          const { identifier, password } = data;
          let user = await this.findOne({ $or: [{ username: identifier }, { email: identifier }] });
          if (user && user.validatePassword(password)) {
               return user.toAuthJSON();
          }
     },
     getAllUsers: async function () {

     }
};

mongoose.model('User', userSchema);