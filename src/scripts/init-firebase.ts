import { initializeCollections } from '../integrations/firebase/init.js';

const init = async () => {
    try {
        console.log('Starting Firebase initialization...');
        await initializeCollections();
        console.log('Firebase initialization completed successfully');
        process.exit(0);
    } catch (error: any) {
        console.error('Error during Firebase initialization:', error);
        if (error.code === 'PERMISSION_DENIED') {
            console.error('\nPlease make sure you have:');
            console.error('1. Enabled Firestore in your Firebase Console');
            console.error('2. Run "firebase init firestore"');
            console.error('3. Run "firebase deploy --only firestore:rules"');
            console.error('\nThen try running this script again.');
        }
        process.exit(1);
    }
};

init(); 