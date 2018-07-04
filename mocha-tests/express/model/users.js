"use strict";

class Users extends Array{

    constructor() {
        super();
        this.nextId = 1;
    }

    add(user, callback){
        if (user && user.name && user.score){
            user.id = this.nextId++;
            this.push(user);
            callback(null, user);
        }else{
            callback(new Error("require params not present"));
        }
    }

    save(user, callback){
        if (user && user.name && user.score){
            let usr = this._findByIdSync(user.id);
            if (usr){
                Object.assign(usr, user);
                callback(null, usr);
            }else{
                add(user, callback);
            }
        }else{
            callback(new Error("require params not present"));
        }
    }

    findAll(callback){
        callback(null, this);
    }

    findById(id, callback){
        let usr = this._findByIdSync(id);
        if (usr)
            callback(null, usr);
        else
            callback(new Error('User not found'));
    }

    _findByIdSync(id){
        return this.find((user) => user.id == id);
    }

    remove(id, callback){
        let usr = this._findByIdSync(id);
        if (usr){
            var index = this.indexOf(usr);
            let user = this.splice(index, 1);
            callback(null, user[0]);
        }else{
            callback(new Error('User not found'));
        }
    }

}

module.exports = Users;