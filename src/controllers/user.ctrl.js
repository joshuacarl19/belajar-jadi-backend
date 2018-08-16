import models from '../models';

exports.getUsers = (req, res) => {
    models.User.all().then((users) => {
        res.status(200).json({
            "messages":"All Users",
            users
        });;
    }).catch((err) => {
        res.status(500).json({
            "message": err.message
        });
    });
}