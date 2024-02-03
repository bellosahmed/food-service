const Vendor = require('./model');

const createVendor = async (req, res) => {
    const { price, shopname, desc, img, productname } = req.body;
    //const userId = req.user.id;
    try {
        if (!(price && shopname && productname && desc)) {
            return res.status(400).json({ message: 'Please fill all fields' }); // you must fill the fields
        }

        let vendor = await Vendor.findOne({ _id: req.params.id });

        if (vendor) {
            return res.status(400).json({ message: 'Product has already been created' }) // when item has been created
        }

        const newVendor = new Vendor({ price, shopname, desc, img, productname });

        await newVendor.save();
        res.status(201).json({ newVendor, status: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in create vendor: ", error.message);
    }
};

const editvendor = async (req, res) => {
    const { price, shopname, desc, img, productname } = req.body;
    const vendorId = req.params.id;
    try {
        let vendor = await Vendor.findById(vendorId) // find by vendor id
        if (!vendor) {
            return res.status(400).json({ message: 'No Vendor found' }); // if no vendor has beem created
        }
        vendor.shopname = shopname || vendor.shopname;
        vendor.price = price || vendor.price;
        vendor.desc = desc || vendor.desc;
        vendor.img = img || vendor.img;
        vendor.productname = productname || vendor.productname;

        vendor = await vendor.save(); // to save in the database
        res.status(200).json({ message: 'Vendor Updated', vendor, status: true }) // to get the edited plan 
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in edit vendor: ", error.message);
    }
};

const delvendor = async (res, req) => {
    const vendor = await Vendor.findById(req.params.id);
    try {
        if (!vendor) { // if no parcel is found
            res.status(404).json({ status: false, msg: 'Vendor does not exist' });
        }

        await Vendor.findByIdAndDelete(req.params.id); // delete the parcel
        res.status(200).json({ msg: 'Your vendor has been deleted', status: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in delete vendor: ", error.message);
    }
};

// search by id
const vendorsearchid = async (req, res,) => {
    try {
        const vendor = await Vendor.findById(req.params.id); // parcel to be found by id
        if (!vendor) { // if no parcel
            res.status(404).json({ status: false, msg: 'No vendor found' });
        }
        res.status(200).json({ status: true, vendor });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in Get by Id vendor: ", error.message);
    }
};

// search by name price and vendor store
const npvendor = async (req, res) => {
    const { shopname, price, productname } = req.body;
    try {
        const vendor = await Vendor.find({ shopname, price, productname }); // to find all items
        res.status(200).json(vendor); // will get all items in the store
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message })
        console.log('Error in get npvendor', error.message)
    }
};

// get all vendor products in the home page
const allvendor = async (req, res) => {
    try {
        const vendor = await Vendor.find(); // to find all items
        res.status(200).json(vendor); // will get all items in the store
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message })
        console.log('Error in get all vendor', error.message)
    }
};

// should vendor have seperate model

// sidenote improvement needs to be made in vendor if needed to create another model

module.exports = { createVendor, editvendor, delvendor, vendorsearchid, allvendor, npvendor };