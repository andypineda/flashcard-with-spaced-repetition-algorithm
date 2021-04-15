import { connectToDatabase } from "../util/mongodb"




export default async function GetBlocks(name){

    // Create a connection to mongodb 
    const {db} = await connectToDatabase();

    // Get the user data 
    let userColumns = []
    let userData = await db.collection('user').find({'user': name}).returnKey().forEach(key => userColumns.push(key));

    // Turn user data into json 
    let stringUserColumns = JSON.stringify(userColumns[0])
    let UserColumnsJson = JSON.parse(stringUserColumns)


    return UserColumnsJson
}