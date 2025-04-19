const express = require('express');
const jwt = require('jsonwebtoken');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = getAuth();
        const db = getFirestore();

        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        // Create JWT token
        const token = jwt.sign(
            { userId: user.uid, role: userData?.role || 'tenant' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Create session object
        const session = {
            user: {
                id: user.uid,
                name: userData?.name || '',
                email: user.email,
                role: userData?.role || 'tenant',
                societyId: userData?.societyId
            },
            access_token: token,
            expires_at: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        };

        res.json({ session });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Regular user signup route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const auth = getAuth();
        const db = getFirestore();

        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            name,
            email,
            role: 'tenant',
            createdAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: user.uid
        });
    } catch (error) {
        console.error('Signup error:', error);
        if (error.code === 'auth/email-already-in-use') {
            res.status(400).json({ message: 'User with this email already exists' });
        } else {
            res.status(500).json({ message: 'Server error during signup' });
        }
    }
});

// Admin signup route
router.post('/admin-signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const auth = getAuth();
        const db = getFirestore();

        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            name,
            email,
            role: 'admin',
            createdAt: new Date()
        });

        // Create JWT token
        const token = jwt.sign(
            { userId: user.uid, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Create session object
        const session = {
            user: {
                id: user.uid,
                name,
                email,
                role: 'admin'
            },
            access_token: token,
            expires_at: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        };

        res.status(201).json({ session });
    } catch (error) {
        console.error('Admin signup error:', error);
        if (error.code === 'auth/email-already-in-use') {
            res.status(400).json({ message: 'User with this email already exists' });
        } else {
            res.status(500).json({ message: 'Server error during admin signup' });
        }
    }
});

module.exports = router; 