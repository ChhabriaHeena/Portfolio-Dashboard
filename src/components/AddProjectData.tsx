import React, { useEffect, useState } from 'react'
import TechStack from './TechStack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

const AddProjectData = ({ updateData }: any) => {

  const [addData, setAddData] = useState(updateData ? updateData : {
    title: "",
    paragraph: "",
    paragraph2: "",
    image: "",
    tech: [""],
    link: "",
    github: "",
  });

  const [imgData, setImgData] = useState<any>(null);
  const [submitImg, setSubmitImg] = useState<any>(null);
  const [imgFile, setImgFile] = useState<any>(null);
  const [preview, setPreview] = useState<any>(updateData ? updateData?.image : null);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddData((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const postData = (event: any) => {

    setImgFile(event.target.files[0])
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    }
    reader.readAsDataURL(event.target.files[0]);
  }


  const handleSubmit = () => {

    if (imgFile) {

      const data = new FormData()
      data.append("file", imgFile)
      data.append("upload_preset", "Portfolio-Dashboard")
      data.append("cloud_name", "doo3ubgue")
      data.append("folder", "portfolio_images");
      fetch("https://api.cloudinary.com/v1_1/doo3ubgue/image/upload", {
        method: "POST",
        body: data
      })
        .then((res: any) => res.json())
        .then((data: any) => {

          setImgData(data)
          setAddData((prev: any) => ({
            ...prev,
            "image": data?.secure_url,
            "alt": imgFile?.name
          }))

          setSubmitImg(true)

        }
        )
        .catch((error: any) => console.error(error))

    } else if (updateData && addData?._id) {
      uploadData()
    } else {
      console.log("Upload File")
    }

  }

  useEffect(() => {
    if (submitImg) {
      uploadData()
    }

  }, [submitImg])


  const uploadData = () => {
    if (addData && !updateData && !updateData?._id) {
      fetch(`${import.meta.env.VITE_BASE_URL}/projectdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(addData)
      })
        .then((res: any) => res.json())
        .then((res: any) => console.log(res))
        .catch((error: any) => console.error(error))
    } else if (addData?._id && updateData?._id) {
      fetch(`${import.meta.env.VITE_BASE_URL}/${addData?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(addData)
      })
        .then((res: any) => res.json())
        .then((res: any) => console.log(res))
        .catch((error: any) => console.error(error))
    }
  }

  const handleCancel = () => {
    navigate('/');
  }

  return (

    <div>

      <div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={(event: any) => postData(event)}
            multiple
          />
        </Button>
        <div>
          <img src={preview} alt="" width={"20%"} />
        </div>
        {
          imgFile && <span> {imgFile?.name}</span>
        }
      </div>

      <div>
        <h3>
          Title:
        </h3>
        <TextField
          value={addData?.title} name="title" id="" placeholder='Title' onChange={((e: any) => handleChange(e))}
        />

      </div>

      <div>
        <h3>
          Project Info:
        </h3>
        <TextareaAutosize
          minRows={3}
          style={{width: 200}}
          value={addData?.paragraph} name="paragraph" id="" placeholder='paragraph' onChange={((e: any) => handleChange(e))}
        />
      </div>

      <div>
        <h3>Tech Array</h3>
        <TechStack addData={addData} setAddData={setAddData} />
      </div>
      <div>
        <h3>
          More Details:

        </h3>
        <TextareaAutosize
          minRows={3}
          style={{width: 200}}
          value={addData?.paragraph2} name="paragraph2" id="" placeholder='paragraph2' onChange={((e: any) => handleChange(e))}
        />
      </div>

      <div>
        <h3>
          Live Link:
        </h3>
        <TextField
          value={addData?.link} name="link" id="" placeholder='Live Link' onChange={((e: any) => handleChange(e))}
        />
        <h3>
          Source Code:
        </h3>
        <TextField
          value={addData?.github} name="github" id="" placeholder='GitHub Link' onChange={((e: any) => handleChange(e))}
        />
      </div>

      <div style={{marginTop: "30px"}}>
        <Button variant='contained' onClick={handleSubmit} style={{marginRight: "20px"}}>
          Submit
        </Button>
        <Button variant='contained' onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default AddProjectData
