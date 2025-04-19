import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    Timestamp,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';
import {
    FirebaseUser,
    FirebaseSociety,
    FirebaseProperty,
    FirebaseMaintenanceRequest,
    FirebaseNotice,
    FirebasePayment
} from '@/types/firebase';

// Collections
const usersCollection = collection(db, 'users');
const societiesCollection = collection(db, 'societies');
const propertiesCollection = collection(db, 'properties');
const maintenanceRequestsCollection = collection(db, 'maintenanceRequests');
const noticesCollection = collection(db, 'notices');
const paymentsCollection = collection(db, 'payments');

// Helper function to convert Firestore data to typed object
const convertToType = <T>(data: DocumentData): T => {
    return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        startDate: data.startDate?.toDate(),
        endDate: data.endDate?.toDate(),
        dueDate: data.dueDate?.toDate(),
        paidDate: data.paidDate?.toDate(),
    } as T;
};

// User Services
export const userService = {
    async createUser(user: Omit<FirebaseUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<FirebaseUser> {
        const userRef = doc(usersCollection);
        const newUser = {
            ...user,
            id: userRef.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };
        await setDoc(userRef, newUser);
        return newUser;
    },

    async getUser(id: string): Promise<FirebaseUser | null> {
        const userRef = doc(usersCollection, id);
        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? convertToType<FirebaseUser>(userSnap.data()) : null;
    },

    async updateUser(id: string, data: Partial<FirebaseUser>): Promise<void> {
        const userRef = doc(usersCollection, id);
        await updateDoc(userRef, {
            ...data,
            updatedAt: Timestamp.now(),
        });
    },

    async deleteUser(id: string): Promise<void> {
        const userRef = doc(usersCollection, id);
        await deleteDoc(userRef);
    },
};

// Society Services
export const societyService = {
    async createSociety(society: Omit<FirebaseSociety, 'id' | 'createdAt' | 'updatedAt'>): Promise<FirebaseSociety> {
        const societyRef = doc(societiesCollection);
        const newSociety = {
            ...society,
            id: societyRef.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };
        await setDoc(societyRef, newSociety);
        return newSociety;
    },

    async getSociety(id: string): Promise<FirebaseSociety | null> {
        const societyRef = doc(societiesCollection, id);
        const societySnap = await getDoc(societyRef);
        return societySnap.exists() ? convertToType<FirebaseSociety>(societySnap.data()) : null;
    },

    async updateSociety(id: string, data: Partial<FirebaseSociety>): Promise<void> {
        const societyRef = doc(societiesCollection, id);
        await updateDoc(societyRef, {
            ...data,
            updatedAt: Timestamp.now(),
        });
    },

    async deleteSociety(id: string): Promise<void> {
        const societyRef = doc(societiesCollection, id);
        await deleteDoc(societyRef);
    },

    async getSocietiesByAdmin(adminId: string): Promise<FirebaseSociety[]> {
        const q = query(societiesCollection, where('adminId', '==', adminId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => convertToType<FirebaseSociety>(doc.data()));
    },
};

// Property Services
export const propertyService = {
    async createProperty(property: Omit<FirebaseProperty, 'id' | 'createdAt' | 'updatedAt'>): Promise<FirebaseProperty> {
        const propertyRef = doc(propertiesCollection);
        const newProperty = {
            ...property,
            id: propertyRef.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };
        await setDoc(propertyRef, newProperty);
        return newProperty;
    },

    async getProperty(id: string): Promise<FirebaseProperty | null> {
        const propertyRef = doc(propertiesCollection, id);
        const propertySnap = await getDoc(propertyRef);
        return propertySnap.exists() ? convertToType<FirebaseProperty>(propertySnap.data()) : null;
    },

    async updateProperty(id: string, data: Partial<FirebaseProperty>): Promise<void> {
        const propertyRef = doc(propertiesCollection, id);
        await updateDoc(propertyRef, {
            ...data,
            updatedAt: Timestamp.now(),
        });
    },

    async deleteProperty(id: string): Promise<void> {
        const propertyRef = doc(propertiesCollection, id);
        await deleteDoc(propertyRef);
    },

    async getPropertiesBySociety(societyId: string): Promise<FirebaseProperty[]> {
        const q = query(propertiesCollection, where('societyId', '==', societyId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => convertToType<FirebaseProperty>(doc.data()));
    },
};

// Maintenance Request Services
export const maintenanceRequestService = {
    async createRequest(request: Omit<FirebaseMaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<FirebaseMaintenanceRequest> {
        const requestRef = doc(maintenanceRequestsCollection);
        const newRequest = {
            ...request,
            id: requestRef.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };
        await setDoc(requestRef, newRequest);
        return newRequest;
    },

    async getRequest(id: string): Promise<FirebaseMaintenanceRequest | null> {
        const requestRef = doc(maintenanceRequestsCollection, id);
        const requestSnap = await getDoc(requestRef);
        return requestSnap.exists() ? convertToType<FirebaseMaintenanceRequest>(requestSnap.data()) : null;
    },

    async updateRequest(id: string, data: Partial<FirebaseMaintenanceRequest>): Promise<void> {
        const requestRef = doc(maintenanceRequestsCollection, id);
        await updateDoc(requestRef, {
            ...data,
            updatedAt: Timestamp.now(),
        });
    },

    async deleteRequest(id: string): Promise<void> {
        const requestRef = doc(maintenanceRequestsCollection, id);
        await deleteDoc(requestRef);
    },

    async getRequestsByProperty(propertyId: string): Promise<FirebaseMaintenanceRequest[]> {
        const q = query(maintenanceRequestsCollection, where('propertyId', '==', propertyId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => convertToType<FirebaseMaintenanceRequest>(doc.data()));
    },
};

// Notice Services
export const noticeService = {
    async createNotice(notice: Omit<FirebaseNotice, 'id' | 'createdAt' | 'updatedAt'>): Promise<FirebaseNotice> {
        const noticeRef = doc(noticesCollection);
        const newNotice = {
            ...notice,
            id: noticeRef.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };
        await setDoc(noticeRef, newNotice);
        return newNotice;
    },

    async getNotice(id: string): Promise<FirebaseNotice | null> {
        const noticeRef = doc(noticesCollection, id);
        const noticeSnap = await getDoc(noticeRef);
        return noticeSnap.exists() ? convertToType<FirebaseNotice>(noticeSnap.data()) : null;
    },

    async updateNotice(id: string, data: Partial<FirebaseNotice>): Promise<void> {
        const noticeRef = doc(noticesCollection, id);
        await updateDoc(noticeRef, {
            ...data,
            updatedAt: Timestamp.now(),
        });
    },

    async deleteNotice(id: string): Promise<void> {
        const noticeRef = doc(noticesCollection, id);
        await deleteDoc(noticeRef);
    },

    async getNoticesBySociety(societyId: string): Promise<FirebaseNotice[]> {
        const q = query(noticesCollection, where('societyId', '==', societyId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => convertToType<FirebaseNotice>(doc.data()));
    },
};

// Payment Services
export const paymentService = {
    async createPayment(payment: Omit<FirebasePayment, 'id' | 'createdAt' | 'updatedAt'>): Promise<FirebasePayment> {
        const paymentRef = doc(paymentsCollection);
        const newPayment = {
            ...payment,
            id: paymentRef.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };
        await setDoc(paymentRef, newPayment);
        return newPayment;
    },

    async getPayment(id: string): Promise<FirebasePayment | null> {
        const paymentRef = doc(paymentsCollection, id);
        const paymentSnap = await getDoc(paymentRef);
        return paymentSnap.exists() ? convertToType<FirebasePayment>(paymentSnap.data()) : null;
    },

    async updatePayment(id: string, data: Partial<FirebasePayment>): Promise<void> {
        const paymentRef = doc(paymentsCollection, id);
        await updateDoc(paymentRef, {
            ...data,
            updatedAt: Timestamp.now(),
        });
    },

    async deletePayment(id: string): Promise<void> {
        const paymentRef = doc(paymentsCollection, id);
        await deleteDoc(paymentRef);
    },

    async getPaymentsByProperty(propertyId: string): Promise<FirebasePayment[]> {
        const q = query(paymentsCollection, where('propertyId', '==', propertyId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => convertToType<FirebasePayment>(doc.data()));
    },
}; 