import { config } from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import * as Schema from "./src/db/schema"
import { auth } from "./src/lib/auth"

config({ path: ".env" })

const db = drizzle(process.env.DATABASE_URL!, { schema: Schema })

const TEST_PASSWORD = "password123"

const techStacks = [
   ["React", "TypeScript", "Node.js", "PostgreSQL"],
   ["Python", "Django", "FastAPI", "Docker"],
   ["Go", "Gin", "gRPC", "Kubernetes"],
   ["Vue.js", "Nuxt", "Firebase", "Tailwind"],
   ["Rust", "Actix", "SQLx", "WebAssembly"],
   ["Java", "Spring Boot", "Microservices", "AWS"],
   ["Next.js", "Prisma", "GraphQL", "Redis"],
   ["Ruby", "Rails", "Sidekiq", "PostgreSQL"],
]

const mockCandidates = [
   {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "candidate" as const,
      githubUsername: "johndoe",
      score: 85,
      scoreBreakdown: { codeQuality: 90, activity: 80, followers: 85 },
      techStack: techStacks[0],
      bio: "Full-stack developer with 5 years of experience",
      location: "San Francisco, CA",
      website: "https://johndoe.dev",
      isVisible: true,
   },
   {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "candidate" as const,
      githubUsername: "janesmith",
      score: 92,
      scoreBreakdown: { codeQuality: 95, activity: 90, followers: 91 },
      techStack: techStacks[1],
      bio: "Backend engineer specializing in APIs and distributed systems",
      location: "New York, NY",
      website: "https://janesmith.dev",
      isVisible: true,
   },
   {
      name: "Alex Johnson",
      email: "alex.j@example.com",
      role: "candidate" as const,
      githubUsername: "alexj",
      score: 78,
      scoreBreakdown: { codeQuality: 75, activity: 80, followers: 79 },
      techStack: techStacks[2],
      bio: "DevOps engineer with cloud infrastructure expertise",
      location: "Seattle, WA",
      website: null,
      isVisible: true,
   },
   {
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      role: "candidate" as const,
      githubUsername: "sarahwilliams",
      score: 88,
      scoreBreakdown: { codeQuality: 87, activity: 90, followers: 87 },
      techStack: techStacks[3],
      bio: "Frontend developer passionate about UI/UX",
      location: "Austin, TX",
      website: "https://sarahw.dev",
      isVisible: true,
   },
   {
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "candidate" as const,
      githubUsername: "michaelbrown",
      score: 95,
      scoreBreakdown: { codeQuality: 96, activity: 94, followers: 95 },
      techStack: techStacks[4],
      bio: "Systems programmer focused on performance and reliability",
      location: "Portland, OR",
      website: null,
      isVisible: true,
   },
]

const mockRecruiters = [
   {
      name: "Tech Corp HR",
      email: "hr@techcorp.com",
      role: "recruiter" as const,
      companyName: "Tech Corp",
      companyWebsite: "https://techcorp.com",
      position: "Senior Recruiter",
      isVerified: true,
      isPublicProfile: true,
   },
   {
      name: "StartupXYZ Hiring",
      email: "hiring@startupxyz.io",
      role: "recruiter" as const,
      companyName: "StartupXYZ",
      companyWebsite: "https://startupxyz.io",
      position: "Talent Lead",
      isVerified: true,
      isPublicProfile: true,
   },
   {
      name: "Enterprise Solutions Inc",
      email: "recruit@enterprisesol.com",
      role: "recruiter" as const,
      companyName: "Enterprise Solutions Inc",
      companyWebsite: "https://enterprisesol.com",
      position: "HR Manager",
      isVerified: false,
      isPublicProfile: true,
   },
]

const mockAnalysis = [
   {
      repoUrl: "https://github.com/johndoe/ecommerce-api",
      name: "ecommerce-api",
      language: "TypeScript",
      stars: 1250,
      description: "A scalable e-commerce REST API built with Node.js",
      totalScore: 87.5,
      scoreBreakdown: { codeQuality: 90, documentation: 85, testing: 88 },
      feedback: ["Good code organization", "Consider adding more unit tests"],
      summary: "Well-structured API with excellent scalability potential",
   },
   {
      repoUrl: "https://github.com/janesmith/ml-pipeline",
      name: "ml-pipeline",
      language: "Python",
      stars: 890,
      description: "Machine learning data pipeline with MLflow integration",
      totalScore: 91.2,
      scoreBreakdown: { codeQuality: 93, documentation: 90, testing: 90 },
      feedback: ["Excellent documentation", "Great use of MLflow"],
      summary: "Production-ready ML pipeline with comprehensive logging",
   },
   {
      repoUrl: "https://github.com/alexj/k8s-configs",
      name: "k8s-configs",
      language: "YAML",
      stars: 567,
      description: "Kubernetes deployment configurations and Helm charts",
      totalScore: 82.3,
      scoreBreakdown: { codeQuality: 80, documentation: 85, testing: 82 },
      feedback: ["Good infrastructure as code practices"],
      summary: "Solid K8s configurations for microservices deployment",
   },
]

