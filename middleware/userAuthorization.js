const jwt = require("jsonwebtoken")

function Authorization(request, response, next){
    try {
        const token = request.cookies.authorization_token;

        if (!token){
            return response.status(401).json({ 
                message: "Unauthorized, token missing" 
            });
        }

        const Decode = jwt.verify(token, process.env.JWT_SECREAT_KEY)
        request.ExistUser = Decode

        next();

    } catch (error) {
        return response.status(401).json({ 
            message: "Invalid or expired token" 
        });
    }
}

function isSeller(request, response, next){
    try {
        if(request.ExistUser.role!=="seller"){
            response.status(403).json({
                success : false, 
                message: "Access denied for seller Middleware" 
            });
        }

        
        response.json({ 
            success: true,
             message: "Middleware Passed! Seller Access Granted." 
            });

        // next();

    } catch (error) {
        console.error("isSeller Error:", error);
        response.status(500).json({       
            success : false,
            message: "Problem in isSeller middleware" 
        });
    }
}

function isAdmin(request, response, next){
    try {
        if(request.ExistUser.role!=="admin"){
            response.status(403).json({
                success : false, 
                message: "Access denied for Admin Middleware" 
            });
        }

        response.json({ 
            success: true,
             message: "Middleware Passed! Admin Access Granted." 
            });

        // next();

    } catch (error) {
        response.status(500).json({ 
            success : false,
            message: "Problem in isAdmin middleware" 
        });
    }
}


function isBuyer(request, response, next){
    try {
        if(request.ExistUser.role!=="buyer"){
            response.status(403).json({
                success : false, 
                message: "Access denied for buyer Middleware" 
            });
        }

        response.json({ 
            success: true,
             message: "Middleware Passed! buyer Access Granted." 
            });

        // next();

    } catch (error) {
        response.status(500).json({ 
            success : false,
            message: "Problem in isbuyer middleware" 
        });
    }
}

module.exports = { Authorization, isSeller, isAdmin, isBuyer }