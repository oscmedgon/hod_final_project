function adminCheck (req, res) {
    const {user} = req;
    console.log(user)
    if (user !== undefined) {
        console.log(user)
        res.status(200).json({
            msg: 'User have an active account',
            data: user
        });
    } else {
        res.status(403).json({
            msg: 'No active user detected ty to login again.'
        });
    }
}
       
module.exports = adminCheck;
    