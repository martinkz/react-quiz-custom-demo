import { Quiz } from "react-quiz-maker";
import type { QuizConfig, QuizStateProps, QuizData, QuizAnswer } from "react-quiz-maker";

const btnStyles = {
	unset: "bg-[#222]",
	default: "bg-[#222]",
	selected: "bg-[#c2185b] scale-[1.07]",
	correct: "bg-green-700",
	incorrect: "bg-[#b52e49]",
};

const bgColors = {
	quizWrapBg: "bg-[#512da8]",
	quizInnerWrapBg: "bg-[#7e57c2]",
	questionBg: "bg-[#673ab7]",
	explainerBg: "bg-[#512da8]",
	buttonBg: "bg-[#311b92]",
};

const quizComponents = {
	IntroPage,
	QuestionPage,
	QuestionHeader,
	QuestionInnerWrapper,
	QuestionBody,
	Explainer,
	ResultPage,
};

export default function MyCustomQuiz({ config, data }: { config: QuizConfig; data: QuizData }) {
	return (
		<div
			className={`quiz-wrapper max-w-[940px] mx-auto relative md:p-10 md:rounded-2xl ${bgColors.quizWrapBg} text-white text-center text-xl font-thin`}
		>
			<div className={`flex flex-col items-stretch justify-center ${bgColors.quizInnerWrapBg} rounded-2xl p-8`}>
				<Quiz config={config} data={data} components={quizComponents} />
			</div>
		</div>
	);
}

function IntroPage(state: QuizStateProps) {
	const { quizData } = state;
	const quizTitle = quizData.quizTitle;
	const quizDescription = quizData.quizSynopsis;
	return (
		<div className="quiz-intro-page min-h-[400px] md:px-10 flex flex-col items-center justify-center gap-10">
			<h2 className="text-3xl font-black uppercase tracking-wide">{quizTitle}</h2>
			<p>{quizDescription}</p>
			<Quiz.StartButton className={`px-4 py-3 ${bgColors.buttonBg} rounded-lg text-white`} state={state}>
				Start quiz
			</Quiz.StartButton>
		</div>
	);
}

function QuestionPage({ children }: { children: React.ReactNode }) {
	return <div className="quiz-question-page flex flex-col gap-8">{children}</div>;
}

function QuestionInnerWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`quiz-question-inner-wrapper flex flex-col justify-center items-center ${bgColors.questionBg} p-10 rounded-2xl`}
		>
			{children}
		</div>
	);
}

function QuestionHeader(state: QuizStateProps) {
	const { currentQuestion, maxQuestions, progress } = state;
	return (
		<div className="quiz-question-header flex gap-8 justify-center items-center">
			<h3 className="font-black text-lg">
				{currentQuestion.index} <span className="font-normal">/</span> {maxQuestions}
			</h3>
			<progress
				className="quiz-main-progress flex-1 bg-[rgba(255,255,255,0.4)] rounded-2xl [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-bar]:rounded-2xl [&::-webkit-progress-value]:rounded-lg [&::-moz-progress-bar]:rounded-2xl  [&::-webkit-progress-value]:bg-white [&::-moz-progress-bar]:bg-white  [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:duration-500"
				max="100"
				value={progress}
			></progress>
			<h3 className="font-black text-lg">{`${progress}%`}</h3>
		</div>
	);
}

function QuestionBody(state: QuizStateProps) {
	const { currentQuestion, answerButtonState } = state;

	return (
		<div className="quiz-question-body grid justify-items-center gap-8 py-6">
			<h2 className="grid gap-8 justify-center items-center text-2xl">
				<span className="quiz-question-index mx-auto shrink-0 text-5xl font-black rounded-full bg-white text-black w-[75px] h-[75px] flex justify-center items-center">
					{currentQuestion.index}
				</span>
				{currentQuestion.question}
			</h2>

			<div className="answer-wrap grid lg:flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center px-2">
				{currentQuestion.answers.map((item: QuizAnswer, index: number) => (
					<Quiz.AnswerButton
						className={`p-4 rounded-lg transition-all text-xl ${btnStyles[answerButtonState[index]]}`}
						key={index}
						index={index}
						state={state}
					>
						{item.answer}
						{answerButtonState[index] === "correct" && <span className="font-black"> ✓</span>}
						{answerButtonState[index] === "incorrect" && <span className="font-black"> ×</span>}
					</Quiz.AnswerButton>
				))}
			</div>

			<Quiz.QuestionNextButton
				className={`px-4 py-3 ${bgColors.buttonBg} rounded-lg text-white disabled:opacity-50 transition-all`}
				state={state}
			>
				Next
			</Quiz.QuestionNextButton>

			<Quiz.AutoResumeProgress
				className={`w-full [&>div]:h-[5px] [&>div]:rounded-lg [&>div]:bg-violet-400 [&>div]:transition-all [&>div]:ease-linear`}
				state={state}
			/>
		</div>
	);
}

function Explainer(state: QuizStateProps) {
	const { currentQuestion, currentAnswer } = state;
	const answerIsCorrect = currentAnswer?.result === "1";

	return (
		<div className={`quiz-explainer ${bgColors.explainerBg} p-10 rounded-2xl space-y-6`}>
			<h2 className="text-3xl font-black">
				{answerIsCorrect ? currentQuestion.messageForCorrectAnswer : currentQuestion.messageForIncorrectAnswer}
			</h2>
			<p>{currentQuestion.explanation}</p>
			<Quiz.ExplainerNextButton className={`px-4 py-3 ${bgColors.buttonBg} rounded-lg text-white`} state={state}>
				Next
			</Quiz.ExplainerNextButton>
		</div>
	);
}

function ResultPage(state: QuizStateProps) {
	const { result, quizData } = state;
	const resultsCopy = quizData.results;

	return (
		<div className="quiz-result-page min-h-[400px] md:px-10 flex flex-col items-center justify-center gap-10">
			<h2 className="text-3xl font-black">Your result is: {result}</h2>
			{resultsCopy && <p>{resultsCopy[result!].description}</p>}
			<Quiz.StartButton className={`px-4 py-3 ${bgColors.buttonBg} rounded-lg text-white`} state={state}>
				Play again
			</Quiz.StartButton>
		</div>
	);
}
