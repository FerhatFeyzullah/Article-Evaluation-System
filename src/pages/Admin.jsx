import React from 'react'
import Navbar from '../components/Navbar'
import AdminArticleTable from '../components/AdminArticleTable'
import Drawer from '@mui/material/Drawer';
import MessageList from '../components/MessageList';
import { useDispatch, useSelector } from 'react-redux';
import { changeDrawer } from '../redux/slices/messageSlice';
import { changeLogDrawer } from '../redux/slices/logSlice';
import LogList from '../components/LogList';

function Admin() {

    const dispatch = useDispatch();
    const { messageDrawerOpen } = useSelector(store => store.message);
    const { logDrawerOpen } = useSelector(store => store.log);
    return (
        <div className='admin-main-div'>

            <Navbar />
            <AdminArticleTable />

            <Drawer open={messageDrawerOpen} anchor='right' PaperProps={{
                sx: {
                    backgroundColor: 'rgb(123, 128, 136)',

                },
            }}
                onClose={() => dispatch(changeDrawer())}>
                <MessageList />

            </Drawer>


            <Drawer open={logDrawerOpen} anchor='right' PaperProps={{
                sx: {
                    backgroundColor: 'rgb(123, 128, 136)',

                },
            }} onClose={() => dispatch(changeLogDrawer())}>


                <LogList />
            </Drawer>
        </div>
    )
}

export default Admin