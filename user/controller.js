const User = require('./model');

const bcrypt = require('bcryptjs');

// User can get their profile by id
const profile = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(400).json({ message: "User not found", status: false });
        }
        res.status(200).json({ user, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in get user profile', message.error)
    }
}

const edituser = async (req, res) => {
    const { fullname, password, address, state, phonenum } = req.body;
    const userId = req.params.id;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ status: false, msg: 'No user found ' });

        if (req.params.id !== userId.toString()) return res.status(400).json({ message: "Cannot update other user", status: false }); // only user with the same token

        user.fullname = fullname || user.fullname;
        user.address = address || user.address;
        user.state = state || user.state;
        user.phonenum = phonenum || user.phonenum;

        // if password is changed it will changed and hashed
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password, salt);
            user.password = hashedpassword;
        }

        user = await user.save();
        res.status(200).json({ status: true, user, message: 'Profile Update' })
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in edit user', message.error);
    }
}

const deluser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // find by user by id
        if (!user) return res.status(404).json({ message: 'User not found', status: false }); // no user

        // if (user._id.toString() !== req.user._id.toString()) {
        //     return res.status(401).json({ message: 'You are not authorized delete this user', status: false }); // only user with the same token can delete
        // }
        await User.findByIdAndDelete(req.params.id); // find by user id and delete 

        res.status(200).json({ message: 'You deleted your account', status: true }) // will delete account
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message })
        console.log('Error in delete user', error.message);
    }
};

module.exports = { profile, edituser, deluser }