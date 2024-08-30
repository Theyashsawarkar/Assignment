import './App.css'
import Navbar from './components/Navbar'
import PageDetails from './components/PageDetails'
import UserDetails from './components/UserDetails'

function App() {

  return (
    <div className=' min-w-[50vw] min-h-[80vh] rounded-[5rem] mx-auto mt-[3rem] py-0 px-0 bg-gray-800'>
      <Navbar />
      <UserDetails />
      <PageDetails />
    </div>
  )
}

export default App
