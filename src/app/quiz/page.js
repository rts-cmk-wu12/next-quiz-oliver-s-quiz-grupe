'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function QuizContent() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const category = searchParams.get('category') || '9'
  const difficulty = searchParams.get('difficulty') || 'medium'
  const amount = searchParams.get('amount') || '5'

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }
      
      const data = await response.json()
      
      if (data.response_code !== 0) {
        throw new Error('No questions available for these parameters')
      }
      
      const processedQuestions = data.results.map((q) => ({
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHtml),
        all_answers: shuffleArray([
          decodeHtml(q.correct_answer),
          ...q.incorrect_answers.map(decodeHtml)
        ])
      }))
      
      setQuestions(processedQuestions)
    } catch (error) {
      console.error('Error fetching questions:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const decodeHtml = (html) => {
    if (typeof window === 'undefined') return html
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }

  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return
    
    setSelectedAnswer(answer)
    setShowFeedback(true)
    
    const isCorrect = answer === questions[currentQuestion].correct_answer
    if (isCorrect) {
      setScore(prevScore => prevScore + 1)
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer('')
        setShowFeedback(false)
      } else {
        const finalScore = score + (isCorrect ? 1 : 0)
        router.push(`/results?score=${finalScore}&total=${questions.length}`)
      }
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loader 🍔</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Refresh Siden det driller skat</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-2xl">No questionos Found 😕</div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Spørgsmål {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-gray-600">Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6 text-gray-800">{question.question}</h2>

        <div className="space-y-3">
          {question.all_answers.map((answer, index) => {
            let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 "
            
            if (showFeedback) {
              if (answer === question.correct_answer) {
                buttonClass += "bg-green-100 border-green-500 text-green-800"
              } else if (answer === selectedAnswer && answer !== question.correct_answer) {
                buttonClass += "bg-red-100 border-red-500 text-red-800"
              } else {
                buttonClass += "bg-gray-100 border-gray-300 text-gray-600"
              }
            } else {
              buttonClass += "border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                disabled={showFeedback}
                className={buttonClass}
              >
                {answer}
                {showFeedback && answer === question.correct_answer && " ✅"}
                {showFeedback && answer === selectedAnswer && answer !== question.correct_answer && " ❌"}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Quiz() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loader quiz... 🤔</div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  )
}