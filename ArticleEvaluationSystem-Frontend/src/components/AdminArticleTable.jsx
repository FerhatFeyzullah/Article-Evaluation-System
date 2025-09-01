import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetAllArticles } from '../redux/slices/adminSlice';
import { GetAllJudges } from '../redux/slices/adminSlice';
import Article from './Article';

function AdminArticleTable() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllArticles());
        dispatch(GetAllJudges());
    }, []);

    const { articles } = useSelector(store => store.admin);

    return (

        <div className='flex-row' style={{ flexWrap: 'wrap' }}>
            {
                articles && articles.map((article) => (
                    <Article key={article.id} article={article} />
                ))
            }
        </div>



    )
}


export default AdminArticleTable