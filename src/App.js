import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import FindRidePage from './components/FindRidePage';
import OfferRidePage from './components/OfferRidePage';
import ListOfRidesPage from './components/ListOfRidesPage';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/find-rides" element={<FindRidePage />} />
            <Route path="/listofrides" element={<ListOfRidesPage />} />
            <Route path="/offers" element={<OfferRidePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
      </Router>
    </div>
  );
}

export default App;