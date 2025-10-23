import './App.css'
import AddClient from './pages/AddClient.jsx';
import AddDevice from './pages/AddDevice.jsx';
import Login from './pages/Login.jsx'

function App() {

  return (
    <div className='w-full min-h-screen p-5 flex flex-col justify-center items-center gap-20 bg-gray-700'>
      <Login />
      <AddDevice />
      <AddClient />
    </div>
  );
}

export default App;
