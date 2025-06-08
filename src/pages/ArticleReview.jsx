import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedArticle } from '../redux/slices/judgeSlice';
import Navbar from '../components/Navbar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../css/Article.css';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ArticleReview() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { articleId } = useParams();

    const { articles, selectedArticle, judgeId } = useSelector(store => store.judge);
    const { articleStatus, title, writerEmail, reasonForEditing, fileName } = selectedArticle;

    useEffect(() => {
        if (articles && articleId) {
            const updated = articles.find(a => a.articleId == articleId);
            if (updated) {
                dispatch(setSelectedArticle(updated));
            }
        }
    }, [articles, articleId]);

    const [artState, setValue] = useState(false);
    const [editText, setEditText] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value === "true");
        setEditText("");

    };




    return (
        <div>
            <Navbar />
            <div>

                <div>
                    <Button variant='outlined' sx={{ textTransform: 'none', margin: '10px' }} onClick={() => navigate("/degerlendirici/" + judgeId)}>
                        TÜM MAKALELER
                    </Button>
                </div>




            </div>

            <div className='flex-column' >


                <div className='iframe'>
                    <iframe
                        src={`https://localhost:7247/api/articles/pdfView/${fileName}`}
                        width="800px"
                        height="800px"
                        style={{ border: '1px solid #ccc' }}
                        title="PDF Viewer"
                    ></iframe>
                </div>

                <div className='article-review-card'>
                    <div className='flex-row-review-card'>
                        <div>
                            <CardContent>
                                <Typography variant="h5" component="div">

                                    {title}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>

                                    Yazar: {writerEmail}
                                </Typography>


                            </CardContent>
                            <CardActions>
                                <Button size="small" variant='contained' color='primary' sx={{ textTransform: 'none' }}
                                > İNCELEMEYİ BİTİR</Button>
                            </CardActions>
                        </div>

                        <div>

                            {
                                artState ?

                                    <TextField variant='standard' multiline rows={5} sx={{ width: '300px' }} label='Düzenleme Gerekçesi'
                                        value={editText} onChange={(e) => setEditText(e.target.value)} />
                                    :
                                    <TextField variant='standard' multiline rows={5} sx={{ width: '300px' }} label='Düzenleme Gerekçesi' disabled
                                        value={editText} onChange={(e) => setEditText(e.target.value)}
                                    />


                            }




                            <FormControl>
                                <FormLabel>Durum</FormLabel>
                                <RadioGroup
                                    value={artState.toString()} // burada string olmalı çünkü MUI string value bekliyor
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Geçerli" />
                                    <FormControlLabel value="false" control={<Radio />} label="Geçersiz" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default ArticleReview