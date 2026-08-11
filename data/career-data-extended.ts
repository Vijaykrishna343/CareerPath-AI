import { careerData } from "./career-data"

// Extended data with salary ranges and skills
export const extendedCareerData: Record<
  string,
  {
    education: string[]
    jobs: {
      entryLevel: Array<{
        title: string
        salary: string
        skills: string[]
      }>
      midLevel: Array<{
        title: string
        salary: string
        skills: string[]
      }>
      seniorLevel: Array<{
        title: string
        salary: string
        skills: string[]
      }>
    }
  }
> = Object.fromEntries(
  Object.entries(careerData).map(([industry, data]) => {
    return [
      industry,
      {
        education: data.education,
        jobs: {
          entryLevel: data.jobs.entryLevel.map((job) => ({
            title: job,
            salary: getSalaryRange("entry"),
            skills: getRandomSkills(3),
          })),
          midLevel: data.jobs.midLevel.map((job) => ({
            title: job,
            salary: getSalaryRange("mid"),
            skills: getRandomSkills(4),
          })),
          seniorLevel: data.jobs.seniorLevel.map((job) => ({
            title: job,
            salary: getSalaryRange("senior"),
            skills: getRandomSkills(5),
          })),
        },
      },
    ]
  }),
)

// Helper functions to generate sample data
function getSalaryRange(level: "entry" | "mid" | "senior"): string {
  const ranges = {
    entry: ["$30,000 - $45,000", "$40,000 - $55,000", "$45,000 - $60,000"],
    mid: ["$55,000 - $75,000", "$65,000 - $85,000", "$70,000 - $90,000"],
    senior: ["$85,000 - $120,000", "$95,000 - $140,000", "$110,000 - $160,000+"],
  }

  const rangeArray = ranges[level]
  return rangeArray[Math.floor(Math.random() * rangeArray.length)]
}

