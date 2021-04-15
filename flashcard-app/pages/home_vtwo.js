import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'
















export default function Home(){



    async function Check(){
        // Gets the displayname from the user input field 
        const UserInput = document.getElementById("name").value 

        // Creates the API url with the name as a query parms 
        let url = new URL('http://localhost:3000/api/findUser')
        url.search = new URLSearchParams({
            name: UserInput
        })

        // Calls the API to see if user exist 
        const results = await fetch(url)
        .then(function(response) {
            return response.json()
        })
        .catch(function (error){
            console.warn('Something went wrong finding user name', error)
        })  

        return results
    }



    // Makes a GET request to the find user api 
    // to see if user exist already in database 
    async function DoesUserExist(){

        // Checks database to see if user exist 
        const results = await Check()

        //  Redirect the user depending if they exist or not 
        if(results == true){
            console.log('Useer Does Exist')
        } else {

            console.log('User Does Not Exist')

            // Removes any other error message 
            const PreviousMessage = document.getElementById("DoesExist")
            PreviousMessage.style.display = "none"

            //  Get user input table and create a red border 
            const PreviousUserInput = document.getElementById("name")
            PreviousUserInput.className = "input"

            
            //  Get user input table and create a red border 
            const UserInput = document.getElementById("name")
            UserInput.className = "input is-danger"

            // display error message for user 
            const message = document.getElementById("DoesNotExist")
            message.style.display = "flex"
        }

    }


    // Create a user in the database 
    async function CreateUser(){
        
        //  Checks to see if the user already exist in the database 
        const result = await Check()

        if(result != true){
            console.log('Creating user')
        } else { 

            // Removes any other error message 
            const PreviousMessage = document.getElementById("DoesNotExist")
            PreviousMessage.style.display = "none"

            //  Get user input table and create a red border 
            const PreviousUserInput = document.getElementById("name")
            PreviousUserInput.className = "input"


            //  Get user input table and create a red border 
            const UserInput = document.getElementById("name")
            UserInput.className = "input is-danger"

            // display error message for user 
            const message = document.getElementById("DoesExist")
            message.style.display = "flex"
        }
        
    }


    return(
        <>
            <Head>
                <title>FlashCards</title>
            </Head>
            <section className="hero is-fullheight is-info">
                <div className="hero-head center">
                    <div className={`block ${styles.title}`}>
                        <Link href="http://localhost:3000/home_vtwo">
                            <p className="title">FLASHCARDS</p>
                        </Link>
                    </div>
                </div>


                <div className={`hero-body box center ${styles.intro}`}>
                    <div className="block">
                        <p className="title has-text-black">Welcome</p>
                    </div>

                    <div className="block has-text-centered">
                        <p>
                            Spaced repetition is a technique for efficient memorization which uses repeated review of content following a 
                            schedule determined by a spaced repetition algorithm to improve long-term retention.
                        </p>
                    </div>

                    <div className="block">
                        <div className="block has-text-centered">
                            <p id="DoesNotExist" style={{color:"red"}}>user does not exist</p>
                            <p id="DoesExist" style={{color:"red"}} >user exist already, pick another name</p>
                            <input id="name" className="input" type="text" placeholder="ex. AndyPineda" />
                        </div>

                        <Link href="http://localhost:3000/home_vtwo">
                            <button className="button is-success" onClick={() => CreateUser()}>Create Flashcards</button>
                        </Link>

                        <Link href="http://localhost:3000/home_vtwo">
                            <button className="button is-info userButton" onClick={() => DoesUserExist()}>Find User</button>
                        </Link>
                    </div>    


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




