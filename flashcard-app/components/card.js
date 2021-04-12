


export default function Card({questionText}){


    return(
        <>


            {/* ENTER QUESTION SECTION */}
            <div className={`${create.questionContainer}`}>
                <div class="field">
                    <div class="control">
                        <p className="subtitle">{questionText}</p>
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


        </>
    )
}