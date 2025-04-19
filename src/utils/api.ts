import { db } from '@/integrations/firebase/config';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    where,
    addDoc,
    deleteDoc
} from 'firebase/firestore';

// Auth API
export const authAPI = {
    login: async (email: string, password: string) => {
        // Implement login logic
        return { user: null, session: null };
    },
    signup: async (data: any) => {
        // Implement signup logic
        return { user: null };
    },
    adminSignup: async (data: any) => {
        // Implement admin signup logic
        return { user: null };
    }
};

// Society API
export const societyAPI = {
    create: async (data: any) => {
        const docRef = await addDoc(collection(db, 'societies'), data);
        return { id: docRef.id, ...data };
    },
    get: async (id: string) => {
        const docRef = doc(db, 'societies', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        throw new Error('Society not found');
    },
    update: async (id: string, data: any) => {
        const docRef = doc(db, 'societies', id);
        await updateDoc(docRef, data);
        return { id, ...data };
    },
    list: async () => {
        const querySnapshot = await getDocs(collection(db, 'societies'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
};

// Society Management
export const createSociety = async (data: any) => {
    const docRef = await addDoc(collection(db, 'societies'), data);
    return { id: docRef.id, ...data };
};

export const getSociety = async (id: string) => {
    const docRef = doc(db, 'societies', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error('Society not found');
};

export const updateSociety = async (id: string, data: any) => {
    const docRef = doc(db, 'societies', id);
    await updateDoc(docRef, data);
    return { id, ...data };
};

export const listSocieties = async () => {
    const querySnapshot = await getDocs(collection(db, 'societies'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Tenant Management
export const createTenant = async (data: any) => {
    const docRef = await addDoc(collection(db, 'tenants'), data);
    return { id: docRef.id, ...data };
};

export const getTenant = async (id: string) => {
    const docRef = doc(db, 'tenants', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error('Tenant not found');
};

export const updateTenant = async (id: string, data: any) => {
    const docRef = doc(db, 'tenants', id);
    await updateDoc(docRef, data);
    return { id, ...data };
};

export const listTenants = async (societyId: string) => {
    const q = query(collection(db, 'tenants'), where('societyId', '==', societyId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Maintenance Requests
export const createMaintenanceRequest = async (data: any) => {
    const docRef = await addDoc(collection(db, 'maintenanceRequests'), data);
    return { id: docRef.id, ...data };
};

export const getMaintenanceRequest = async (id: string) => {
    const docRef = doc(db, 'maintenanceRequests', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error('Maintenance request not found');
};

export const updateMaintenanceRequest = async (id: string, data: any) => {
    const docRef = doc(db, 'maintenanceRequests', id);
    await updateDoc(docRef, data);
    return { id, ...data };
};

export const listMaintenanceRequests = async (societyId: string) => {
    const q = query(collection(db, 'maintenanceRequests'), where('societyId', '==', societyId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const assignWorker = async (requestId: string, workerId: string) => {
    const docRef = doc(db, 'maintenanceRequests', requestId);
    await updateDoc(docRef, { workerId, status: 'assigned' });
    return { id: requestId, workerId, status: 'assigned' };
};

// Notices
export const createNotice = async (data: any) => {
    const docRef = await addDoc(collection(db, 'notices'), data);
    return { id: docRef.id, ...data };
};

export const getNotice = async (id: string) => {
    const docRef = doc(db, 'notices', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error('Notice not found');
};

export const listNotices = async (societyId: string) => {
    const q = query(collection(db, 'notices'), where('societyId', '==', societyId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const acknowledgeNotice = async (noticeId: string, userId: string) => {
    const docRef = doc(db, 'notices', noticeId);
    await updateDoc(docRef, {
        acknowledgements: {
            [userId]: true
        }
    });
    return { id: noticeId, acknowledged: true };
}; 