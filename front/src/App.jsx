import Home from "./views/Home/Home"
import MyBookings from "./views/MyBookings/MyBookings"
// import Footer from "./components/Footer/Footer"
import "./App.css"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myBookings" element={<MyBookings />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
