import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'

export default function Home(){

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
                        <div className="block">
                            <input className="input" type="text" placeholder="ex. AndyPineda" />
                        </div>

                        <Link href="http://localhost:3000/home_vtwo">
                            <button className="button is-success">Create Flashcards</button>
                        </Link>

                        <Link href="http://localhost:3000/home_vtwo">
                            <button className="button is-info userButton">Find User</button>
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




