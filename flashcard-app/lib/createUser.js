import { connectToDatabase } from "../util/mongodb"


export async function Create(name){

    /*
        Creates a new user in the database 

        @parms name => a string containing the username 
        
        @returns 
            a boolean value 
            True if the user was created 

    */

    // Create a connection to mongodb 
    const {db} = await connectToDatabase();

    // Create a new user in the database
    const data = await db.collection('user').insertOne({user:name});
    let CreateFlashcardsArray = await db.collection('user').updateOne({'user':name},{$set:{flashcards:[]}})

    return data
}