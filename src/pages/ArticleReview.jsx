import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedArticle } from '../redux/slices/judgeSlice';
import Navbar from '../components/Navbar';
import { Button } from '@mui/material';

function ArticleReview() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { articleId } = useParams();

    const { articles, selectedArticle, judgeId } = useSelector(store => store.judge);
    const { articleStatus, title, writerEmail, reasonForEditing } = selectedArticle;

    useEffect(() => {
        if (articles && articleId) {
            const updated = articles.find(a => a.articleId == articleId);
            if (updated) {
                dispatch(setSelectedArticle(updated));
            }
        }
    }, [articles, articleId])

    return (
        <div>
            <Navbar />
            <div>
                <Button variant='outlined' sx={{ textTransform: 'none', margin: '10px' }} onClick={() => navigate("/degerlendirici/" + judgeId)}>
                    TÜM MAKALELER
                </Button>
                {title}
                {writerEmail}
            </div>

        </div>
    )
}

export default ArticleReview