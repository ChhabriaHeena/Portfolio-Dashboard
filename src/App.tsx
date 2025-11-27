import GetProjectData from './components/GetProjectData'
import AddProjectData from './components/AddProjectData'
import UpdateProjectData from './components/UpdateProjectData'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ViewProjectData from './components/ViewProjectData'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<GetProjectData />} />
          <Route path='/add' element={<AddProjectData />} />
          <Route path='update/:id' element={<UpdateProjectData />} />
          <Route path='view/:id' element={<ViewProjectData />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
