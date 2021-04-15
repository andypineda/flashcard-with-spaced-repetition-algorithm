import 'bulma/css/bulma.css'
import 'chance'
import styles from '../styles/Home.module.css'
import create from '../styles/Create.module.css'
import { useState } from "react"
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Timer from 'react-compound-timer'
import React from 'react'
import Flashcard from '../components/flashcard'

// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();




export default function Start({ time, flashcards, blocks }){
    
    //Router to redirect user to pages 
	const router = useRouter()

    // Start all the flashcards in the first block
    blocks[0] = flashcards

    // Hold the users flashcard quiz score 
    const [score,setScore] = useState(0)
    const [totalPossibleScore, setTotalPossibleScore] = useState(0)


    // Hold the current flashcard index and block number 
    const [blockNumber, setBlockNumber ] = useState(0)
    const [cardIndex, setCardIndex ] = useState(0)
 


    /*

        Time Assignment For each block 

    */
    const Time = {0:30000,1:25000,2:20000,3:15000,4:10000}



    
    // Handle Correct and Incorrect Answers and assign points 
    const HandlePoints = (answer,response) => {
        if(response == true){
            // Add two points to the users score and totalPossiblePoints 
            const newScore = score + 2
            const newTotalPossibleScore = totalPossibleScore + 2
            

            // Move Flashcard up a level 


            // Display alert showing user answer
            window.alert('You are correct. The answer is',answer)
        } else {
 

            if(score > 0){
                
                // Add two points to the users score and totalPossiblePoints 
                const newScore = score - 2
                const newTotalPossibleScore = totalPossibleScore + 2
              
            } else {
                // Display alert showing user answer
                window.alert('You are incorrect. The answer is',answer)
                const newTotalPossibleScore = totalPossibleScore + 2
            }


            if(blockNumber > 0){
                //  Move flashcard down a level 
            }
    }


    // If the user answers correctly
    const AnsweredCorrect = () =>{
        // Add two points to the users score and totalPossiblePoints 
        const newScore = score + 2
        const newTotalPossibleScore = totalPossibleScore + 2
        

        // Move Flashcard up a level 


        // Display alert showing user answer
        window.alert('You are correct. The answer is',answer)
    }

    
    // If the user answers incorrectly
    const AnsweredIncorrectly = () =>{
        
        if(score > 0){
                
            // Add two points to the users score and totalPossiblePoints 
            const newScore = score - 2
            const newTotalPossibleScore = totalPossibleScore + 2
          
        } else {
            // Display alert showing user answer
            window.alert('You are incorrect. The answer is',answer)
            const newTotalPossibleScore = totalPossibleScore + 2
        }


        if(blockNumber > 0){
            //  Move flashcard down a level 
        }
    }



    /*
        START QUIZ 

        Steps: 
            1. First we generate a random block number 
            2. Get a random flash card from the block 
            3. Prepare variables for flashcard component 
            4. Create the flashcard component and pass in variables 
            
    */          
    StartQuiz()
    function StartQuiz(){

        //  Step 1 - Generate a random block number using chance 
        let randomBlock = 0
        let blockHasCards = false
        while(blockHasCards != true){

            // Get a block number 
            let getNumber = ChooseBlock()
            // Check to see if the block has flashcards in it 
            if(blocks[getNumber].length > 0){
                randomBlock = getNumber
                blockHasCards = true
            }    
        }    

        

        // Step 2 - get a random flashcard from the block 
        let Block = blocks[randomBlock]
        let randomQuestionInt = getRndInteger(0,Block.length-1)
 

        // Step 3 - Prepare variables for flashcard component 
        let blockTime = Time[randomBlock]
        let RandomQuestion = Block[randomQuestionInt]
        console.log('random Question',Random)
        let question = RandomQuestion[0]
        let possibleAnswers = RandomQuestion[1]
        let answer = RandomQuestion[2]

        console.log(possibleAnswers)

        // Step 4 - create the flashcard component and pass in variables 
        card = <Flashcard question={question} possibleAnswers={possibleAnswers} answer={answer} time={blockTime} AnsweredCorrect={AnsweredCorrect} AnsweredIncorrectly={AnsweredIncorrectly} />


        // Step 5 - set the index and block number for the current card being presented 
        setBlockNumber(randomBlock)
        setCardIndex(randomQuestionInt)
    }    



    
    function PlaceFlashcard(placement){

        // If placement == true then we move the flashcard up a level 
        // If placement == false then we move the flashcard down a level 

        if(placement == true){

            // Copy the array to the next block level 
            if(currentBlock < 5 ){
                // Current flashcard
                const locationBlock = blocks[blockNumber]
                const currentFlashcard = locationBlock[cardIndex]
    
                // Move Flashcard up one level 
                const nextLevelBlock = blocks[blockNumber+1]
                nextLevelBlock.push(currentFlashcard)
    
                // Delete the flashcard first from it's current block 
                locationBlock.splice(cardIndex,1)
            }


        } else { 

            // Copy the array to on block level down
            if(currentBlock > 0 ){

                // Current flashcard
                const locationBlock = blocks[blockNumber]
                const currentFlashcard = locationBlock[cardIndex]
    
                // Move Flashcard down one level 
                const nextLevelBlock = blocks[blockNumber-1]
                nextLevelBlock.push(currentFlashcard)
    
                // Delete the flashcard first from it's current block 
                locationBlock.splice(cardIndex,1)
            }
        }
      
    }}






    /* Choose block using weighted chance 
        First Block -> 50%
        Second Block -> 26% 
        Third Block -> 14%
        Fourth Block -> 7% 
        Fifth Block -> 3%
    */
    function ChooseBlock(){
        let randomBlock = chance.weighted(['0', '1','2','3','4'], [50,26,14,7,3])
        return randomBlock
    }

    

    // Random integer between 0 and array length 
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }





    // Flashcard Component used to display current flashcard
    let first = blocks[0][0]
    let firstQuestion = first[0]
    let firstPossibleAnswers = first[1]
    let firstAnswer = first[2]
    let card = <Flashcard question={firstQuestion} possibleAnswers={firstPossibleAnswers} answer={firstPossibleAnswers}  time={time}  AnsweredCorrect={AnsweredCorrect} AnsweredIncorrectly={AnsweredIncorrectly}/>



    return(
        <>
            <Head>
                <title>FlashCards</title>
            </Head>


            <section className="hero is-fullheight is-info">
                    <div className="hero-head center">
                        <div className={`block ${styles.title}`}>
                            <Link href="https://flashcards-pineda.vercel.app/">
                                <p className="title">FLASHCARDS</p>
                            </Link>
                        </div>

                        <div className="box has-text-centered" id="count_down_box" style={{margin:"0 auto"}}>
                            <p>Time Remaining</p>
                            <div>
                                <Timer
                                    initialTime={time}
                                    direction="backward"
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


        


                {/*  FLASHCARDS  */}
                <div className={`hero-body box center ${create.createBox}`}>
                    {card}
                </div>



                <div className="hero-foot center">
                    <a href="https://github.com/andypineda">
                        <p>Github</p>
                    </a>
                </div>

            </section>                            
        </>
    )
}




export async function getServerSideProps({query}) {

    
    // Assign query parms to values 
    let minutes = query.minutes
    let seconds = query.seconds
    let TimeInMilli = (minutes * 60000) + (seconds * 1000)
    let name = query.name

    

    // Creates the API url with Query parms 
    let url = new URL('http://localhost:3000/api/getUserData')
    url.search = new URLSearchParams({
        name: name
    })

    // Get the users data from the database 
    const getData = await fetch(url)
    const Data = await getData.json()


    // Assign each column to its own variable 
    const flashcards = Data['flashcards']
    const blocks = Data['blocks']

    
    return {
      props: {
          time: TimeInMilli,
          flashcards: flashcards,
          blocks:blocks,
      }, // will be passed to the page component as props
    }
}
  