const User = require("../model/Usermodel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function Signup(request, response) {
    try {
        const { name, email, password, role } = request.body;
        const ExistingUser = await User.findOne( {email} )

        if(ExistingUser){
           return response.status(400).json({
                success : false,
                message : "Email already in Use"
            })
        }

        const salt = await bcrypt.genSalt(11)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password : hashedPassword,
            role : role || "buyer"
        })

        await newUser.save();

        response.status(201).json({ 
            success: true, 
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Signup Error:", error);
        response.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
    

}

async function Login(request, response) {
    try {
        const { email, password } = request.body;

        const ExistUser = await User.findOne( {email} )

        if(!ExistUser){
            return response.status(400).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        const ValidatePassword = await bcrypt.compare(password, ExistUser.password) 

        if(!ValidatePassword){
            return response.status(403).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const payload = {
            id : ExistUser.id,
            role : ExistUser.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECREAT_KEY,
            {
                expiresIn : "15m"
            }
        )
        

        response.cookie(
            "authorization_token",
            token,
            {
                httpOnly : true,
                maxAge: 15 * 60 * 1000
            }
        )

        response.status(200).json({
            success: true,
            message: "Login successful",
            user: {
               _id: ExistUser._id,
               name: ExistUser.name,
               email: ExistUser.email,
               role: ExistUser.role,
            },
        })

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
}

module.exports = { Signup, Login };