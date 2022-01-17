import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";


function FeedbackForm({ addHandler }) {
    const [text, setText] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const [rating, setRating] = useState(5);

    const submitHandler = (event) => {
        event.preventDefault();

        if (text.trim().length > 10) {
            const newFeedback = {text, rating}
            addHandler(newFeedback)

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
