const User = require('../user/model');

// Create an account
const register = async (req, res) => {
    const { fullname, username, phonenum, address, state, gender, email, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: 'This user has already been created', status: false });
        }

        if (!(fullname && username && phonenum && address && state && gender && email && password)) {
            res.status(400).json({ msg: "Please fill all fields", status: false })
        }

        const newUser = new User({ // to create user
            fullname, username, phonenum, address, state, username, gender, email: email.toLowerCase(), password
        });

        await newUser.save();// saved in the database
        res.status(201).json({ newUser, status: true });
    } catch (error) {
        // if there is error
        console.error('Error in signup:', error);
        res.status(500).json({ message: error.message });
    }
};

// To login 
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!(username && password)) {
            return res.status(400).json({ msg: "Please username or password is correctly placed", status: false });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: 'User does not exist', status: false
            });
        }
        res.status(200).json({ user, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error in loginUser: ", error.message);
    }
};

// To logout 
const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: 'User logged out' }); // user to logout
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log("Error in Logout: ", error.message);
    }
};

module.exports = { register, login, logout }