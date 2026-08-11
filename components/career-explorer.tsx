"use client"

import { useState, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Search,
  BookOpen,
  Building,
  Award,
  Sparkles,
  Heart,
  HeartOff,
  DollarSign,
  Lightbulb,
  HelpCircle,
} from "lucide-react"
import { careerData } from "@/data/career-data"
import { extendedCareerData } from "@/data/career-data-extended"
import { IndustryIcon } from "@/components/industry-icon"
import { useFavorites } from "@/context/favorites-context"
import { CareerQuiz } from "@/components/career-quiz"
import { PrintButton } from "@/components/print-button"
import { CareerChatbot } from "@/components/career-chatbot"

export function CareerExplorer() {
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showQuiz, setShowQuiz] = useState(false)
  const [recommendedIndustries, setRecommendedIndustries] = useState<string[]>([])
  const [showRecommended, setShowRecommended] = useState(false)
  const industries = Object.keys(careerData)
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()
  const printRef = useRef<HTMLDivElement>(null)

  // Use useMemo to derive filteredIndustries instead of useState + useEffect
  const filteredIndustries = useMemo(() => {
    if (showRecommended && recommendedIndustries.length > 0) {
      return recommendedIndustries
    }

    if (!searchTerm) {
      return industries
    }

    return industries.filter((industry) => industry.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, industries, showRecommended, recommendedIndustries])

  const handleQuizComplete = (industries: string[]) => {
    setRecommendedIndustries(industries)
    setShowRecommended(true)
    setShowQuiz(false)
  }

  const handleOpenQuiz = () => {
    setShowQuiz(true)
  }

  const handleSelectIndustry = (industry: string) => {
    if (industries.includes(industry)) {
      setSelectedIndustry(industry)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-10" id="career-explorer">
      {/* Chatbot Component */}
      <CareerChatbot onOpenQuiz={handleOpenQuiz} onSelectIndustry={handleSelectIndustry} />

      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <CareerQuiz onComplete={handleQuizComplete} onCancel={() => setShowQuiz(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Choose Your Industry</h2>
        <p className="text-center text-muted-foreground mb-8">
          Select an industry to explore education requirements, job opportunities, and career progression paths.
        </p>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search industries..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full max-w-md">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {filteredIndustries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button variant="outline" size="sm" onClick={() => setShowQuiz(true)} className="flex items-center gap-1">
            <HelpCircle className="h-4 w-4" />
            Find Your Match
          </Button>

          {showRecommended && (
            <Button variant="outline" size="sm" onClick={() => setShowRecommended(false)}>
              Show All Industries
            </Button>
          )}

          {favorites.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowRecommended(true)
                setRecommendedIndustries(favorites)
              }}
              className="flex items-center gap-1"
            >
              <Heart className="h-4 w-4 text-red-500" />
              View Favorites
            </Button>
          )}
        </div>
      </motion.div>

      {!selectedIndustry && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredIndustries.map((industry) => (
            <motion.div key={industry} variants={item}>
              <Card
                className="h-full cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50 group"
                onClick={() => setSelectedIndustry(industry)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <IndustryIcon industry={industry} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{industry}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        isFavorite(industry) ? removeFavorite(industry) : addFavorite(industry)
                      }}
                    >
                      {isFavorite(industry) ? (
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {careerData[industry].jobs.entryLevel.length +
                      careerData[industry].jobs.midLevel.length +
                      careerData[industry].jobs.seniorLevel.length}{" "}
                    career opportunities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/5">
                      {careerData[industry].jobs.entryLevel.length} Entry Level
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/5">
                      {careerData[industry].jobs.midLevel.length} Mid Level
                    </Badge>
                    <Badge variant="outline" className="bg-muted">
                      {careerData[industry].jobs.seniorLevel.length} Senior Level
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {selectedIndustry && (
          <motion.div
            key={selectedIndustry}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
            ref={printRef}
          >
            <div className="flex justify-between items-center mb-6">
              <Button variant="ghost" onClick={() => setSelectedIndustry("")} className="mb-4">
                ← Back to all industries
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    isFavorite(selectedIndustry) ? removeFavorite(selectedIndustry) : addFavorite(selectedIndustry)
                  }}
                  className="flex items-center gap-1"
                >
                  {isFavorite(selectedIndustry) ? (
                    <>
                      <HeartOff className="h-4 w-4" />
                      Remove Favorite
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4" />
                      Add to Favorites
                    </>
                  )}
                </Button>

                <PrintButton
                  contentRef={printRef}
                  documentTitle={selectedIndustry ? `Career Path - ${selectedIndustry}` : "Career Explorer"}
                >
                  Print
                </PrintButton>
              </div>
            </div>

            <Card className="border-t-4 border-t-primary">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <IndustryIcon industry={selectedIndustry} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedIndustry}</CardTitle>
                    <CardDescription>Explore education options and career paths</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="education" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="education">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="entry">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Job Opportunities
                    </TabsTrigger>
                    <TabsTrigger value="career">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Career Path
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="education" className="mt-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Education Options
                      </h3>
                      <div className="space-y-3">
                        {careerData[selectedIndustry].education.map((edu, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                          >
                            <GraduationCap className="mr-3 h-5 w-5 text-primary" />
                            <span className="font-medium">{edu}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="entry" className="mt-6">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/10">
                            Entry Level
                          </Badge>
                          Starting Positions
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {extendedCareerData[selectedIndustry].jobs.entryLevel.map((job, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05 * index }}
                              whileHover={{ y: -5 }}
                            >
                              <Card className="h-full border-l-4 border-l-blue-400 hover:shadow-md transition-all">
                                <CardContent className="pt-6">
                                  <Badge className="mb-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-200">
                                    Entry Level
                                  </Badge>
                                  <p className="font-medium mb-2">{job.title}</p>

                                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                                    {job.salary}
                                  </div>

                                  <div className="mt-3">
                                    <div className="flex items-center gap-1 mb-2">
                                      <Lightbulb className="h-3.5 w-3.5 text-primary" />
                                      <span className="text-sm font-medium">Key Skills:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {job.skills.map((skill, i) => (
                                        <Badge key={i} variant="outline" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/10">
                            Mid Level
                          </Badge>
                          Career Growth
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {extendedCareerData[selectedIndustry].jobs.midLevel.map((job, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05 * index + 0.2 }}
                              whileHover={{ y: -5 }}
                            >
                              <Card className="h-full border-l-4 border-l-purple-400 hover:shadow-md transition-all">
                                <CardContent className="pt-6">
                                  <Badge className="mb-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-200">
                                    Mid Level
                                  </Badge>
                                  <p className="font-medium mb-2">{job.title}</p>

                                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                                    {job.salary}
                                  </div>

                                  <div className="mt-3">
                                    <div className="flex items-center gap-1 mb-2">
                                      <Lightbulb className="h-3.5 w-3.5 text-primary" />
                                      <span className="text-sm font-medium">Key Skills:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {job.skills.map((skill, i) => (
                                        <Badge key={i} variant="outline" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/10">
                            Senior Level
                          </Badge>
                          Leadership Positions
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {extendedCareerData[selectedIndustry].jobs.seniorLevel.map((job, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05 * index + 0.4 }}
                              whileHover={{ y: -5 }}
                            >
                              <Card className="h-full border-l-4 border-l-green-400 hover:shadow-md transition-all">
                                <CardContent className="pt-6">
                                  <Badge className="mb-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-200">
                                    Senior Level
                                  </Badge>
                                  <p className="font-medium mb-2">{job.title}</p>

                                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                                    {job.salary}
                                  </div>

                                  <div className="mt-3">
                                    <div className="flex items-center gap-1 mb-2">
                                      <Lightbulb className="h-3.5 w-3.5 text-primary" />
                                      <span className="text-sm font-medium">Key Skills:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {job.skills.map((skill, i) => (
                                        <Badge key={i} variant="outline" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="career" className="mt-6">
                    <div className="space-y-12">
                      <div className="text-center max-w-2xl mx-auto mb-8">
                        <h3 className="text-xl font-medium mb-2">Your Career Journey</h3>
                        <p className="text-muted-foreground">
                          Follow this roadmap to progress from entry-level positions to senior roles in{" "}
                          {selectedIndustry}
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-border rounded-full"></div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="relative z-10 mb-24"
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-primary" />
                          </div>

                          <Card className="max-w-2xl mx-auto mt-8 border-primary/20">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Education & Training
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {careerData[selectedIndustry].education.map((edu, index) => (
                                  <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span>{edu}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="relative z-10 mb-24"
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 rounded-full bg-blue-500/10 border-4 border-background flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-blue-500" />
                          </div>

                          <Card className="max-w-2xl mx-auto mt-8 border-blue-200">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl flex items-center gap-2">
                                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                                  Step 1
                                </Badge>
                                Entry Level Positions
                              </CardTitle>
                              <CardDescription>1-3 years experience</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {extendedCareerData[selectedIndustry].jobs.entryLevel.slice(0, 4).map((job, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + 0.1 * index }}
                                    className="p-3 rounded-lg border border-blue-100 bg-blue-50/50 dark:bg-blue-950/10 dark:border-blue-900/50"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <p className="font-medium">{job.title}</p>
                                      <Badge variant="outline" className="text-xs">
                                        {job.salary}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {job.skills.slice(0, 2).map((skill, i) => (
                                        <Badge
                                          key={i}
                                          variant="outline"
                                          className="text-xs bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                          className="relative z-10 mb-24"
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 rounded-full bg-purple-500/10 border-4 border-background flex items-center justify-center">
                            <Building className="h-6 w-6 text-purple-500" />
                          </div>

                          <Card className="max-w-2xl mx-auto mt-8 border-purple-200">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl flex items-center gap-2">
                                <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                                  Step 2
                                </Badge>
                                Mid-Level Positions
                              </CardTitle>
                              <CardDescription>3-7 years experience</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {extendedCareerData[selectedIndustry].jobs.midLevel.slice(0, 4).map((job, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + 0.1 * index }}
                                    className="p-3 rounded-lg border border-purple-100 bg-purple-50/50 dark:bg-purple-950/10 dark:border-purple-900/50"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <p className="font-medium">{job.title}</p>
                                      <Badge variant="outline" className="text-xs">
                                        {job.salary}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {job.skills.slice(0, 2).map((skill, i) => (
                                        <Badge
                                          key={i}
                                          variant="outline"
                                          className="text-xs bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                          className="relative z-10"
                        >
                          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 rounded-full bg-green-500/10 border-4 border-background flex items-center justify-center">
                            <Award className="h-6 w-6 text-green-500" />
                          </div>

                          <Card className="max-w-2xl mx-auto mt-8 border-green-200">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl flex items-center gap-2">
                                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                  Step 3
                                </Badge>
                                Senior Level Positions
                              </CardTitle>
                              <CardDescription>7+ years experience</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {extendedCareerData[selectedIndustry].jobs.seniorLevel.slice(0, 4).map((job, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + 0.1 * index }}
                                    className="p-3 rounded-lg border border-green-100 bg-green-50/50 dark:bg-green-950/10 dark:border-green-900/50"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <p className="font-medium">{job.title}</p>
                                      <Badge variant="outline" className="text-xs">
                                        {job.salary}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {job.skills.slice(0, 2).map((skill, i) => (
                                        <Badge
                                          key={i}
                                          variant="outline"
                                          className="text-xs bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>

                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.1 }}
                                className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-3"
                              >
                                <div className="p-2 rounded-full bg-primary/10">
                                  <Sparkles className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Career Achievement</h4>
                                  <p className="text-sm text-muted-foreground">
                                    With dedication and continuous learning, you can reach the top positions in{" "}
                                    {selectedIndustry}
                                  </p>
                                </div>
                              </motion.div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
