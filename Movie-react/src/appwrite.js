const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

import {Client, Databases, Query, ID} from 'appwrite'
const client = new Client()
  .setPoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(Client);

export const updateSearchCount = async() => {
  // 1. use appwrite SDK to check if search term exists in the database
  try{
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm, searchTerm'),
    ])

    if(result.documents.length>0){
      const doc= result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, {
        count: doc.count+1,
      })
    }else{
      await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique,{
        searchTerm, count = 1, movie_id= movie.ID, poster_URL = `https://image.tmdb.org/t/p/w500${movie_path}`
      })
        
    
  }
}
  catch(error){
    console.error(error;)
  }
}