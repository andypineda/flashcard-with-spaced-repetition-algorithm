import 'bulma/css/bulma.css'
import create from '../styles/Create.module.css'
import Timer from 'react-compound-timer'
import React from 'react'
import { useEffect, useState } from "react"










export default function Flashcard({question, possibleAnswers, answer, time,  AnsweredCorrect, AnsweredIncorrectly}){

    // Save the users selected answer 
    const [selected,setSelected] = useState("")
    const [buttonID,setButtonID] = useState("")


    // Submit answer
    function SubmitAnswer(){
        if(answer === selected){
            AnsweredCorrect
        } else{
            AnsweredIncorrectly
        }
    }



    function Selected(userChoice,index){
        
        // Reset previous button choice 
        if(selected == ""){

            // Set the choice selected by the user
            setSelected(userChoice)

            // UpdateButton
            let ID = "answer"+String(index)
            setButtonID(ID)
            document.getElementById(ID).innerHTML = "X"


        } else {

            document.getElementById(buttonID).innerHTML = ""

            // Set the choice selected by the user
            setSelected(userChoice)

            let ID = "answer"+String(index)
            setButtonID(ID)

            document.getElementById(ID).innerHTML = "X"

        }

    }


    // Submit answer if user does not answer within time limit 
    setTimeout(function() { 
        setSelected('?/1.231we21rt')
        SubmitAnswer(); 
    }, time);



    return(
        <>
            
            <div id="NewCard">

                {/* ENTER QUESTION SECTION */}
                <div className={`${create.questionContainer}`}>
                    <div class="field">
                        <div class="control">
                            <div className="has-text-centered" id="count_down_box" style={{margin:"0 auto"}}>
                                    <div>
                                        <Timer
                                            initialTime={time}
                                            direction="backward"
                                            onStart ={()=>{console.log('its time?')}}
                                        >
                                            {() => (
                                                <React.Fragment>
                                                    <Timer.Minutes />: 
                                                    <Timer.Seconds />
                                                </React.Fragment>
                                            )}
                                        </Timer>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div id="quizAnswerInput">
                          
                    <div className={`${create.questionContainer}`} style={{marginTop:'1em'}}>
                        <div class="field">
                            <div class="control">
                                <p className="title has-text-black">{question}</p>
                            </div>
                        </div>
                    </div>


                        {/* ENTER MULTIPLE CHOICE OPTION  */}
                        <div id="answerInput" style={{marginTop:'1em', marginBottom:'1em'}}>

                            {possibleAnswers != undefined && 
                                possibleAnswers.map((answer,index) =>{

                                if(answer != "" ){
                                    
                                    return(
                                        
                                        <div className="control withRadioButton">
                                            <div className="control RadioButtonBox" style={{marginTop:'.5em'}}>
                                               <button className="button is-small is-round" id={`answer${index}`} onClick={() => { Selected(answer,index)}} style={{width:'33px',height:"30"}}></button>
                                            </div>
                                            <div className="control answers" style={{ marginLeft:"1em"}}>
                                                <p>{answer}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>


                        {/* Submit */}
                        <div className="block">
                            <button class="button is-success is-light" onClick={SubmitAnswer}>Answer</button>
                        </div>


                </div>
            </div>
        </>
    )
}