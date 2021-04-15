import { Find } from "../../lib/findUser"
import { connectToDatabase } from "../../util/mongodb"


export default async function handler(req, res){

    // Create a connection to mongodb 
    const {db} = await connectToDatabase();

    //  Get the name query from the url 
    const name = req.query.name

    // Get the flashcard data 
    let cardJSON = JSON.parse(req.body)
    let cardArray = [...cardJSON.card]
    



    // Calls the database and checks to see if the user exist 
    // returns a boolean value  
    const DoesUserExist = await Find(name)
    
    // If the user exist in the database check to see if they have a flashcard array 
    if(DoesUserExist == true){
        // Get the user data 
        let userColumns = []
        let userData = await db.collection('user').find({'user': name}).returnKey().forEach(key => userColumns.push(key));

        // Turn user data into json 
        let stringUserColumns = JSON.stringify(userColumns[0])
        let UserColumnsJson = JSON.parse(stringUserColumns)

        // Add the flashcard to the users flashcard
        let CreateFlashcardsEntry = await db.collection('user').updateOne({'user':name},{$push:{flashcards:cardArray}})
    }




  }
  