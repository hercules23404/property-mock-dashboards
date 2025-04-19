import { db } from './config.js';
import { collection, doc, setDoc } from 'firebase/firestore';

// Collection names
export const COLLECTIONS = {
    USERS: 'users',
    SOCIETIES: 'societies',
    TENANTS: 'tenants',
    MAINTENANCE_REQUESTS: 'maintenanceRequests',
    NOTICES: 'notices',
    PAYMENTS: 'payments',
    PROPERTIES: 'properties',
    UNITS: 'units'
} as const;

// Initialize collections with default documents
export const initializeCollections = async () => {
    try {
        // Create users collection with default admin
        const usersRef = collection(db, COLLECTIONS.USERS);
        await setDoc(doc(usersRef, 'default-admin'), {
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Create societies collection with default society
        const societiesRef = collection(db, COLLECTIONS.SOCIETIES);
        await setDoc(doc(societiesRef, 'default-society'), {
            name: 'Default Society',
            address: '123 Main Street',
            city: 'Sample City',
            state: 'Sample State',
            zipCode: '12345',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Create properties collection with default property
        const propertiesRef = collection(db, COLLECTIONS.PROPERTIES);
        await setDoc(doc(propertiesRef, 'default-property'), {
            societyId: 'default-society',
            name: 'Default Property',
            address: '123 Main Street',
            type: 'apartment',
            totalUnits: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Create units collection with default unit
        const unitsRef = collection(db, COLLECTIONS.UNITS);
        await setDoc(doc(unitsRef, 'default-unit'), {
            propertyId: 'default-property',
            unitNumber: '101',
            floor: 1,
            size: 1000,
            bedrooms: 2,
            bathrooms: 2,
            rent: 2000,
            status: 'vacant',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Firestore collections initialized successfully');
    } catch (error) {
        console.error('Error initializing collections:', error);
        throw error;
    }
};

// Collection schemas
export const SCHEMAS = {
    USERS: {
        email: 'string',
        name: 'string',
        role: ['admin', 'manager', 'tenant'],
        societyId: 'string?',
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    },
    SOCIETIES: {
        name: 'string',
        address: 'string',
        city: 'string',
        state: 'string',
        zipCode: 'string',
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    },
    TENANTS: {
        userId: 'string',
        societyId: 'string',
        unitId: 'string',
        startDate: 'timestamp',
        endDate: 'timestamp?',
        status: ['active', 'inactive'],
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    },
    MAINTENANCE_REQUESTS: {
        tenantId: 'string',
        societyId: 'string',
        unitId: 'string',
        title: 'string',
        description: 'string',
        priority: ['low', 'medium', 'high'],
        status: ['pending', 'assigned', 'in-progress', 'completed'],
        assignedTo: 'string?',
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    },
    NOTICES: {
        societyId: 'string',
        title: 'string',
        content: 'string',
        type: ['general', 'maintenance', 'payment'],
        priority: ['low', 'medium', 'high'],
        startDate: 'timestamp',
        endDate: 'timestamp',
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    },
    PAYMENTS: {
        tenantId: 'string',
        societyId: 'string',
        unitId: 'string',
        amount: 'number',
        type: ['rent', 'maintenance', 'other'],
        status: ['pending', 'completed', 'failed'],
        dueDate: 'timestamp',
        paidDate: 'timestamp?',
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    },
    PROPERTIES: {
        societyId: 'string',
        name: 'string',
        address: 'string',
        type: ['apartment', 'house', 'commercial'],
        totalUnits: 'number',
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    },
    UNITS: {
        propertyId: 'string',
        unitNumber: 'string',
        floor: 'number',
        size: 'number',
        bedrooms: 'number',
        bathrooms: 'number',
        rent: 'number',
        status: ['vacant', 'occupied', 'maintenance'],
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    }
} as const; 