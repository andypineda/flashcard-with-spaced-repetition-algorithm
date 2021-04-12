import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import create from '../styles/Create.module.css'
import Link from 'next/link'

export default function Create(){

    //  Hold the flashcards created 
    let FlashCards = []
    


    /* 

        Takes the information from the flash card and appends it to the flashcard array 

    */ 

    function CreateFlashCard(){

        console.log('Creating Card')
        let Card = [] // Array to hold current flascard information 

        // Gets the question for the flashcard 
        let question = document.getElementById("textAreaQuestion").value
        console.log(question)

        // Gets the count of how many possible answers were created by counting how many radio buttons are displayd in the DOM 
        let answerCount = document.querySelectorAll('input[type="radio"]').length
        console.log(answerCount)


        // Display the question that is correct 
        let count = 1 
        let questionID = 'question_' + count 

        while(count <= answerCount){
            if(document.getElementById(questionID).checked === true){
                console.log(document.getElementById(questionID).value)
            }
            count  += 1
        }

        
        

        




        
    }








    /* 
        Creates another entry box item to allow the user to enter another possible answer
        Max Questions allowed = 4 

    */ 

    let questions = 2 // Default of how many answers allowed 
    function AddAnotherQuestion(){

        if(questions <= 4 ){


            let quesitonNumber = questions.toString
            let questionName = 'question_' + quesitonNumber  // Track question count 

            //  Create the div box to hold the radio button and answer 
            let divWithRadioButtons = document.createElement('div')
            divWithRadioButtons.className = " control withRadioButton"

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
            
            // Add the input field to the answer div container 
            AnswerBox.appendChild(input)




            // Stack all the elements 
            divWithRadioButtons.appendChild(RadioButtonBox)
            divWithRadioButtons.appendChild(AnswerBox)





            // Add the text input field to the questions box 
            document.getElementById('answerInput').appendChild(divWithRadioButtons)


            questions = questions + 1





            // Delete the button if 4 questions have been added 
            if(questions == 4) {

                // Delete the add question button after 4 questions have been added
                let addQuestionButton = document.getElementById('addQuestionButton');
                addQuestionButton.remove();
    
            }
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


                        <div className="control withRadioButton">
                            <div className="control RadioButtonBox">
                                <input id="question_1" type="radio" />
                            </div>
                            <div className="control answers">
                                <input class="input" type="text" placeholder="Enter an Answer"></input>
                            </div>
                        </div>


                        <div className="withRadioButton">
                            <div className="control RadioButtonBox">
                                <input id="question_2" className="control RadioButton" type="radio"/>
                            </div>
                            <div className="control answers">
                                <input class="input" type="text" placeholder="Enter an Answer"></input>
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