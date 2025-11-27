import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const GetProjectData = () => {

    const navigate = useNavigate();
    const [getData, setGetData] = useState<any>();

    useEffect(() => {
        postData()

    }, [])

    const postData = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}/projectdata`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res: any) => res.json())
            .then((data: any) => setGetData(data))
    }

    const handleDelete = (id: any) => {

        if (getData) {
            fetch(`${import.meta.env.VITE_BASE_URL}/projectdata/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res: any) => res.json())
                .then((data: any) => postData())
        }

    }

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Project Title', width: 200 },
        { field: 'paragraph', headerName: 'Description', width: 380 },
        { field: 'tech', headerName: 'Tech Stack', width: 250, valueGetter: (value: any) => value.join(', ') },
        {
            field: 'link',
            headerName: 'Live Link',
            width: 150,
            renderCell: (params) => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">Live</a>
            )
        },
        {
            field: 'github',
            headerName: 'Source Code',
            width: 150,
            renderCell: (params) => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">GitHub</a>
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params: any) => (
                <>
                    <IconButton onClick={() => navigate(`view/${params?.row?._id}`)} aria-label="view">
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => navigate(`update/${params?.row?._id}`)} aria-label="update">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params?.row?._id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];


    const paginationModel = { page: 0, pageSize: 5 };


    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>

                <IconButton onClick={() => navigate(`add`)} aria-label="view">
                    <AddIcon /> Add
                </IconButton>
            </div>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={getData}
                    getRowId={(row) => row._id}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>


        </div>
    )
}

export default GetProjectData
