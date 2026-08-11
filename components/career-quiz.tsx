"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { careerQuizQuestions } from "@/data/career-data-extended"
import { HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react"

type QuizResults = Record<string, number>

interface CareerQuizProps {
  onComplete: (recommendedIndustries: string[]) => void
  onCancel: () => void
}

export function CareerQuiz({ onComplete, onCancel }: CareerQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [results, setResults] = useState<QuizResults>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < careerQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    const newResults: QuizResults = {}

    answers.forEach((answer, index) => {
      const question = careerQuizQuestions[index]
      const selectedOption = question.options.find((option) => option.text === answer)

      if (selectedOption) {
        selectedOption.industries.forEach((industry) => {
          newResults[industry] = (newResults[industry] || 0) + 1
        })
      }
    })

    setResults(newResults)
    setShowResults(true)
  }

  const getRecommendedIndustries = () => {
    // Sort industries by score and get top 3
    return Object.entries(results)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([industry]) => industry)
  }

  const handleComplete = () => {
    onComplete(getRecommendedIndustries())
  }

  const question = careerQuizQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === careerQuizQuestions.length - 1

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Career Interest Quiz</CardTitle>
        <CardDescription>
          Answer a few questions to discover industries that might be a good fit for you
        </CardDescription>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">
                    Question {currentQuestion + 1} of {careerQuizQuestions.length}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(((currentQuestion + 1) / careerQuizQuestions.length) * 100)}% complete
                  </span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / careerQuizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {question.question}
                </h3>

                <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.text} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Your Results Are Ready!</h3>
                <p className="text-muted-foreground">
                  Based on your answers, we've identified these industries as potential matches for your interests.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {getRecommendedIndustries().map((industry, index) => (
                  <motion.div
                    key={industry}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border bg-card/50"
                  >
                    <p className="font-medium">{industry}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        {!showResults ? (
          <Button onClick={handleNext} disabled={!answers[currentQuestion]} className="flex items-center">
            {isLastQuestion ? "See Results" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleComplete}>Explore These Industries</Button>
        )}
      </CardFooter>
    </Card>
  )
}
