import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Yoga from './pages/yoga';
import Exercise from './pages/exercise'
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import YogaList from './components/yoga/YogaList';
import YogaShow from './components/yoga/YogaShow';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<YogaList/>} />
                <Route path='/yoga/:id' exact element={<YogaShow/>} />
                <Route path='/yoga'  element={<Yoga/>} />
                <Route path='/exercise'  element={<Exercise/>} />
                <Route path='/sign-up' element={<SignUp/>} />
                <Route path='/sign-in' element={<SignIn/>} />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
