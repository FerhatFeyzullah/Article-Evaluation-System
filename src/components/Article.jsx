import React from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import '../css/Article.css'

function Article({ article }) {

    const navigate = useNavigate();

    const { articleId, judgeStatus, title, writerEmail } = article;

    return (
        <div className='article-card' style={{ backgroundColor: judgeStatus ? 'rgba(11, 134, 29, 0.74)' : 'rgba(104, 8, 11, 0.82)' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {writerEmail}
                </Typography>
                {judgeStatus
                    ?
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        Hakem Atanmış
                    </Typography>
                    :
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        Hakem Ataması Bekliyor
                    </Typography>
                }

            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' sx={{ backgroundColor: 'whitesmoke', color: 'black', textTransform: 'none' }} onClick={() => navigate('/makale-detay/' + articleId)}>DETAYINA GİT</Button>
            </CardActions>
        </div>
    )
}

export default Article