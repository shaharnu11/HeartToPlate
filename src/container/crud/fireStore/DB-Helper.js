import { getFirestore } from 'redux-firestore';

const dbHelper = {  
  
 readVolunteers: async (filters, pageLimit) => {
      const db = getFirestore();
      try {
        const volunteers = [];
  
        const volunteersRef = await db.collection('Volunteers');
        let query = volunteersRef;
  
        if (filters.filteredCity !== undefined) {
          query = query.where('city', '==', filters.filteredCity);
        }
  
        if (filters.filteredVolunteerId !== undefined) {
          console.error(filters.filteredVolunteerId);
          query = query.where('id', '==', Number(filters.filteredVolunteerId));
        }
  
        query = query.limit(pageLimit); // TODO: set limit using pagination
  
        const snapshot = await query.get();
        snapshot.forEach(doc => {
          volunteers.push(doc.data());
        });
        return volunteers;
      } catch (err) {
        console.log("error in the read volunteer function in chooseVolunteerPopup: ", err);
        // await updateNotificationError(err);
      }
    }
};

export default dbHelper;

  