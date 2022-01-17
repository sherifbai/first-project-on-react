import FeedbackItems from "./FeedbackItems";
import { motion, AnimatePresence } from 'framer-motion'

function FeedbackList({ feedback, deleteFeedback }) {
    if (!feedback || feedback.length === 0) {
        return (
            <p>No feedback yet!!!</p>
        );
    }

    return (
        <div className="feedback-list">
            <AnimatePresence>
                {feedback.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FeedbackItems deleteFeedback={deleteFeedback} key={index} item={item}/>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default FeedbackList;
