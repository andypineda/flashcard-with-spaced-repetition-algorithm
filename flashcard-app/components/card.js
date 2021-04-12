import create from '../styles/Create.module.css'


export default function FlashCardComponent({questionText}){


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
                        <input className="control RadioButton" type="radio" />
                    </div>
                    <div className="control answers">
                        <input class="input" type="text" placeholder="Enter an Answer"></input>
                    </div>
                </div>


                <div id="answer_box_2" className="control withRadioButton">
                    <div className="control RadioButtonBox">
                        <input className="control RadioButton" type="radio"/>
                    </div>
                    <div className="control answers">
                        <input  class="input" type="text" placeholder="Enter an Answer"></input>
                    </div>
                </div>

            </div>
            

            {/* ADD AND REMOVE FLASHCARD BUTTON */}
            <div>
                <div class="buttons">
                    <button class="button is-success">ANSWER</button>
                </div>
            </div>



        </>
    )
}