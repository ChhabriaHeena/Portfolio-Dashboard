import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import TechStack from './TechStack';

const ViewProjectData = () => {

    const { id } = useParams();

    const [addData, setAddData] = useState({
        title: "",
        paragraph: "",
        paragraph2: "",
        image: "",
        tech: [""],
        link: "",
        github: "",
        _id: "",
        alt: ""
    });

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            postData()
        }

    }, [id])

    const postData = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}/projectdata/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res: any) => res.json())
            .then((data: any) => setAddData(data))
    }

    return (
        <div>
            {
                addData && addData?._id && (

                    <>

                        <div>

                            <div>
                                {addData && addData?.image && (
                                    <img src={addData?.image} alt={addData?.alt} width="200px" height="auto" />
                                )}
                            </div>

                            <div>
                                <h3>
                                    Title:
                                </h3>
                                <p>{addData?.title}</p>
                            </div>

                            <div>
                                <h3>
                                    Project Info:
                                </h3>
                                <p>{addData?.paragraph}</p>
                            </div>

                            <div>
                                <h3>Tech Array</h3>
                                <TechStack addData={addData} setAddData={setAddData} mode="view" />
                            </div>
                            <div>
                                <h3>
                                    More Details:
                                </h3>
                                <p>{addData?.paragraph2}</p>
                            </div>

                            <div>
                                <h3>
                                    Live Link:
                                </h3>
                                <p>{addData?.link}</p>
                                <h3>
                                    Source Code:
                                </h3>
                                <p>{addData?.github}</p>
                            </div>

                            <div style={{ marginTop: "20px" }}>
                                <Button variant='contained' onClick={() => navigate(`/update/${addData?._id}`)} style={{ marginRight: "20px" }}>
                                    Update
                                </Button>
                                <Button variant='contained' onClick={() => navigate("/")}>
                                    Exit
                                </Button>
                            </div>
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default ViewProjectData
