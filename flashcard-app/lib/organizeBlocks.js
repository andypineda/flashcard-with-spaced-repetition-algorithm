
function RemoveEmptyQandA(flashcards){


    //  Find all questions with an empty string
    const EmptyQuestionsLocations = flashcards.map((card,index) =>{
        
        // Check for missing data
        const question = card[0]
        if(question === ""){
            return index 
        }
    })

    // remove all empty questions  
    for(let i=0; i <= EmptyQuestionsLocations.length; i++){
        flashcards.splice(EmptyQuestionsLocations[i], 1);
    }




    // Find all answers with an empty string 
    const EmptyAnswerLocations = flashcards.map((card,index) =>{
        
        // Check for missing data
        const answer = card[3]
        if(answer === ""){
            return index 
        }
    })

    // remove all empty answers
    for(let i=0; i <= EmptyAnswerLocations.length; i++){
        flashcards.splice(EmptyAnswerLocations[i], 1);
    }

    
    



    return flashcards
}


export default function Organize(flashcards,blocks){

    // Remove all empty questions and answer flashcards 
    
    
}