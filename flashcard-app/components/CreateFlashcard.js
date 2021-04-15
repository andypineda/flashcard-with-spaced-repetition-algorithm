import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import create from '../styles/Create.module.css'
import Link from 'next/link'
import { useState } from "react"
import { Router, useRouter } from 'next/router'
import Head from 'next/head'



export default function CreateFlashCard(){


    return(
        <>
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
                        <input id="question_1" className="control RadioButton" type="radio" name="QuestionRadioButton" />
                    </div>
                    <div className="control answers">
                        <input id="question_1_answer" class="input" type="text" placeholder="Enter an Answer"></input>
                    </div>
                </div>


                <div id="answer_box_2" className="control withRadioButton">
                    <div className="control RadioButtonBox">
                        <input id="question_2" className="control RadioButton" type="radio" name="QuestionRadioButton"/>
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
    </>
    )
}