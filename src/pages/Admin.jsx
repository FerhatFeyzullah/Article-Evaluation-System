import React from 'react'
import Navbar from '../components/Navbar'
import AdminArticleTable from '../components/AdminArticleTable'
import Drawer from '@mui/material/Drawer';
import MessageList from '../components/MessageList';
import { useDispatch, useSelector } from 'react-redux';
import { changeDrawer } from '../redux/slices/messageSlice';

function Admin() {

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector(store => store.message);
    return (
        <div className='admin-main-div'>

            <Navbar />
            <AdminArticleTable />

            <Drawer open={drawerOpen} anchor='right' PaperProps={{
                sx: {
                    backgroundColor: 'rgb(123, 128, 136)',

                },
            }}
                onClose={() => dispatch(changeDrawer())}>
                <MessageList />

            </Drawer>
        </div>
    )
}

export default Admin