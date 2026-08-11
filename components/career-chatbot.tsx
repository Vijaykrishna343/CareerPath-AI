"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react"
import { chatbotResponses } from "@/data/career-data-extended"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface CareerChatbotProps {
  onOpenQuiz: () => void
  onSelectIndustry: (industry: string) => void
}

export function CareerChatbot({ onOpenQuiz, onSelectIndustry }: CareerChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your Career Guide assistant. How can I help with your career questions today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Process and respond
    setTimeout(() => {
      const botResponse = generateResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Check for quiz-related queries
    if (input.includes("quiz") || input.includes("test") || input.includes("assessment")) {
      setTimeout(() => onOpenQuiz(), 1000)
      return "Our career interest quiz can help identify industries that match your preferences. I'll open that for you now!"
    }

    // Check for industry-specific queries
    const industryMatch = Object.keys(chatbotResponses).find((industry) => input.includes(industry.toLowerCase()))

    if (industryMatch) {
      setTimeout(() => onSelectIndustry(industryMatch), 1000)
      return `I'll show you more information about ${industryMatch} right away!`
    }

    // Check for pattern matches in predefined responses
    for (const item of chatbotResponses) {
      if (item.patterns.some((pattern) => input.includes(pattern.toLowerCase()))) {
        return item.response
      }
    }

    // Default response
    return "That's a great question about careers! Would you like to explore specific industries, take our career quiz, or learn about education requirements and job opportunities?"
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev)
  }

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button onClick={toggleChat} className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90">
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 shadow-xl"
          >
            <Card className="border-primary/20 overflow-hidden h-full flex flex-col">
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 bg-primary/5">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Career Guide" />
                    <AvatarFallback>CG</AvatarFallback>
                  </Avatar>
                  Career Guide
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMinimize}>
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleChat}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex-1 overflow-hidden"
                  >
                    <ScrollArea className="h-[350px] px-4 py-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    <CardFooter className="border-t p-3">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleSendMessage()
                        }}
                        className="flex w-full gap-2"
                      >
                        <Input
                          ref={inputRef}
                          placeholder="Type your question..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </CardFooter>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
