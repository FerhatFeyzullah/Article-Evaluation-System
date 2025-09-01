import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Log from './Log/Log'
import '../css/Log.css'


function LogList() {

    const dispatch = useDispatch();

    const { logs } = useSelector(store => store.log);
    return (
        <div>
            <div className='log-title'>
                Sistem Log Kayıtları
            </div>
            {
                logs && logs.map((log) => (
                    <Log key={log.logId} log={log} />
                ))
            }

        </div>
    )
}

export default LogList