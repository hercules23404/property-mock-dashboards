import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate and authorize requests
 */
export const authenticate = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user info to request
        req.user = decoded;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};

/**
 * Middleware to check if user has admin role
 */
export const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required' });
        }

        next();
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(500).json({ message: 'Server error during authorization' });
    }
}; 