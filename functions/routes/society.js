const express = require('express');
const { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs } = require('firebase/firestore');

const router = express.Router();

// Get society by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const db = getFirestore();

        // First check for society where user is admin
        const societiesRef = collection(db, 'societies');
        const q = query(societiesRef, where('adminId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const societyDoc = querySnapshot.docs[0];
            return res.json({ id: societyDoc.id, ...societyDoc.data() });
        }

        // If not found as admin, check user's societyId
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (!userDoc.exists()) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        if (userData.societyId) {
            const societyDoc = await getDoc(doc(db, 'societies', userData.societyId));
            if (societyDoc.exists()) {
                return res.json({ id: societyDoc.id, ...societyDoc.data() });
            }
        }

        // No society found for user
        return res.json(null);
    } catch (error) {
        console.error('Error fetching society:', error);
        res.status(500).json({ message: 'Server error while fetching society' });
    }
});

// Create new society
router.post('/', async (req, res) => {
    try {
        const societyData = req.body;
        const db = getFirestore();

        // Check for duplicate registration number
        const societiesRef = collection(db, 'societies');
        const q = query(societiesRef, where('registrationNumber', '==', societyData.registrationNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return res.status(400).json({
                message: 'Society with this registration number already exists'
            });
        }

        // Create new society
        const societyRef = doc(societiesRef);
        await setDoc(societyRef, {
            ...societyData,
            createdAt: new Date()
        });

        // If adminId is provided, update user with societyId
        if (societyData.adminId) {
            await updateDoc(doc(db, 'users', societyData.adminId), {
                societyId: societyRef.id
            });
        }

        res.status(201).json({ id: societyRef.id, ...societyData });
    } catch (error) {
        console.error('Error creating society:', error);
        res.status(500).json({ message: 'Server error while creating society' });
    }
});

// Get all societies
router.get('/', async (req, res) => {
    try {
        const db = getFirestore();
        const societiesRef = collection(db, 'societies');
        const querySnapshot = await getDocs(societiesRef);

        const societies = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(societies);
    } catch (error) {
        console.error('Error fetching societies:', error);
        res.status(500).json({ message: 'Server error while fetching societies' });
    }
});

// Get society by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();
        const societyDoc = await getDoc(doc(db, 'societies', id));

        if (!societyDoc.exists()) {
            return res.status(404).json({ message: 'Society not found' });
        }

        res.json({ id: societyDoc.id, ...societyDoc.data() });
    } catch (error) {
        console.error('Error fetching society:', error);
        res.status(500).json({ message: 'Server error while fetching society' });
    }
});

// Update society
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const db = getFirestore();

        const societyRef = doc(db, 'societies', id);
        const societyDoc = await getDoc(societyRef);

        if (!societyDoc.exists()) {
            return res.status(404).json({ message: 'Society not found' });
        }

        await updateDoc(societyRef, {
            ...updateData,
            updatedAt: new Date()
        });

        const updatedDoc = await getDoc(societyRef);
        res.json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
        console.error('Error updating society:', error);
        res.status(500).json({ message: 'Server error while updating society' });
    }
});

// Delete society
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = getFirestore();

        const societyRef = doc(db, 'societies', id);
        const societyDoc = await getDoc(societyRef);

        if (!societyDoc.exists()) {
            return res.status(404).json({ message: 'Society not found' });
        }

        // Delete society
        await deleteDoc(societyRef);

        // Update any users with this societyId
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('societyId', '==', id));
        const querySnapshot = await getDocs(q);

        const updatePromises = querySnapshot.docs.map(doc =>
            updateDoc(doc.ref, { societyId: null })
        );

        await Promise.all(updatePromises);

        res.json({ message: 'Society deleted successfully' });
    } catch (error) {
        console.error('Error deleting society:', error);
        res.status(500).json({ message: 'Server error while deleting society' });
    }
});

module.exports = router; 