function getRandomSkills(count: number): string[] {
  const allSkills = [
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Adaptability",
    "Time Management",
    "Leadership",
    "Critical Thinking",
    "Creativity",
    "Technical Writing",
    "Project Management",
    "Data Analysis",
    "Research",
    "Customer Service",
    "Presentation",
    "Negotiation",
    "Attention to Detail",
    "Strategic Planning",
    "Decision Making",
    "Conflict Resolution",
    "Mentoring",
    "Programming",
    "Design",
    "Marketing",
    "Sales",
    "Financial Analysis",
    "Quality Assurance",
    "Risk Management",
    "Process Improvement",
  ]

  const shuffled = [...allSkills].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Expanded quiz questions to help users find matching industries
export const careerQuizQuestions = [
  {
    question: "What type of work environment do you prefer?",
    options: [
      {
        text: "Office setting",
        industries: ["Business & Management", "Technology (Software Development, IT)", "Marketing & Advertising"],
      },
      {
        text: "Creative studio",
        industries: ["Photography", "Designing (Graphic, Fashion, Interior)", "Arts (Fine Arts, Music, Theater)"],
      },
      {
        text: "Outdoors",
        industries: ["Environmental Science", "Agriculture & Food Production", "Environmental Design & Landscaping"],
      },
      { text: "Healthcare setting", industries: ["Health & Medicine", "Biotechnology & Pharmaceuticals"] },
    ],
  },
  {
    question: "What skills do you enjoy using the most?",
    options: [
      {
        text: "Technical and analytical",
        industries: [
          "Technology (Software Development, IT)",
          "Robotics & Automation",
          "Biotechnology & Pharmaceuticals",
        ],
      },
      {
        text: "Creative and artistic",
        industries: [
          "Photography",
          "Designing (Graphic, Fashion, Interior)",
          "Cinematography",
          "Music (Production, Composition)",
        ],
      },
      {
        text: "Communication and people skills",
        industries: ["Education (Teaching, Research)", "Social Work & Counseling", "Marketing & Advertising"],
      },
      {
        text: "Hands-on and practical",
        industries: ["Cars (Automotive Industry)", "Culinary Arts", "Architecture & Construction"],
      },
    ],
  },
  {
    question: "What's most important to you in a career?",
    options: [
      {
        text: "High income potential",
        industries: ["Business & Management", "Technology (Software Development, IT)", "Legal", "Health & Medicine"],
      },
      {
        text: "Creative expression",
        industries: [
          "Photography",
          "Cinematography",
          "Music (Production, Composition)",
          "Arts (Fine Arts, Music, Theater)",
        ],
      },
      {
        text: "Helping others",
        industries: ["Education (Teaching, Research)", "Health & Medicine", "Social Work & Counseling"],
      },
      {
        text: "Innovation and problem-solving",
        industries: [
          "Technology (Software Development, IT)",
          "Robotics & Automation",
          "Biotechnology & Pharmaceuticals",
        ],
      },
    ],
  },
  {
    question: "Do you prefer working with...?",
    options: [
      {
        text: "People (teaching, helping, serving)",
        industries: [
          "Education (Teaching, Research)",
          "Health & Medicine",
          "Social Work & Counseling",
          "Travel & Tourism",
        ],
      },
      {
        text: "Data (analyzing, organizing, researching)",
        industries: [
          "Technology (Software Development, IT)",
          "Business & Management",
          "Biotechnology & Pharmaceuticals",
        ],
      },
      {
        text: "Things (building, fixing, operating)",
        industries: ["Cars (Automotive Industry)", "Architecture & Construction", "Robotics & Automation"],
      },
      {
        text: "Ideas (creating, designing, innovating)",
        industries: [
          "Designing (Graphic, Fashion, Interior)",
          "Arts (Fine Arts, Music, Theater)",
          "Marketing & Advertising",
        ],
      },
    ],
  },
  {
    question: "What pace of work do you prefer?",
    options: [
      {
        text: "Fast-paced and dynamic",
        industries: ["Marketing & Advertising", "Journalism & Media", "Travel & Tourism"],
      },
      {
        text: "Steady and methodical",
        industries: ["Education (Teaching, Research)", "Health & Medicine", "Architecture & Construction"],
      },
      {
        text: "Project-based with deadlines",
        industries: ["Technology (Software Development, IT)", "Cinematography", "Editing (Film, Video, Sound)"],
      },
      {
        text: "Self-directed and flexible",
        industries: ["Photography", "Arts (Fine Arts, Music, Theater)", "Writing & Publishing"],
      },
    ],
  },
  {
    question: "Which of these activities would you enjoy most in your free time?",
    options: [
      {
        text: "Creating art or music",
        industries: ["Photography", "Music (Production, Composition)", "Arts (Fine Arts, Music, Theater)"],
      },
      {
        text: "Building or fixing things",
        industries: ["Cars (Automotive Industry)", "Architecture & Construction", "Robotics & Automation"],
      },
      {
        text: "Reading and researching",
        industries: ["Education (Teaching, Research)", "Legal", "Journalism & Media"],
      },
      {
        text: "Organizing events or activities",
        industries: ["Business & Management", "Marketing & Advertising", "Travel & Tourism"],
      },
    ],
  },
  {
    question: "How do you prefer to solve problems?",
    options: [
      {
        text: "Analytical and logical approach",
        industries: ["Technology (Software Development, IT)", "Business & Management", "Legal"],
      },
      {
        text: "Creative and innovative thinking",
        industries: [
          "Designing (Graphic, Fashion, Interior)",
          "Marketing & Advertising",
          "Gaming (Video Game Development)",
        ],
      },
      {
        text: "Collaborative team effort",
        industries: ["Education (Teaching, Research)", "Health & Medicine", "Business & Management"],
      },
      {
        text: "Hands-on practical solutions",
        industries: ["Cars (Automotive Industry)", "Culinary Arts", "Environmental Design & Landscaping"],
      },
    ],
  },
  {
    question: "What type of impact do you want to make through your work?",
    options: [
      {
        text: "Improve people's health and wellbeing",
        industries: ["Health & Medicine", "Social Work & Counseling", "Environmental Science"],
      },
      {
        text: "Create beautiful or entertaining experiences",
        industries: ["Arts (Fine Arts, Music, Theater)", "Cinematography", "Gaming (Video Game Development)"],
      },
      {
        text: "Advance technology and innovation",
        industries: [
          "Technology (Software Development, IT)",
          "Robotics & Automation",
          "Biotechnology & Pharmaceuticals",
        ],
      },
      {
        text: "Build or improve physical spaces",
        industries: ["Architecture & Construction", "Environmental Design & Landscaping", "Cars (Automotive Industry)"],
      },
    ],
  },
]

// Chatbot responses for common career questions
export const chatbotResponses = [
  {
    patterns: ["how to choose career", "which career", "career selection", "choose profession", "decide career path"],
    response:
      "Choosing a career can be challenging! Consider your interests, skills, values, and work style preferences. Our career quiz can help identify industries that might be a good fit for you. Would you like to take the quiz?",
  },
  {
    patterns: ["salary", "pay", "income", "money", "earn"],
    response:
      "Salary is an important factor in career decisions. Different industries and roles have varying income potential. You can explore salary ranges for entry, mid, and senior-level positions in each industry in our explorer. Which industry are you interested in learning more about?",
  },
  {
    patterns: ["education", "degree", "qualification", "study", "college", "university"],
    response:
      "Educational requirements vary by industry and role. Some careers require specific degrees or certifications, while others value experience and skills. You can view the recommended education paths for each industry in our explorer. Is there a specific industry you're curious about?",
  },
  {
    patterns: ["skills", "abilities", "competencies", "what skills", "learn skills"],
    response:
      "Different careers require different skill sets. Technical skills are specific to roles, while soft skills like communication and problem-solving are valuable across industries. Our career explorer shows key skills for various positions. Would you like to explore a specific industry to see required skills?",
  },
  {
    patterns: ["work environment", "workplace", "remote work", "office", "work from home"],
    response:
      "Work environments vary greatly between industries and companies. Some roles are office-based, others are remote-friendly, and some involve fieldwork or travel. Consider what environment helps you thrive. Is there a specific type of work environment you prefer?",
  },
  {
    patterns: ["career change", "switch careers", "transition", "new field", "different industry"],
    response:
      "Career changes are increasingly common! When changing fields, identify transferable skills, consider additional education if needed, and network with professionals in your target industry. Our explorer can help you understand requirements for different fields. What industry are you considering switching to?",
  },
  {
    patterns: ["job market", "demand", "future prospects", "job outlook", "growing industries"],
    response:
      "The job market is constantly evolving. Technology, healthcare, renewable energy, and data science are currently growing fields with strong future prospects. Consider both your interests and market demand when planning your career path. Which industries are you most interested in?",
  },
  {
    patterns: ["work life balance", "hours", "flexibility", "time off", "burnout"],
    response:
      "Work-life balance varies significantly between industries and specific employers. Some fields like technology often offer flexible arrangements, while others like healthcare might have more structured schedules. Consider your lifestyle needs when choosing a career path. What type of balance are you looking for?",
  },
  {
    patterns: ["interview", "resume", "cv", "application", "job search"],
    response:
      "For successful job applications, tailor your resume to highlight relevant skills and experiences for each position. Research the company before interviews and prepare examples that demonstrate your capabilities. Would you like tips for a specific industry's interview process?",
  },
  {
    patterns: ["advancement", "promotion", "growth", "career path", "progress"],
    response:
      "Career advancement typically involves developing expertise in your field, taking on additional responsibilities, and demonstrating leadership. Our career explorer shows progression from entry to senior roles in various industries. Is there a specific career path you'd like to explore?",
  },
]
