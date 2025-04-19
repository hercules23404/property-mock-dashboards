// Mock API for development purposes
// This simulates backend responses while you build the actual backend API

// Mock storage in localStorage
const MOCK_USERS_KEY = 'mock_users';
const MOCK_SOCIETIES_KEY = 'mock_societies';

// Initialize mock data if not exists
if (!localStorage.getItem(MOCK_USERS_KEY)) {
    localStorage.setItem(
        MOCK_USERS_KEY,
        JSON.stringify([
            {
                id: '1',
                name: 'Admin User',
                email: 'admin@example.com',
                // In a real app, never store plain passwords! This is just for demo
                password: 'password123',
                role: 'admin',
            },
            {
                id: '2',
                name: 'Tenant User',
                email: 'tenant@example.com',
                password: 'password123',
                role: 'tenant',
                societyId: '1',
            },
        ])
    );
}

if (!localStorage.getItem(MOCK_SOCIETIES_KEY)) {
    localStorage.setItem(
        MOCK_SOCIETIES_KEY,
        JSON.stringify([
            {
                id: '1',
                name: 'Sunshine Apartments',
                address: '123 Main St',
                city: 'New York',
                state: 'NY',
                pincode: '10001',
                contactNumber: '555-123-4567',
                email: 'info@sunshine.com',
                registrationNumber: 'REG12345',
                totalProperties: 50,
                adminId: '1',
            },
        ])
    );
}

// Helper functions
const getUsers = () => {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
};

const getSocieties = () => {
    return JSON.parse(localStorage.getItem(MOCK_SOCIETIES_KEY) || '[]');
};

const saveUsers = (users: any[]) => {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

const saveSocieties = (societies: any[]) => {
    localStorage.setItem(MOCK_SOCIETIES_KEY, JSON.stringify(societies));
};

// Simulate backend delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API implementations
export const mockAuthAPI = {
    login: async (email: string, password: string) => {
        await delay(500); // Simulate network delay

        const users = getUsers();
        const user = users.find((u: any) => u.email === email);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== password) {
            throw new Error('Invalid password');
        }

        // Create session
        const session = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                societyId: user.societyId,
            },
            access_token: 'mock-token-' + Math.random().toString(36).substring(2),
            expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        };

        return { session };
    },

    signup: async (name: string, email: string, password: string) => {
        await delay(500);

        const users = getUsers();
        const existingUser = users.find((u: any) => u.email === email);

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            role: 'tenant',
        };

        users.push(newUser);
        saveUsers(users);

        return { success: true, message: 'User created successfully' };
    },

    adminSignup: async (name: string, email: string, password: string) => {
        await delay(500);

        const users = getUsers();
        const existingUser = users.find((u: any) => u.email === email);

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            role: 'admin',
        };

        users.push(newUser);
        saveUsers(users);

        // Create session
        const session = {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            access_token: 'mock-token-' + Math.random().toString(36).substring(2),
            expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        };

        return { session };
    },
};

export const mockSocietyAPI = {
    getSociety: async (userId: string) => {
        await delay(300);

        const societies = getSocieties();

        // Check if user is an admin of any society
        let society = societies.find((s: any) => s.adminId === userId);

        if (society) {
            return society;
        }

        // Check if user is a tenant in any society
        const users = getUsers();
        const user = users.find((u: any) => u.id === userId);

        if (user?.societyId) {
            society = societies.find((s: any) => s.id === user.societyId);
            return society || null;
        }

        return null;
    },

    createSociety: async (societyData: any) => {
        await delay(500);

        const societies = getSocieties();

        // Check for duplicate registration number
        const existingSociety = societies.find(
            (s: any) => s.registrationNumber === societyData.registrationNumber
        );

        if (existingSociety) {
            throw new Error('Society with this registration number already exists');
        }

        const newSociety = {
            id: Date.now().toString(),
            ...societyData,
            totalProperties: societyData.totalProperties || 0,
        };

        societies.push(newSociety);
        saveSocieties(societies);

        return newSociety;
    },
}; 