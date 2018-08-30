const {User} = require("./model.js");

const UserDao={
    save(userinfo){
        const user = new User(userinfo);
        return user.save();
    },
    find(userinfo){
        return User.find(userinfo);
    },
    update(){},
    delete(){}
};

module.exports = UserDao;
