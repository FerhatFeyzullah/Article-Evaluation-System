import React from 'react'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import '../css/Article.css'

function Article({ article }) {

    const navigate = useNavigate();

    const { articleId, judgeStatus, title, writerEmail, judge, articleStatus, fileName } = article;

    return (
        <div className='article-card' style={{
            backgroundColor: !judge
                ? 'rgba(230, 226, 10, 0.56)'
                : articleStatus === null
                    ? 'rgba(153, 69, 14, 0.56)'
                    : 'rgba(10, 102, 51, 0.63)'
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

                <Button
                    variant="contained"
                    color="primary"
                    href={`https://localhost:7247/api/articles/pdfDownload/${fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    size='small'
                >
                    PDF İndir
                </Button>

            </CardActions>
        </div>
    )
}

export default Article