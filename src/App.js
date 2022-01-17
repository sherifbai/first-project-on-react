import {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import "./index.css";
import FeedbackData from "./data/FeedbackData";

import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutLink from "./components/shared/AboutLink";

import AboutPage from "./pages/AboutPage";

function App() {
    const [feedback, setFeedback] = useState(FeedbackData)

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure about that')) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    const addFeedback = (newFeedback) => {
        setFeedback([newFeedback, ...feedback]);
    }

    return (
        <Router>
            <Header text="Feedback UI"/>
            <div className="container">
                <Routes>
                    <Route path={`/`} element={
                        <>
                            <FeedbackForm addHandler={addFeedback}/>
                            <FeedbackStats feedback={feedback}/>
                            <FeedbackList deleteFeedback={deleteFeedback} feedback={feedback}/>
                        </>
                    }/>
                    <Route path='/about' element={<AboutPage/>}/>
                </Routes>
                <AboutLink/>
            </div>
        </Router>
    );
}

export default App;
