import 'bulma/css/bulma.css'
import 'chance'
import styles from '../styles/Home.module.css'
import create from '../styles/Create.module.css'
import Link from 'next/link'
import { useState } from "react"
import { Router, useRouter } from 'next/router'
import { useEffect } from "react"

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();



export default function Create(){

    // Reset hook for reseting question inputs 
    let [reset,setReset] = useState(0)

    // Flashcard counter 
    let [cardCounter,setCardCounter] = useState(0)

    // Hold all flashcards in array 
    let [FlashCards, setFlashCards ] = useState([])
    
    // Nextjs router to push to a next page
    const router = useRouter()



    // ------------  TIMERS -----------

    // Set the quiz start countdown for 10 seconds 
    // 1000 = 1 second 
    let [startCountDown, setStartCountDown] = useState(10)
    
    // Set the quiz time 
    let TotalQuizTime = 0
    


    // ------- Spaced Repetition ----------- 
    let blocks = [[],[],[],[],[]]
    blocks[0] = FlashCards

    let [score, setScore] = useState(0)












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
            console.log('ID IS', questionID)

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

        let cards = [Card]
        // Append it to collection of FlashCards 
        setFlashCards(flashcard => flashcard.concat(cards))

        // Clears entry information from flashcard 
        count = 0 
        ClearCard()

    }




    /* 
        Creates another entry box item to allow the user to enter another possible answer
        Max Questions allowed = 4 

    */ 

    let questions = 2 // Default of how many answers allowed 
    function AddAnotherQuestion(){

        questions = questions + 1 - reset

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

            // Delete all the input boxes including radio buttons 
            let x = i + 1
            let answerBoxId = "answer_box_" + x.toString()
            document.getElementById(answerBoxId).remove()
            questions = questions - 1 
        }
        


        // Create two new entry boxes 
        setReset(2)
        AddAnotherQuestion()
        setReset(1)
        AddAnotherQuestion()
        setReset(0)



        // Add the add question back to dashboard 
        if(answers.length > 1 ){
            let addQuestionButton = document.getElementById('addQuestionButton');
            addQuestionButton.style.display = "flex"
        }

        setCardCounter(cardCounter+1)

    }





    /*

        Displays the step the timer page 

    */

    function SetTimer(){
        document.getElementById('timer').style.display = "flex"
        document.getElementById('CreateFlashCards').style.display = "none"
    }





    // Set the quiz time 
    function ConvertQuizTime(){
        // Gets the quiz time 
        let quizTime = document.getElementById('quizTime').value

        // Covert time to milliseconds 
        let minutes = quizTime.split(':')[0]
        let seconds = quizTime.split(':')[1]

        let minutesToMilli = minutes * 60000
        let secondsToMilli = seconds * 1000 
        let time = minutesToMilli + secondsToMilli

        // Set the total time for quiz in milliseconds 
        TotalQuizTime = time
    }



    /* 
        START 
        Get all the flashcards and quiz time and start the flashcard learning 
    */

    function StartQuiz(){
        
        ConvertQuizTime()


        console.log('Starting Quiz')
        document.getElementById('timer').style.display = "none"
        document.getElementById("quizbox").style.display = "flex" // Show the flashcard quiz 

        // Start the quiz countdown 
        StartQuizCountDown()
    }



    /*

        Start the quiz countdown 
        Start a timer to let the user know that the quiz will begin in 10 seconds so they are fully prepared 

    */ 

    function StartQuizCountDown(){

        // Initiate clock at 10 seconds 
        let start = 10
        
        let startID = setInterval(function(){ 
            
            
            start = start - 1
            setStartCountDown(start)

            if(start == 0){
                clearInterval(startID)
                console.log('Timer Ended')
            }

        }, 1000);


        // Set the quiz time 
        PickQuestion()

    }



    // Choose box 
    function ChooseBox(){
        let randomBox = chance.weighted(['1', '2','3','4','5'], [50,26,14,7,3])
        return randomBox
    }


    // Random integer between 1 and array length 
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }



    // Pick a question and start time 
    function PickQuestion(){

        // picks a random block based off weighted numbers 
        let block = ChooseBox()



        // Get a question from one of the 5 levels of blocks 
        if(blocks[block].length != 0 ){
            // Do the rest of the work here 
            console.log('BLOCK NOT 0',blocks[block])

            // Access the questions in the block
            let BlockArray = blocks[block]

            console.log(BlockArray)

            let randomInt = getRndInteger(0,BlockArray.length -1) // Get a random question from 0 to the max amount of questions in the array
            let randomQuestion = BlockArray[randomInt] // Picks the random question 

            return [randomQuestion,block]


        } else {

            // Look for a block level that is not empty and show the result 
            for(let i=0; i < blocks.length; i++){
                if(blocks[i] != 0){

                    console.log('BLOCK WAS ZERO',)
                    // Access the questions in the block
                    let BlockArray = blocks[i]

                    console.log(BlockArray)


                    let randomInt = getRndInteger(0,BlockArray.length - 1) // Get a random question from 0 to the max amount of questions in the array
                    console.log('random is',randomInt)

                    let randomQuestion = BlockArray[randomInt]

                    return [randomQuestion,block]
                }
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



                {/* CREATE A FLASH CARD BODY PAGE  */}
                <div id="CreateFlashCards" className={`hero-body box center ${create.createBox}`}>

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
                                <input id="question_1" className="control RadioButton" type="radio" />
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
                            <button class="button is-success" onClick={SetTimer}>Next</button>
                        </div>
                    </div>


                    {/* Flashcard Number */}
                    <div className={`${create.cardNumber}`}>
                        <p>{`${cardCounter}/${cardCounter}`}</p>
                    </div>


                </div>






                {/* SET THE TIMER BODY PAGE */}
                <div id="timer" className={`hero-body box center ${create.createBox}`} >
                    

                    <div className="has-text-centered" style={{marginTop:'auto',marginBottom:'auto'}}>
                        <div className="block">
                            <p> Enter quiz time</p>
                            <p> For a 3 minute quiz enter 03:00</p>
                            <input class="input" type="tel" id="quizTime" placeholder="ex. 02:30" pattern="[0-9]{2}:[0-9]{2}" required />
                        </div>


                        <div className="block" style={{marginLeft:'35%'}}>
                            <div class="buttons">
                                <button class="button is-success" onClick={StartQuiz}>Start</button>
                            </div>
                        </div>

                    </div>


                </div>







                {/* START THE FLASHCARDS QUIZ */}
                <div id="quizbox" className={`hero-body box center ${create.createBox}`}>
                    {/* Counter */}
                    <div className="box" id="count_down_box">
                        <p className="title has-text-black">{startCountDown}</p>
                    </div>

                    <p>Ready</p>

                </div>



                <div className="hero-foot center">
                    <p>Github</p>
                </div>
            </section>
        </>
    )
}