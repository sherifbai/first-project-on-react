import {createContext, useEffect, useState} from 'react'
import axios  from "axios";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([]);


    useEffect(() => {
        getFeedbacks().then();
    }, [])

    const getFeedbacks = async () => {
        const response = await axios.get('http://localhost:5000/api/feedback', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setFeedback(response.data.feedbacks);
    }

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const addFeedback = async (newFeedback) => {
        const response = await axios.post('http://localhost:5000/api/feedback', {...newFeedback}, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await setFeedback([response.data.feedback, ...feedback]);
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        });
    }

    const updateFeedback = async (id, updatedItem) => {
        await axios.put(`http://localhost:5000/api/feedback/${id}`, {...updatedItem}, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: { id }
        })
        setFeedback(feedback.map((item) => item._id === id ? {...item, ...updatedItem} : item));
    }

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure about that')) {
            await axios.delete(`http://localhost:5000/api/feedback/${id}`, {
                params: { id }
            }).then((res) => console.log(res));
            setFeedback(feedback.filter((item) => item._id !== id));
        }
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            addFeedback,
            deleteFeedback,
            editFeedback,
            updateFeedback
        }}>
            { children }
        </FeedbackContext.Provider>
    );
}

export default FeedbackContext;