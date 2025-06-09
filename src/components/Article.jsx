import React from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import '../css/Article.css'

function Article({ article }) {

    const navigate = useNavigate();

    const { articleId, judgeStatus, title, writerEmail, judge, articleStatus } = article;

    return (
        <div className='article-card' style={{
            backgroundColor: !judge
                ? 'rgb(51, 37, 37)'
                : articleStatus === null
                    ? 'rgb(8, 46, 104)'
                    : 'rgb(8, 104, 51)'
        }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {writerEmail}
                </Typography>
                <Typography>
                    {
                        !judge
                            ? "Hakem Ataması Bekleniyor"
                            : articleStatus === null
                                ? "İnceleniyor"
                                : "Değerlendirme Tamamlandı"
                    }
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' sx={{ backgroundColor: 'whitesmoke', color: 'black', textTransform: 'none' }} onClick={() => navigate('/makale-detay/' + articleId)}>DETAYINA GİT</Button>
            </CardActions>
        </div>
    )
}

export default Article