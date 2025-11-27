import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddProjectData from './AddProjectData';

const UpdateProjectData = () => {

    const { id } = useParams();

    const [projectValues, setProjectValues] = useState<any>({});

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
            .then((data: any) => setProjectValues(data))
    }


    return (
        <div>
            {
                projectValues && projectValues?._id && (

                    <AddProjectData updateData={projectValues} />
                )
            }
        </div>
    )
}

export default UpdateProjectData
