import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetArticlesForJudge } from '../../redux/slices/judgeSlice'
import JudgesArticle from './JudgesArticle';
import { useEffect } from 'react';

function JudgeArticleTable({ judgeId }) {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(GetArticlesForJudge(judgeId))

    }, []);

    const { articles } = useSelector(store => store.judge)

    return (
        <div className='flex-row' style={{ flexWrap: 'wrap' }}>

            {
                articles && articles.map((article) => (
                    <JudgesArticle key={article.id} article={article} />
                ))
            }
        </div>
    )
}

export default JudgeArticleTable