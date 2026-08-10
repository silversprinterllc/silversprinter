import Header from '@/components/store/Header'
import Footer from '@/components/store/Footer'
import SaturationQuiz from '@/components/quiz/SaturationQuiz'

export default function QuizPage() {
  return (
    <main className="bg-[var(--sf-cream)] min-h-screen">
      <Header />
      <SaturationQuiz />
      <Footer />
    </main>
  )
}
