import React from 'react';
import UsersTable from './Components/UserTable'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
    <>
        <UsersTable/>
        <ToastContainer/>
    </>
)
export default App;