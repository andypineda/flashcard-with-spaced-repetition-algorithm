import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import create from '../styles/Create.module.css'
import Link from 'next/link'
import { useState } from "react"
import { Router, useRouter } from 'next/router'
import Head from 'next/head'



export default function SetTimer(){

    //Router to redirect user to pages 
	const router = useRouter()


    // Get the time for the quiz from the input fields
    function GetTime(){
        let Minutes = document.getElementById('minutes').value
        let Seconds = document.getElementById('seconds').value

        // Add a function to check input entry of user 
        // only allow positve integers between 1-12 for hours 
        // only allow positive integers between 0-60 for seconds 
        // only allow integer entries 
        // if hour and minutes is blank we can assume they want a timed second quiz 

        return [Minutes,Seconds]
    }


    // Sends the user to the start page for the flashcard quiz 
    function StartQuiz(){
        
        // Get the user input for the time 
        let time = GetTime()

        // Assign Times 
        let Minutes = time[0]
        let Seconds = time[1]

        // Set the user name by getting the  name query from the url 
        let Name = router.query['name']
        router.push({ pathname: '/start', query: { name: Name, minutes:Minutes, seconds:Seconds}})
    }

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
                </div>

                {/* SET THE TIMER BODY PAGE */}
                <div className={`hero-body box center`} style={{maxHeight:'300px',marginTop:'auto',marginBottom:'auto'}} >
                        

                    <div className="has-text-centered" style={{marginTop:'auto',marginBottom:'auto',width:'500px'}}>
                        <div className="block">
                            <p> Enter quiz time</p>
                            <p> For a 3 minute quiz enter 03:00</p>
                            <div style={{display:'felx',alignItems:"stretch"}}>
                                <input class="input"  id="minutes" placeholder="03" pattern="[0-9]{2}:[0-9]{2}" style={{width:'50px'}} required maxlength="2" />
                                    <strong style={{marginLeft:'0.5em',marginRight:'0.5em'}}>:</strong>
                                <input class="input"  id="seconds" placeholder="30" pattern="[0-9]{2}:[0-9]{2}" style={{width:'50px'}} required maxlength="2" />
                            </div>
                        </div>


                        <div className="block" style={{marginLeft:'43%'}}>
                            <div class="buttons">
                                <button class="button is-success" onClick={StartQuiz}>Start</button>
                            </div>
                        </div>

                    </div>


                </div>


            </section>



        </>
    )
}