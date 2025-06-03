import React, { useEffect, useState } from 'react'
import { Button, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import '../css/ArticleUpload.css'
import { schema } from '../schemas/ArticleUploadSchema'
import { useDispatch } from 'react-redux'
import { UploadArticle } from '../redux/slices/articleUploadSlice'

function ArticleUpload() {
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        alert('Sadece PDF dosyası yükleyebilirsin.')
        return
      }
      setFileName(selectedFile.name)
      setFile(selectedFile)
    }
  }


  const handleClearFile = () => {
    setFile(null);
    setFileName('');
  }

  const formClear = () => {
    setFile(null);
    setFileName('');
    setTitle('');
    setEmail('');
  }


  const handleSubmit = async () => {


    try {
      await schema.validate({ email, title }, { abortEarly: false })
      setErrors({})

      if (!file) {
        alert('PDF dosyası seçmen gerekiyor.')
        return
      }

      formClear();


      const data = new FormData()
      data.append('Title', title)
      data.append('WriterEmail', email)
      data.append('PDF', file)
      dispatch(UploadArticle(data))


    } catch (err) {
      const errObj = {}
      err.inner.forEach((e) => {
        errObj[e.path] = e.message
      })
      setErrors(errObj)
    }


  }

  return (
    <div className="article-upload-inputs">
      <div className="article-upload-div">

        <h3 className="a-u-h3">Makale Yükleme</h3>

        <TextField
          label="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="standard"
          size="small"
          sx={{ marginBottom: '5px' }}
          fullWidth
        />
        {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          size="small"
          sx={{ marginBottom: '5px', marginTop: '10px' }}
          fullWidth
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

        <div className="file-input" style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
          <Button variant="contained" component="label" sx={{ width: '120px', marginRight: '10px' }}>
            Dosya Seç
            <input type="file" hidden accept=".pdf" onChange={handleFileChange} />
          </Button>

          <TextField
            label="Seçilen Dosya"
            value={fileName}
            size="small"
            variant="standard"
            disabled
            sx={{ flexGrow: 1 }}
          />

          {fileName && (
            <IconButton onClick={handleClearFile}>
              <CloseIcon />
            </IconButton>
          )}
        </div>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ backgroundColor: 'rgb(27, 138, 36)', marginTop: '20px' }}
          onClick={handleSubmit}
        >
          Gönder
        </Button>
      </div>
    </div>
  )
}

export default ArticleUpload
