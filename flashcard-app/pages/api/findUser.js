import { Find } from "../../lib/findUser"



export default async function handler(req, res){

    //  Get the name query from the url 
    const name = req.query.name

    // Calls the database and checks to see if the user exist 
    // returns a boolean value  
    const DoesUserExist = await Find(name)
        
    res.send(DoesUserExist)
  }
  