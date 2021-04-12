import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home(){

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
                        <Link href="http://localhost:3000/create">
                            <button class="button is-success">Create Flashcards</button>
                        </Link>
                    </div>                          
                </div>

                <div className="hero-foot center">
                    <p>Github</p>
                </div>
            </section>
        </>
    )
}




