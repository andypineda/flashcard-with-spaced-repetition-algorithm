import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import create from '../styles/Create.module.css'
import Link from 'next/link'

export default function Create(){

    //  Hold the flashcards created 
    let FlashCards = []
    


    /* 

        Grabs the information for create a flash card entry box and turns it into a card 
        then appends it to the collection of FlashCards

    */ 

    function CreateFlashCard(){

        console.log('Creating Card')
        let Card = [] // Array to hold current flascard information 

        // Gets the question for the flashcard 
        let question = document.getElementById("textAreaQuestion").value

        // Gets the count of how many possible answers were created by counting how many radio buttons are displayd in the DOM 
        let answerCount = document.querySelectorAll('input[type="radio"]').length

        // Display the question that is correct 
        let count = 1 
        let answer = "" // holds the correct answer for the question 
        while(count <= answerCount){

            let questionID = 'question_' + count.toString() 

            // Checks to see if the radio button is checked 
            if(document.getElementById(questionID).checked){
                
                // Gets the question that matches the radio button for the correct answer 
                let answerID = "question_"+count.toString()+"_answer"
                answer = document.getElementById(answerID).value // Assigns the answer to the answer variable 
            }

            count  += 1
        }



        // Gets all the questions 
        let answers = document.querySelectorAll('input[type="text"]')
        let inputQuestions = []

        // Turn the node data from answers and push the value into  the inputquestions array 
        for(let i = 0; i <= answers.length-1; i++){
            inputQuestions.push(answers[i]['value']); 
        }
      

        // Get the current date information 
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


        // Append the information to the card array 
        Card.push(question)
        Card.push(inputQuestions)
        Card.push(answer)
        Card.push(date)

        // Append it to collection of FlashCards 
        FlashCards.push(Card)


        // Clears entry information from flashcard 
        ClearCard()

    }




    /* 
        Creates another entry box item to allow the user to enter another possible answer
        Max Questions allowed = 4 

    */ 

    let questions = 2 // Default of how many answers allowed 
    function AddAnotherQuestion(){

        questions = questions + 1

        if(questions <= 4 ){

            // Creates the id's for each radio button box 
            let quesitonNumber = questions.toString()
            let questionName = 'question_' + quesitonNumber  // Track question count 

            // Creates the ID's for each text answer input box 
            let answerName = "question_"+quesitonNumber + "_answer"

            // Creates the answer div box id name 
            let answerBoxID = "answer_box_" + quesitonNumber

            //  Create the div box to hold the radio button and answer 
            let divWithRadioButtons = document.createElement('div')
            divWithRadioButtons.className = " control withRadioButton"
            divWithRadioButtons.id = answerBoxID

            // Create the div for the radio box 
            let RadioButtonBox = document.createElement('div')
            RadioButtonBox.className = " control RadioButtonBox "

            // Create radio button
            let RadioButtonInput = document.createElement('input')
            RadioButtonInput.type = 'radio'
            RadioButtonInput.id = questionName

            // Append radio button to RadioButtonBox 
            RadioButtonBox.appendChild(RadioButtonInput)




            // Create the div for the answer box 
            let AnswerBox = document.createElement('div')
            AnswerBox.className = "control answers"
            
            // Create a text input field for possible answer
            let input = document.createElement("input");
            input.type = "text";
            input.className = "input";
            input.placeholder = "Enter an Answer"
            input.id = answerName
            
            // Add the input field to the answer div container 
            AnswerBox.appendChild(input)




            // Stack all the elements 
            divWithRadioButtons.appendChild(RadioButtonBox)
            divWithRadioButtons.appendChild(AnswerBox)





            // Add the text input field to the questions box 
            document.getElementById('answerInput').appendChild(divWithRadioButtons)


            





            // Delete the button if 4 questions have been added 
            if(questions == 4) {

                // Delete the add question button after 4 questions have been added
                let addQuestionButton = document.getElementById('addQuestionButton');
                addQuestionButton.style.display = "none"
    
            }
        } 

    }






    /*

        Clears the entry info in create a flash card 

    */ 

    function ClearCard(){
        console.log('Clearing Card')

        // Clears the question textarea 
        let textArea = document.getElementById("textAreaQuestion")
        textArea.value = ""


        // Clears each question input 
        let answers = document.querySelectorAll('input[type="text"]')

        for(let i = 0; i <= answers.length-1; i++){
            answers[i]['value'] = ""


            // Deletes the last two input div answer boxes 
            if(i >= 2){
                let answerBoxId = "answer_box_" + i.toString()
                document.getElementById(answerBoxId).remove()
                questions = questions - 1 


            }
        }

       
        
        // Add the add question back to dashboard 
        if(answers.length > 1 ){
            let addQuestionButton = document.getElementById('addQuestionButton');
            addQuestionButton.style.display = "flex"
        }


    }








    return(
        <>
            <section className="hero is-fullheight is-info">
                <div className="hero-head center">
                    <div className={`block ${styles.title}`}>
                        <Link href="http://localhost:3000/">
                            <p className="title">FLASHCARDS</p>
                        </Link>
                    </div>
                </div>


                <div className={`hero-body box center ${create.createBox}`}>

                    <div className="block">
                        <p className="subtitle has-text-black">Create Flash Cards</p>
                    </div>


                    {/* ENTER QUESTION SECTION */}
                    <div className={`${create.questionContainer}`}>
                        <div class="field">
                            <div class="control">
                                <textarea id="textAreaQuestion" class="textarea is-large" placeholder="Enter your question"></textarea>
                            </div>
                        </div>
                    </div>


                    {/* ENTER MULTIPLE CHOICE OPTION  */}
                    <div id="answerInput">


                        <div id="answer_box_1" className="control withRadioButton">
                            <div className="control RadioButtonBox">
                                <input id="question_1" className="control RadioButton" type="radio"  defaultChecked={true} />
                            </div>
                            <div className="control answers">
                                <input id="question_1_answer" class="input" type="text" placeholder="Enter an Answer"></input>
                            </div>
                        </div>


                        <div id="answer_box_2" className="control withRadioButton">
                            <div className="control RadioButtonBox">
                                <input id="question_2" className="control RadioButton" type="radio"/>
                            </div>
                            <div className="control answers">
                                <input id="question_2_answer" class="input" type="text" placeholder="Enter an Answer"></input>
                            </div>
                        </div>

                    </div>
                    

                    {/* ADD ANOTHER QUESTION BUTTON */}
                    <div className="block">
                        <button id="addQuestionButton" class="button is-info is-light" onClick={AddAnotherQuestion}>Add Another Question</button>
                    </div>


                    {/* ADD AND REMOVE FLASHCARD BUTTON */}
                    <div>
                        <div class="buttons">
                            <button class="button is-primary" onClick={CreateFlashCard}>Add Card</button>
                            <button class="button is-danger">Delete Card</button>
                        </div>
                    </div>


                    {/* Flashcard Number */}
                    <div className={`${create.cardNumber}`}>
                        <p>6/7</p>
                    </div>


                </div>

                <div className="hero-foot center">
                    <p>Github</p>
                </div>
            </section>
        </>
    )
}