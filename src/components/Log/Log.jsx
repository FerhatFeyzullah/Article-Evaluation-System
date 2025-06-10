import React from 'react'
import '../../css/Log.css'

function Log({ log }) {

    const { event, userEmail, createdAt, extraData } = log;


    return (
        <div className="l-flex-row" style={{ width: '700px' }}>

            <div className='l-info'>
                İşlem: {event}
            </div>
            <div className='l-info'>
                Yazar Email: {(userEmail) && userEmail}
            </div>
            <div className='l-info'>
                Tarih: {new Date(createdAt).toLocaleString('tr-TR')}
            </div>


            <div className='l-info'>
                Ekstra Bilgi: {(extraData) && extraData}
            </div>


        </div>
    )
}

export default Log