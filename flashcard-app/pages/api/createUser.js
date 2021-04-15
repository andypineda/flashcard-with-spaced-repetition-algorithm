import { Create } from "../../lib/createUser"



export default async function handler(req, res){

    try{
        //  Get the name query from the url 
        const name = req.query.name
    
        // Calls the database and creates a new user 
        // returns a boolean value  
        const DoesUserExist = await Create(name)
            
        res.send(true)
        
    }catch(err){
        console.log(err)
        res.send(false)
    }
  }
  