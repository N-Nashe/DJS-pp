import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ShowDetails from './pages/ShowDetails'
import './general styles/styles.css'
import './general styles/theme.css'

function App() {
return(
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/show/:id" element={<ShowDetails />} />
  </Routes>
)
}


export default App
