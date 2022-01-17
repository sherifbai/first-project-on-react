import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import "./index.css";

import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutLink from "./components/shared/AboutLink";

import {FeedbackProvider} from "./context/FeedbackContext";

import AboutPage from "./pages/AboutPage";

function App() {
    return (
        <FeedbackProvider>
            <Router>
                <Header text="Feedback UI"/>
                <div className="container">
                    <Routes>
                        <Route path={`/`} element={
                            <>
                                <FeedbackForm />
                                <FeedbackStats />
                                <FeedbackList />
                            </>
                        }/>
                        <Route path='/about' element={<AboutPage/>}/>
                    </Routes>
                    <AboutLink/>
                </div>
            </Router>
        </FeedbackProvider>
    );
}

export default App;
