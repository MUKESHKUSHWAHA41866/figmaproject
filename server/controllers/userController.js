 

const Admin = require("../model/adminSchema");

// Register a new admin
exports.registerAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;
    console.log(email, password);
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    const admin = new Admin({ email, password,isAdmin:true });
   const tt= await admin.save();
    res.status(201).json({ message: 'Admin created successfully',
      success: true,
             user:tt
     });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    // const isMatch = await admin.comparePassword(password);
    // if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
 const isMatch = password===admin?.password
          if (!isMatch) {
            return res.status(401).json({
              message: "Invalid email or password",
              success: false,
            });
          }
    res.status(200).json({ message: 'Login successful',
       success: true,
             user:admin
     }); // Token logic can be added here
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
