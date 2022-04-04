function Quiz(props) {

    const answers = props.answers.map(answer => {
        const stylesBefore = answer.isHeld ? "#D6DBF5" : "";
        const stylesAfter = answer.isHeld && answer.isCorrect ? "#94D7A2" 
        : answer.isHeld && !answer.isCorrect ? "#F8BCBC" : "";

        const styles = {
            backgroundColor: props.isOver ? stylesAfter : stylesBefore
        }

        return (
            <button
                disabled={props.isOver ? true : false}
                key={answer.id}
                dangerouslySetInnerHTML={{ __html: answer.value }}
                onClick={() => props.holdAnswer(answer.id)}
                style={styles}
            ></button>
        )
    
    })

    
    return (
        <>
        <div className="quiz_container">
            <h2 dangerouslySetInnerHTML={{ __html: props.question }}></h2>
            
            <div className="answers_container">
                {answers}
            </div>

            <div className="line"></div>
        </div>
        </>
    )
}

export default Quiz;