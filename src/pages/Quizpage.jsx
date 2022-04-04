import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Quiz from '../components/Quiz';

function Quizpage() {
    const [quiz, setQuiz] = useState([]);
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        const api = await fetch('https://opentdb.com/api.php?amount=5');
        const data = await api.json();
    
        const finalData = data.results.map(result => {
            return {
                id: nanoid(),
                question: result.question,

                answers: [...result.incorrect_answers, result.correct_answer].sort(function(){ return Math.random() - 0.5}).map(answer => {
                    return {
                        value: answer,
                        id: nanoid(),
                        isHeld: false,
                        isCorrect: false,
                        correct_answer: result.correct_answer,
                    }
                }),
            }
        })
        setQuiz(finalData);
    }

    const holdAnswer = (id) => {

        setQuiz(prevState => prevState.map(quiz => {
            return {
                question: quiz.question,
                answers: quiz.answers.map(answer => answer.id === id ? { ...answer, isHeld: !answer.isHeld } : answer)
            }
        }))
        
    }


    const checkAnswer = () => {
        setQuiz(prevState => prevState.map(quiz => {
            return {
                question: quiz.question,
                answers: quiz.answers.map(answer => answer.isHeld && answer.value === answer.correct_answer ? { ...answer, isCorrect: true } : answer)
            }
        }))

        setIsOver(true);
    }

    const playAgain = () => {
        setIsOver(false);
        fetchQuiz();
    }

    const numCorrectAns = quiz.map(q => q.answers.filter(ans => ans.isCorrect)).filter(a => a.length > 0).length;

    const quizzes = quiz.map(quiz => {
        return <Quiz
            key={quiz.id}
            question={quiz.question}
            answers={quiz.answers}
            holdAnswer={holdAnswer}
            isOver={isOver}
        /> 
    })

    return (
        <>
            <svg className="blob-2" width="65" height="62" viewBox="0 0 65 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M-38.919 2.96445C-10.8241 1.07254 20.4974 -5.87426 40.8434 11.5469C63.3629 30.8293 69.9281 62.0589 61.4141 88.8747C53.3376 114.313 28.2818 132.992 -0.0909921 140.475C-23.9759 146.775 -45.6063 132.093 -68.3914 123.11C-92.9153 113.441 -125.606 110.575 -133.794 87.7612C-142.333 63.9714 -124.677 39.0277 -104.912 21.3621C-87.7687 6.03978 -63.0936 4.59238 -38.919 2.96445Z" fill="#DEEBF8"/>
            </svg>
            <svg className="blob-1" width="126" height="131" viewBox="0 0 126 131" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 71.3947C35.1213 40.8508 -2.68211 11.7816 1.17274 -29.6933C5.43941 -75.599 39.854 -115.359 82.4191 -133.133C122.797 -149.994 170.035 -140.256 205.822 -115.149C235.947 -94.0141 236.823 -53.8756 246.141 -18.271C256.17 20.0508 282.521 60.8106 260.501 93.7792C237.538 128.159 188.991 133.432 147.931 128.768C112.318 124.723 87.7505 97.6768 63.4095 71.3947Z" fill="#FFFAD1"/>
            </svg>
            
            <div className="quizzes_container">
                {quizzes}
                
                {isOver && (
                    <div className="end_score">
                        <h2 className="notification">{`You scored ${numCorrectAns}/${quiz.length} correct answers!`}</h2>
                            <button 
                            className="check_answers-btn"
                            onClick={playAgain}
                        >
                            Play again
                        </button>
                    </div>
                )}

                {!isOver && (
                    <div className="end_score">
                        <button 
                            className="check_answers-btn"
                            onClick={checkAnswer}
                        >
                            Check answers
                        </button>
                    </div>
                )}

                
            </div>
        </>
    )
}

export default Quizpage;