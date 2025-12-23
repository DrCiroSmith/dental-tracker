import { useState, useEffect } from 'react';
import { examQuestions, examCategories, type ExamQuestion } from '../data/examQuestions';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Trophy, RotateCcw, Settings2, Play, Clock, BookOpen } from 'lucide-react';
import clsx from 'clsx';

type ExamMode = 'setup' | 'exam' | 'results';

interface ExamSettings {
    questionCount: number;
    categories: string[];
    timeLimit: number | null; // minutes, null for no limit
}

interface UserAnswer {
    questionId: number;
    selectedAnswer: number | null;
    isCorrect: boolean;
}

export default function MockExam() {
    const [mode, setMode] = useState<ExamMode>('setup');
    const [settings, setSettings] = useState<ExamSettings>({
        questionCount: 20,
        categories: [...examCategories],
        timeLimit: null
    });
    const [examQuestionsList, setExamQuestionsList] = useState<ExamQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

    // Timer effect
    useEffect(() => {
        if (mode !== 'exam' || timeRemaining === null) return;

        if (timeRemaining <= 0) {
            handleFinishExam();
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining(prev => (prev !== null ? prev - 1 : null));
        }, 1000);

        return () => clearInterval(timer);
    }, [mode, timeRemaining]);

    const handleStartExam = () => {
        // Filter questions by selected categories
        let filteredQuestions = examQuestions.filter(q => 
            settings.categories.includes(q.category)
        );

        // Shuffle and select the requested number of questions
        const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffled.slice(0, Math.min(settings.questionCount, shuffled.length));

        setExamQuestionsList(selectedQuestions);
        setUserAnswers(selectedQuestions.map(q => ({
            questionId: q.id,
            selectedAnswer: null,
            isCorrect: false
        })));
        setCurrentIndex(0);
        setShowExplanation(false);
        setTimeRemaining(settings.timeLimit ? settings.timeLimit * 60 : null);
        setMode('exam');
    };

    const handleSelectAnswer = (answerIndex: number) => {
        const currentQuestion = examQuestionsList[currentIndex];
        const isCorrect = answerIndex === currentQuestion.correctAnswer;

        setUserAnswers(prev => prev.map((answer, idx) => 
            idx === currentIndex 
                ? { ...answer, selectedAnswer: answerIndex, isCorrect }
                : answer
        ));
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (currentIndex < examQuestionsList.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowExplanation(false);
        }
    };

    const handlePrevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowExplanation(userAnswers[currentIndex - 1].selectedAnswer !== null);
        }
    };

    const handleFinishExam = () => {
        setMode('results');
    };

    const handleRestartExam = () => {
        setMode('setup');
        setExamQuestionsList([]);
        setUserAnswers([]);
        setCurrentIndex(0);
        setShowExplanation(false);
        setTimeRemaining(null);
    };

    const toggleCategory = (category: string) => {
        setSettings(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate results
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const answeredCount = userAnswers.filter(a => a.selectedAnswer !== null).length;
    const scorePercentage = examQuestionsList.length > 0 
        ? Math.round((correctCount / examQuestionsList.length) * 100) 
        : 0;

    // Setup Mode
    if (mode === 'setup') {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mock Exam</h2>
                    <p className="text-gray-500 dark:text-gray-400">Customize your practice exam settings</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
                    {/* Question Count */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Number of Questions
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {[10, 20, 30, 50].map(count => (
                                <button
                                    key={count}
                                    onClick={() => setSettings(prev => ({ ...prev, questionCount: count }))}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                        settings.questionCount === count
                                            ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300"
                                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    )}
                                >
                                    {count} Questions
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Limit */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Time Limit
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {[null, 15, 30, 45, 60].map(time => (
                                <button
                                    key={time ?? 'none'}
                                    onClick={() => setSettings(prev => ({ ...prev, timeLimit: time }))}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                        settings.timeLimit === time
                                            ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300"
                                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    )}
                                >
                                    {time === null ? 'No Limit' : `${time} min`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Categories
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {examCategories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => toggleCategory(category)}
                                    className={clsx(
                                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                                        settings.categories.includes(category)
                                            ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300"
                                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {settings.categories.length === 0 ? 'Select at least one category' : `${settings.categories.length} categories selected`}
                        </p>
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={handleStartExam}
                        disabled={settings.categories.length === 0}
                        className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Play className="w-5 h-5" />
                        Start Exam
                    </button>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h3 className="font-medium text-blue-900 dark:text-blue-200">Practice Mode</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            Questions are based on dental school admission topics including anatomy, physiology, biochemistry, and more.
                            See explanations after each answer to enhance your learning.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Exam Mode
    if (mode === 'exam') {
        const currentQuestion = examQuestionsList[currentIndex];
        const currentAnswer = userAnswers[currentIndex];

        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mock Exam</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Question {currentIndex + 1} of {examQuestionsList.length} • {currentQuestion.category}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {timeRemaining !== null && (
                            <div className={clsx(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
                                timeRemaining < 60 
                                    ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300" 
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            )}>
                                <Clock className="w-4 h-4" />
                                {formatTime(timeRemaining)}
                            </div>
                        )}
                        <button
                            onClick={handleFinishExam}
                            className="px-4 py-1.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                        >
                            Finish Exam
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-teal-500 h-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / examQuestionsList.length) * 100}%` }}
                    />
                </div>

                {/* Question Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Question Image */}
                    {currentQuestion.imageUrl && (
                        <div className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                            <img 
                                src={currentQuestion.imageUrl} 
                                alt="Question illustration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 space-y-6">
                        {/* Question Text */}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {currentQuestion.question}
                        </h3>

                        {/* Options */}
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = currentAnswer.selectedAnswer === idx;
                                const isCorrect = idx === currentQuestion.correctAnswer;
                                const showResult = currentAnswer.selectedAnswer !== null;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => currentAnswer.selectedAnswer === null && handleSelectAnswer(idx)}
                                        disabled={currentAnswer.selectedAnswer !== null}
                                        className={clsx(
                                            "w-full p-4 rounded-lg text-left transition-all border-2",
                                            !showResult && "border-gray-200 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-gray-50 dark:hover:bg-gray-700",
                                            showResult && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/30",
                                            showResult && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/30",
                                            showResult && !isSelected && !isCorrect && "border-gray-200 dark:border-gray-600 opacity-60"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={clsx(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                                                !showResult && "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
                                                showResult && isCorrect && "bg-green-500 text-white",
                                                showResult && isSelected && !isCorrect && "bg-red-500 text-white",
                                                showResult && !isSelected && !isCorrect && "bg-gray-100 dark:bg-gray-700 text-gray-400"
                                            )}>
                                                {showResult && isCorrect ? (
                                                    <CheckCircle2 className="w-5 h-5" />
                                                ) : showResult && isSelected && !isCorrect ? (
                                                    <XCircle className="w-5 h-5" />
                                                ) : (
                                                    String.fromCharCode(65 + idx)
                                                )}
                                            </span>
                                            <span className={clsx(
                                                "text-sm",
                                                showResult && isCorrect && "text-green-800 dark:text-green-200 font-medium",
                                                showResult && isSelected && !isCorrect && "text-red-800 dark:text-red-200",
                                                !showResult && "text-gray-700 dark:text-gray-300"
                                            )}>
                                                {option}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation */}
                        {showExplanation && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-1">Explanation</h4>
                                <p className="text-sm text-blue-800 dark:text-blue-300">{currentQuestion.explanation}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePrevQuestion}
                        disabled={currentIndex === 0}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <div className="flex gap-1">
                        {examQuestionsList.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    setShowExplanation(userAnswers[idx].selectedAnswer !== null);
                                }}
                                className={clsx(
                                    "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
                                    idx === currentIndex && "bg-teal-600 text-white",
                                    idx !== currentIndex && userAnswers[idx].selectedAnswer !== null && userAnswers[idx].isCorrect && "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
                                    idx !== currentIndex && userAnswers[idx].selectedAnswer !== null && !userAnswers[idx].isCorrect && "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
                                    idx !== currentIndex && userAnswers[idx].selectedAnswer === null && "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                )}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextQuestion}
                        disabled={currentIndex === examQuestionsList.length - 1}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    // Results Mode
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Exam Results</h2>
                <p className="text-gray-500 dark:text-gray-400">Here's how you performed</p>
            </div>

            {/* Score Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                <div className={clsx(
                    "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4",
                    scorePercentage >= 70 ? "bg-green-100 dark:bg-green-900/50" : scorePercentage >= 50 ? "bg-yellow-100 dark:bg-yellow-900/50" : "bg-red-100 dark:bg-red-900/50"
                )}>
                    <Trophy className={clsx(
                        "w-12 h-12",
                        scorePercentage >= 70 ? "text-green-600 dark:text-green-400" : scorePercentage >= 50 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"
                    )} />
                </div>

                <div className={clsx(
                    "text-5xl font-bold mb-2",
                    scorePercentage >= 70 ? "text-green-600 dark:text-green-400" : scorePercentage >= 50 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"
                )}>
                    {scorePercentage}%
                </div>

                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    You got {correctCount} out of {examQuestionsList.length} questions correct
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</div>
                        <div className="text-sm text-green-800 dark:text-green-300">Correct</div>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">{answeredCount - correctCount}</div>
                        <div className="text-sm text-red-800 dark:text-red-300">Incorrect</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{examQuestionsList.length - answeredCount}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Unanswered</div>
                    </div>
                </div>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={handleRestartExam}
                        className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Take Another Exam
                    </button>
                    <button
                        onClick={() => {
                            setMode('exam');
                            setCurrentIndex(0);
                            setShowExplanation(userAnswers[0].selectedAnswer !== null);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        <Settings2 className="w-5 h-5" />
                        Review Answers
                    </button>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Performance by Category</h3>
                <div className="space-y-3">
                    {examCategories.map(category => {
                        const categoryQuestions = examQuestionsList.filter(q => q.category === category);
                        if (categoryQuestions.length === 0) return null;

                        const categoryCorrect = userAnswers.filter((a, idx) => 
                            examQuestionsList[idx].category === category && a.isCorrect
                        ).length;
                        const categoryPercentage = Math.round((categoryCorrect / categoryQuestions.length) * 100);

                        return (
                            <div key={category} className="flex items-center gap-4">
                                <span className="w-32 text-sm text-gray-600 dark:text-gray-400 truncate">{category}</span>
                                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={clsx(
                                            "h-full rounded-full transition-all",
                                            categoryPercentage >= 70 ? "bg-green-500" : categoryPercentage >= 50 ? "bg-yellow-500" : "bg-red-500"
                                        )}
                                        style={{ width: `${categoryPercentage}%` }}
                                    />
                                </div>
                                <span className="w-20 text-sm text-gray-600 dark:text-gray-400 text-right">
                                    {categoryCorrect}/{categoryQuestions.length} ({categoryPercentage}%)
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
