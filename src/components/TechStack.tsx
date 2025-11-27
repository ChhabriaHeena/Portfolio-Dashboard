import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const TechStack = ({ addData, setAddData, mode }: any) => {

    const handleChangeTech = (index: any, e: any) => {

        const updatedTech = [...addData?.tech];
        updatedTech[index] = e.target.value;
        setAddData({ ...addData, tech: updatedTech })
    }

    const handleRemoveTech = (index: any) => {
        const updatedTech = addData?.tech.filter((_: any, i: number) => i !== index)
        setAddData({ ...addData, tech: updatedTech })
    }

    const handleAddTech = () => {
        setAddData({ ...addData, tech: [...addData.tech, ''] })
    }


    return (
        <div>
            {
                addData && addData?.tech.map((tech: any, index: number) => (
                    <>

                        {
                            mode === "view" ? (
                                <p>{tech}</p>
                            ) :
                                <div>
                                    <IconButton aria-label="close" onClick={() => handleRemoveTech(index)}>
                                        <CloseIcon />
                                    </IconButton>

                                    <input type="text" name="" id="" placeholder='Tech' value={tech} onChange={((e: any) => handleChangeTech(index, e))} required />
                                    <IconButton aria-label="add" onClick={handleAddTech}>
                                        <AddIcon />
                                    </IconButton>
                                </div>

                        }

                    </>
                ))
            }
        </div>
    )
}

export default TechStack
