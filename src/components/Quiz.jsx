function Quiz(props) {
    return (
        <>
        <div className="quiz_container">
            <h2 dangerouslySetInnerHTML={{ __html: props.question }}></h2>
            
            <div className="answers_container">
                {
                    props.answers.map(answer => {
                        if (props.isOver === false) {
                            return (
                                <button
                                    key={answer.id}
                                    dangerouslySetInnerHTML={{ __html: answer.value }}
                                    onClick={() => props.holdAnswer(answer.id)}
                                    style={{ 
                                        backgroundColor: answer.isHeld ? "#D6DBF5" : "",
                                    }}
                                ></button>
                            )
                        }
                            
                        if (props.isOver === true) {
                            return (
                                <button 
                                    disabled
                                    key={answer.id}
                                    dangerouslySetInnerHTML={{ __html: answer.value }}
                                    style={{ 
                                        backgroundColor: answer.isHeld && answer.isCorrect ? "#94D7A2" 
                                        : answer.isHeld && !answer.isCorrect ? "#F8BCBC" : "",
                                    }}
                                ></button>
                            )
                        }
                    })
                }

            </div>

            <div className="line"></div>
        </div>
        </>
    )
}

export default Quiz;