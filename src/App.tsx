import type { QuizData } from "react-quiz-maker";
import MyCustomQuiz from "./MyCustomQuiz";
import scoredQuizData from "./scoredQuiz.json";

const config = {
	autoResume: true,
	autoResumeDelay: 1200,
	revealAnswer: true,
	explainerEnabled: false,
	explainerNewPage: false,
	animation: "mixed",
} as const;

function App() {
	return <MyCustomQuiz config={config} data={scoredQuizData as QuizData} />;
}

export default App;
