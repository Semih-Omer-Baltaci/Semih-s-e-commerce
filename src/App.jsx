import { Home } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to E-Commerce
          <Home className="inline-block ml-2" />
        </h1>
      </div>
    </div>
  )
}

export default App
