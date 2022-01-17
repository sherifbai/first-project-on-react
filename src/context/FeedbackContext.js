import { createContext, useState } from 'react'

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'Yes, its normal',
            rating: 10
        }
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const addFeedback = (newFeedback) => {
        newFeedback.id = feedback[0] === undefined ? 1 : feedback[0].id + 1;
        setFeedback([newFeedback, ...feedback]);
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        });
    }

    const updateFeedback = (id, updatedItem) => {
        console.log(id, updatedItem);
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updatedItem} : item));
    }

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure about that')) {
            setFeedback(feedback.filter((item) => item.id !== id));
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