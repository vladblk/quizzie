import { Routes, Route } from 'react-router-dom';
import Homepage from "./Homepage";
import Quizpage from "./Quizpage";

function Pages() {
    return (
        <Routes>
            <Route path={'/'} element={<Homepage />} />
            <Route path={'/quiz'} element={<Quizpage />} />
        </Routes>
    )
}

export default Pages;