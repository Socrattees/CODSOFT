import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import SearchResults from './pages/searchResults/SearchResults';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/search-results" element={<SearchResults />} />
      </>
  ));

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
