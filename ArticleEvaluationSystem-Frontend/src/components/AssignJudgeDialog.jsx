import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { assignJudgeDialogChange, AssignJudgeToArticle } from '../redux/slices/adminSlice';
import { MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AssignJudgeDialog({ articleId, onAssignComplete }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { assignJudgeDialog, judges } = useSelector(store => store.admin)

    const [hakemId, setHakemId] = useState(0);


    const Assign = async () => {
        const data = {
            articleId: articleId,
            judgeId: hakemId
        }
        await dispatch(AssignJudgeToArticle(data));
        dispatch(assignJudgeDialogChange());
        if (onAssignComplete) {
            onAssignComplete(); // yeni veriyi çek
        }
        navigate('/yonetici');
    }

    useEffect(() => {
        console.log(hakemId)
        console.log(articleId)

    }, [hakemId, articleId])

    return (
        <div>

            <Dialog
                open={assignJudgeDialog}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={() => dispatch(assignJudgeDialogChange())}
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle>{"Hakem Atama"}</DialogTitle>
                <DialogContent>
                    <TextField label='Hakemler' select variant='filled' sx={{ width: '400px' }} value={hakemId} onChange={(e) => setHakemId(e.target.value)} >
                        {
                            judges && judges.map((judge) => (
                                <MenuItem value={judge.id}>{judge.firstName} {judge.lastName}</MenuItem>
                            ))
                        }
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={Assign}>Ata</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AssignJudgeDialog