const mockContactRequests = [
   { message: "We have an exciting opportunity for a senior developer role" },
   { message: "Your profile caught our attention for a backend engineering position" },
   { message: "Would you be interested in discussing a full-stack role?" },
]

async function seed() {
   if (process.env.NODE_ENV !== "development") return

   console.log("🌱 Starting database seed...")

   console.log("Clearing existing data...")
   await db.delete(Schema.contactRequests)
   await db.delete(Schema.analysis)
   await db.delete(Schema.candidateProfiles)
   await db.delete(Schema.recruitersProfiles)
   await db.delete(Schema.session)
   await db.delete(Schema.account)
   await db.delete(Schema.verification)
   await db.delete(Schema.user)

   const candidateUserIds: string[] = []
   const recruiterUserIds: string[] = []

   console.log("Creating candidate users...")
   for (const candidate of mockCandidates) {
      const result = await auth.api.signUpEmail({
         body: {
            name: candidate.name,
            email: candidate.email,
            password: TEST_PASSWORD,
            role: candidate.role,
         },
      })
      const userId = result.user.id
      candidateUserIds.push(userId)
      await db
         .update(Schema.candidateProfiles)
         .set({
            githubUsername: candidate.githubUsername,
            score: candidate.score,
            scoreBreakdown: candidate.scoreBreakdown,
            techStack: candidate.techStack,
            bio: candidate.bio,
            location: candidate.location,
            website: candidate.website,
            isVisible: candidate.isVisible,
         })
         .where(eq(Schema.candidateProfiles.userId, userId))
      console.log(`  ✓ Created candidate: ${candidate.name}`)
   }

   console.log("Creating recruiter users...")
   for (const recruiter of mockRecruiters) {
      const result = await auth.api.signUpEmail({
         body: {
            name: recruiter.name,
            email: recruiter.email,
            password: TEST_PASSWORD,
            role: recruiter.role,
         },
      })
      const userId = result.user.id
      recruiterUserIds.push(userId)
      await db
         .update(Schema.recruitersProfiles)
         .set({
            companyName: recruiter.companyName,
            companyWebsite: recruiter.companyWebsite,
            position: recruiter.position,
            isVerified: recruiter.isVerified,
            isPublicProfile: recruiter.isPublicProfile,
         })
         .where(eq(Schema.recruitersProfiles.userId, userId))
      console.log(`  ✓ Created recruiter: ${recruiter.name}`)
   }

   console.log("Creating analysis records...")
   for (let i = 0; i < mockAnalysis.length; i++) {
      const analysis = mockAnalysis[i]
      await db.insert(Schema.analysis).values({
         id: crypto.randomUUID(),
         candidateId: candidateUserIds[i % candidateUserIds.length],
         repoUrl: analysis.repoUrl,
         name: analysis.name,
         language: analysis.language,
         stars: analysis.stars,
         description: analysis.description,
         totalScore: analysis.totalScore,
         scoreBreakdown: analysis.scoreBreakdown,
         feedback: analysis.feedback,
         summary: analysis.summary,
      })
      console.log(`  ✓ Created analysis: ${analysis.name}`)
   }

   console.log("Creating contact requests...")
   for (let i = 0; i < mockContactRequests.length; i++) {
      const request = mockContactRequests[i]
      await db.insert(Schema.contactRequests).values({
         id: crypto.randomUUID(),
         recruiterId: recruiterUserIds[i % recruiterUserIds.length],
         candidateId: candidateUserIds[i % candidateUserIds.length],
         message: request.message,
         status: i === 0 ? "accepted" : i === 1 ? "rejected" : "pending",
      })
      console.log(`  ✓ Created contact request`)
   }

   console.log("Seed completed successfully!")
   console.log(`\n Password for all users: ${TEST_PASSWORD}`)
}

seed().catch(err => {
   console.error(":: Seed failed:", err)
   process.exit(1)
})
