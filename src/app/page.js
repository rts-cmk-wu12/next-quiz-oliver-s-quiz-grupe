'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = [
  { id: 9, name: 'General Knowledge' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Computers' },
  { id: 21, name: 'Sports' },
  { id: 23, name: 'History' },
  { id: 11, name: 'Movies' }
]

export default function Home() {
  const [category, setCategory] = useState('9')
  const [difficulty, setDifficulty] = useState('medium')
  const [amount, setAmount] = useState('5')
  const router = useRouter()

  const startQuiz = () => {
    router.push(`/quiz?category=${category}&difficulty=${difficulty}&amount=${amount}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">🧠 Quiz App</h1>
        <p className="text-gray-600 text-center mb-8">Test din viden med vores interaktive quiz!</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sværhedsgrad</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="easy">Let</option>
              <option value="medium">Medium</option>
              <option value="hard">Svær</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Antal Spørgsmål</label>
            <select 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="5">5 Spørgsmål</option>
              <option value="10">10 Spørgsmål</option>
              <option value="15">15 Spørgsmål</option>
            </select>
          </div>

          <button 
            onClick={startQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    </div>
  )
}
