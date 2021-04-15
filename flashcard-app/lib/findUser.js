import { connectToDatabase } from "../util/mongodb"


export async function Find(name){

    /*
        Checks the databas to see if the user already exist 

        @parms name => a string containing the username 
        
        @returns 
            a boolean value 
            True if the user exist 
            False if the user does not exist 

    */

    // Create a connection to mongodb 
    const {db} = await connectToDatabase();

    // Check if user already exist in the database    
    const exist = await db.collection('user').find({'user': name}).count() > 0;

    return exist
}