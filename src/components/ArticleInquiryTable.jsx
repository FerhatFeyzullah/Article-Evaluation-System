import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

function ArticleInquiryTable({ tableOpen }) {

    const { article } = useSelector(store => store.articleInquiry)

    const { title, writerEmail, judgeStatus, judge, articleStatus, reasonForEditing } = article;


    // useEffect(() => {
    //     console.log(article)
    // }, [article])

    return (
        <div>
            {
                tableOpen &&

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
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">{title}</TableCell>
                                <TableCell align="center">{writerEmail}</TableCell>
                                {
                                    !judgeStatus ?
                                        <TableCell align="center">Hakem Ataması Bekliyor</TableCell>
                                        :
                                        <TableCell align="center">İnceleniyor</TableCell>
                                }
                                {
                                    !judge ?
                                        <TableCell align="center">Henüz Atanmadı</TableCell>
                                        :
                                        <TableCell align="center">{judge.firstName} {judge.lastName}</TableCell>
                                }
                                {
                                    !judge ?
                                        <TableCell align="center">Henün İncelenmedi</TableCell>
                                        :
                                        <TableCell align="center">İnceleniyor</TableCell>
                                }
                                {
                                    articleStatus ?
                                        <TableCell align="center"></TableCell>
                                        :
                                        <TableCell align="center">{reasonForEditing}</TableCell>
                                }

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    )
}

export default ArticleInquiryTable