import React from 'react'
import Navbar from '../components/Navbar'
import JudgeArticleTable from '../components/Judge/JudgeArticleTable'
import { useParams } from 'react-router-dom'

function Judge() {

    const { judgeId } = useParams();
    console.log(judgeId)
    return (
        <div className='judge-main-div'>
            <Navbar />
            <JudgeArticleTable judgeId={judgeId} />



        </div>
    )
}

export default Judge