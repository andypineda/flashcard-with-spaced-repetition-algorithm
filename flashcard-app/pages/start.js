import 'bulma/css/bulma.css'
import styles from '../styles/Home.module.css'
import create from '../styles/Create.module.css'
import { useState } from "react"
import { useRouter } from 'next/router'
import Head from 'next/head'
import Timer from 'react-compound-timer'





export default function Start(){
    
    //Router to redirect user to pages 
	const router = useRouter()

    // Assign query parms to values 
    let minutes =router.query['minutes']
    let seconds = router.query['seconds']
    let name = router.query['name']



    return(
        <>
            <p>Andy Pineda is Awesome</p>
            <Timer>
                <Timer.Days /> days
                <Timer.Hours /> hours
                <Timer.Minutes /> minutes
                <Timer.Seconds /> seconds
                <Timer.Milliseconds /> milliseconds
            </Timer>

        </>
    )
}