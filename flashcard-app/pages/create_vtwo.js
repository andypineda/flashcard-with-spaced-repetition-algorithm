import styles from '../styles/Home.module.css'
import create from '../styles/Create.module.css'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

import 'bulma/css/bulma.css'






export default function Create(){

    //Router to redirect user to pages 
	const router = useRouter()

    // Set the user name by getting the  name query from the url 
    let Name = router.query['name']
    
    // Set the selected answer 
    let [selected, setSelected ] = useState()

    // Reset hook for reseting question inputs 
    let [reset,setReset] = useState(0)


    // Track question count 
    let [questions, setQuestions] = useState(2)




    //  Display Add Another Question and Delete Question based off question count 
    useEffect(()=>{

        // Add button
        if(questions>1){
            document.getElementById('addQuestionButton').style.display = "hide"
        } else {
            document.getElementById('addQuestionButton').style.display = "flex"
        }


        // Delete button 
        if(questions > 2){
            document.getElementById('deleteLast').style.display = "flex"
        } else {
            document.getElementById('deleteLast').style.display = "none"
            document.getElementById('addQuestionButton').style.display = "flex"
        }



    })

    
    /* 
        Creates another entry box item to allow the user to enter another possible answer
        Max Questions allowed = 4 

        Limitations -> react does not support same name for radio buttons so a fix will need to be implemented 
    */ 

    function AddAnotherQuestion(){

        let newQuestionCount = questions + 1
        setQuestions(newQuestionCount)

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
            RadioButtonInput.name = "QuestionRadioButton"

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
        Deletes A question 

    */

    function DeleteQuestion(){

        console.log('Deleting')
        // Set the new question count 
        let newQuestionCount = questions - 1
        setQuestions(newQuestionCount)

        // Delete last question added 
        let AnswerBox = document.getElementById('answerInput');
        AnswerBox.removeChild(AnswerBox.lastElementChild);

    }



    /*

        Add flashcard to user in database based off their username query in the url 
        

    */

    function AddCard(){

        // Get the data from the flash card 
        let card = CreateFlashCard()
        
        // Creates the API url with the name as a query parms 
        let url = new URL('http://localhost:3000/api/addFlashcard')
        url.search = new URLSearchParams({
            name: Name
        })

        // Add the flashcard to the users flashcard array collection in the database
        fetch(url,{
            method:'POST',
            body: JSON.stringify({
                card,
            })
        }).catch(function (error){
			console.warn('Something went wrong adding the flashcard to the current user', error)
		})

        ClearCard()

        // refresh page 
        // this is only done to bypass the radio button React bug 
        // a better solution is to create a hook for the radio buttons but cause of time constraint this method was implemented
        router.push({ pathname: '/create_vtwo', query: { name: Name}})


    }






    /*

        Returns the create a flash card components back to its default layout

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



    }
    
        

    /*

        Takes the flashcard information and turns it into an array 
        ['Question','Answer Array','Answer','Date']

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

        

        return Card
    }



    function NextPage(){
        router.push({ pathname: '/setTimer', query: { name: Name}})
    }



    return(
        <>
            <section className="hero is-fullheight is-info">

                <div className="hero-head center">
                    <div className={`block ${styles.title}`}>
                        <Link href="https://flashcards-pineda.vercel.app/">
                            <p className="title">FLASHCARDS</p>
                        </Link>
                    </div>
                </div>

               {/* CREATE A FLASH CARD BODY PAGE  */}
               <div id="CreateFlashCards" className={`hero-body box center ${create.createBox}`}>

                    <div className="block">
                        <p className="subtitle has-text-black">Create Flashcard</p>
                    </div>


                    {/* ENTER QUESTION SECTION */}
                    <div className={`${create.questionContainer}`}>
                        <div class="field">
                            <div class="control">
                                <textarea id="textAreaQuestion" class="textarea is-large" placeholder="Enter your question" required></textarea>
                            </div>
                        </div>
                    </div>


                    {/* ENTER MULTIPLE CHOICE OPTION  */}
                    <div id="answerInput">


                        <div id="answer_box_1" className="control withRadioButton">
                            <div className="control RadioButtonBox">
                                <input id="question_1" className="control RadioButton" type="radio" name="QuestionRadioButton" />
                            </div>
                            <div className="control answers">
                                <input id="question_1_answer" class="input" type="text" placeholder="Enter an Answer" required></input>
                            </div>

                        </div>


                        <div id="answer_box_2" className="control withRadioButton">
                            <div className="control RadioButtonBox">
                                <input id="question_2" className="control RadioButton" type="radio" name="QuestionRadioButton"/>
                            </div>
                            <div className="control answers">
                                <input id="question_2_answer" class="input" type="text" placeholder="Enter an Answer" required></input>
                            </div>
                        </div>

                    </div>


                    {/* ADD ANOTHER QUESTION BUTTON */}
                    <div className="block addRemoveButtons">
                        <button id="addQuestionButton" class="button is-info is-light" onClick={AddAnotherQuestion}>Add Another Answer</button>
                        <button id="deleteLast" class="button is-danger is-light" onClick={DeleteQuestion} style={{marginLeft:'1em'}}>Delete Last Question</button>
                    </div>


                    {/* ADD AND REMOVE FLASHCARD BUTTON */}
                    <div>
                        <div class="buttons">
                            <button class="button is-primary" onClick={() => {AddCard()}} >Add Card</button>
                            <button class="button is-success" onClick={NextPage}>Next</button>
                        </div>
                    </div>
        

                </div>

                {/* FOOTER */}
                <div id="scorebox" className={`hero-body center ${create.createBox}`}>
                    <div id="scorenumber" className="box">
                    </div>

                </div>

                <div className="hero-foot center" style={{marginBottom:'1em'}}>
                    <a href="https://github.com/andypineda">
                        <p>GITHUB</p>
                    </a>
                </div>

            </section>
        </>
    )
}