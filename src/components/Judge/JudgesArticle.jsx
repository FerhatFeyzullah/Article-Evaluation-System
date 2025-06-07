import React from 'react'
import '../../css/Article.css'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


function JudgesArticle({ article }) {

    const navigate = useNavigate();

    const { articleId, title, writerEmail, articleStatus } = article;
    return (

        <div className='article-card' style={{
            backgroundColor:
                articleStatus === null ? (
                    'rgba(51, 49, 50, 0.82)'
                ) : articleStatus === false ? (
                    'rgba(104, 8, 11, 0.82)'
                ) :
                    (
                        'rgba(11, 134, 29, 0.74)'
                    )

        }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {writerEmail}
                </Typography>
                {
                    articleStatus === null ? (
                        <Typography>
                            Makale Durumu: İncelenmeyi Bekliyor
                        </Typography>
                    ) : articleStatus === true ? (
                        <Typography>
                            Makale Durumu: Makale Onaylandı
                        </Typography>
                    ) : (
                        <Typography>
                            Makale Durumu: Makale Onaylanmadı
                        </Typography>

                    )
                }

            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' sx={{ backgroundColor: 'whitesmoke', color: 'black', textTransform: 'none' }}
                    onClick={() => navigate('/makale-degerlendirme/' + articleId)}>DEĞERLENDİRMEYE GİT</Button>
            </CardActions>
        </div>


    )
}

export default JudgesArticle