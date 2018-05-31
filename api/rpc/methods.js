const Users     = require("../model/users");
const User      = require("../model/user");

let users  = new Users();

const RPC = module.exports = {

    findAll(id, params, callback){
        users.findAll(callback);
    },
    create(id, params, callback){
        let usr = new User(params.name, params.score);
        users.add(usr, callback);
    },
    findById (id, params, callback){
        users.findById(id, callback);
    },
    update(id, params, callback){
        users.findById(id, (err, user) => {
            if (err)
                return callback(err);

            user.name = params.name;
            user.score = params.score;
            users.save(user, callback);
        });
    },
    remove(id, params, callback){
        users.remove(id, callback);
    }

}