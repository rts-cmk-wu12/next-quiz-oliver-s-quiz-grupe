'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const score = parseInt(searchParams.get('score') || '0')
  const total = parseInt(searchParams.get('total') || '0')
  const percentage = Math.round((score / total) * 100)

  const getEmoji = () => {
    if (percentage >= 80) return '🏆'
    if (percentage >= 60) return '👏'
    if (percentage >= 40) return '👍'
    return '💪'
  }

  const getMessage = () => {




    if (percentage >= 80) return 'Fremragende arbejde!'
    if (percentage >= 60) return 'Godt klaret!'
    if (percentage >= 40) return 'Ikke dårligt!'
    return 'Bliv ved med at øve dig!'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">{getEmoji()}</div>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">Quiz Gennemført!</h1>
        
        <div className="mb-6">
          <div className="text-5xl font-bold text-blue-600 mb-2">{score}/{total}</div>

          <div className="text-xl text-gray-600">{percentage}% Korrekt</div>
          <div className="text-lg text-gray-700 mt-2">{getMessage()}</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <button 
          onClick={() => router.push('/')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
        >

          Start Ny Quiz 🔄
        </button>
      </div>
    </div>
  )
}

export default function Results() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">

        <div className="text-white text-2xl">Indlæser resultater... ⏳</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )


}
