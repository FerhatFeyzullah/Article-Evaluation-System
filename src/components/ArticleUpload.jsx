import React from 'react'
import { Button, TextField, IconButton, InputAdornment } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import '../css/ArticleUpload.css'

function ArticleUpload() {
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleClear = () => {
    setFileName('')
  }
  return (

    <div className='article-upload-inputs'>

      <div className='article-upload-div'>
        <div>
          <TextField label="Başlık" variant='outlined' size='small' sx={{ marginBottom: '10px' }} />
        </div>
        <div>
          <TextField label="Email" variant='outlined' size='small' sx={{ marginBottom: '10px' }} />
        </div>

        <div className='file-input'>
          <div>
            <Button
              variant="contained"
              component="label"
              sx={{ marginRight: '10px' }}
            >
              Dosya Seç
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </div>

          <div>
            <TextField
              label="Seçilen Dosya"
              value={fileName}
              defaultValue="Small"
              size="small"
              disabled

            />
          </div>
          <div>
            <IconButton onClick={handleClear}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>



    </div>
  )


}

export default ArticleUpload