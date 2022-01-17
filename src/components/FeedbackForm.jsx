import { useContext, useState, useEffect } from "react";

import FeedbackContext from "../context/FeedbackContext";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";


function FeedbackForm() {
    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    const [text, setText] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const [rating, setRating] = useState(5);

    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setIsDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit]);

    const submitHandler = (event) => {
        event.preventDefault();

        if (text.trim().length > 10) {
            const newFeedback = {text, rating}

            if (feedbackEdit.edit) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
            } else {
                addFeedback(newFeedback);
            }

            setText('');
        }
    }

    const changeHandler = (event) => {
        if (text === '') {
            setIsDisabled(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length <= 10) {
            setIsDisabled(true);
            setMessage('Text must be at least 10 character');
        } else {
            setIsDisabled(false)
            setMessage(null);
        }

        setText(event.target.value);
    }

    return (
        <Card>
            <form onSubmit={submitHandler}>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <h2>How are you rate our service?</h2>
                <div className="input-group">
                    <input onChange={changeHandler} value={text} type={`text`} placeholder={`Write a review`}/>
                    <Button type={`submit`} version={`primary`} isDisabled={isDisabled}>Send</Button>
                </div>

                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    );
}

export default FeedbackForm;
