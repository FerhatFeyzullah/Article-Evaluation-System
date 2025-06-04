import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllArticles } from '../redux/slices/adminSlice';
import { GetAllJudges } from '../redux/slices/adminSlice';

function AdminArticleTable() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllArticles());
        dispatch(GetAllJudges());

    }, [])

    const { articles, judges } = useSelector(store => store.admin)
    const { judge, setJudge } = useState(0);

    useEffect(() => {

        console.log(articles, judges)
    }, [articles, judges])

    const handleChange = (event) => {
        setJudge(event.target.value);
    }
    return (
        <div>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Başlık</TableCell>
                            <TableCell align="center">Yazar Email</TableCell>
                            <TableCell align="center">Makale Durumu</TableCell>
                            <TableCell align="center">Hakem</TableCell>
                            <TableCell align="center">İnceleme Sonucu</TableCell>
                            <TableCell align="center">Düzenleme Sebebi</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        articles && articles.map((article) => (
                            <TableBody key={article.Id}>
                                <TableRow>
                                    <TableCell align="left">{article.title}</TableCell>
                                    <TableCell align="center">{article.writerEmail}</TableCell>
                                    <TableCell align="center">{article.judgeStatus}</TableCell>

                                    <TableCell align="center">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Hakem</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={judge}
                                                label="Hakem"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Ali</MenuItem>
                                                <MenuItem value={20}>Veli</MenuItem>
                                                <MenuItem value={30}>Konya</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>

                                    <TableCell align="center">{article.articleStatus}</TableCell>
                                    <TableCell align="center">{article.reasonForEditing}</TableCell>


                                </TableRow>
                            </TableBody>
                        ))
                    }

                </Table>
            </TableContainer>
        </div>
    )

}

export default AdminArticleTable