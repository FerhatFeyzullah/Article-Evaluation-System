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
        <div className='article-card'>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {title}
                </Typography>
                <Typography variant="h5" component="div">
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
                <Button size="small" onClick={() => navigate('/makale-detay/' + articleId)}>Detayına Git</Button>
            </CardActions>
        </div>
    )
}

export default Article