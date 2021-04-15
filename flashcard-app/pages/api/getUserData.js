import GetBlocks from "../../lib/getBlocks"



export default async function handler(req, res){

    //  Get the name query from the url 
    const name = req.query.name

    // Gets the user data from the database
    const data = await GetBlocks(name)
        
    res.send(data)
  }
  