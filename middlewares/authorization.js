module.exports = {
    authorize(userTypes) {
        return function (req, res, next) {
            if (userTypes.includes(req.user.userType)) {
                next();
            } else {
                res.status(403).json({ message: "Forbidden" });
            }
        }
    }

}