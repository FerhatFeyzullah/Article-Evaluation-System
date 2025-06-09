import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { assignJudgeDialogChange, GetArticleById, setSelectedArticle } from '../redux/slices/adminSlice';
import '../css/ArticleDetails.css'
import AssignJudgeDialog from '../components/AssignJudgeDialog';
import Navbar from '../components/Navbar';

function ArticleDetails() {

    const dispatch = useDispatch();
    const { articleId } = useParams();
    const navigate = useNavigate();

    const { articles, selectedArticle } = useSelector(store => store.admin);
    const { articleStatus, judgeStatus, judge, title, writerEmail, reasonForEditing } = selectedArticle;

    useEffect(() => {
        if (articles && articleId) {
            const updated = articles.find(a => a.articleId == articleId);
            if (updated) {
                dispatch(setSelectedArticle(updated));
            }
        }
    }, [articles, articleId]);





    return (
        <div>
            <Navbar />
            <div>
                <Button variant='outlined' sx={{ textTransform: 'none', margin: '10px' }} onClick={() => navigate('/yonetici')}>
                    TÜM MAKALELER
                </Button>
            </div>

            <div className='flex-row' style={{ height: '100vh' }}>
                <div className='article-detail-card'>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <br />
                        <Typography >
                            Makale Sahibi Email: {writerEmail}
                        </Typography>
                        <br />
                        <Typography>
                            Makaleyi Değerlendiren Hakem: {judgeStatus ? `${judge.firstName} ${judge.lastName}` : ""}
                        </Typography>

                        <br />
                        <Typography>
                            {
                                !judge
                                    ? "Güncel Durum: Hakem Ataması Bekleniyor"
                                    : articleStatus === null
                                        ? "Güncel Durum: İnceleniyor"
                                        : "Güncel Durum: Değerlendirme Tamamlandı"
                            }
                        </Typography>

                        <br />
                        <Typography>
                            {
                                articleStatus === null
                                    ? "Makale Durumu: Hakem Değerlendirmesi Devam Ediyor"
                                    : articleStatus === true
                                        ? "Makale Durumu: Makale Onaylandı"
                                        : "Makale Durumu: Makale Onaylanmadı"
                            }
                        </Typography>

                        <br />
                        {
                            articleStatus === false &&
                            (

                                <Typography>
                                    Gerekçe: {reasonForEditing}
                                </Typography>
                            )
                        }


                    </CardContent>
                    <CardActions>

                        <Button size="medium" variant='outlined' onClick={() => dispatch(assignJudgeDialogChange())}>Hakem Ata</Button>
                    </CardActions>
                </div>
                <AssignJudgeDialog articleId={articleId} onAssignComplete={() => {
                    dispatch(GetArticleById(articleId));
                }} />
            </div>
        </div>


    )
}

export default ArticleDetails