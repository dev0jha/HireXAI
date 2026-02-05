export interface DevelopersQuery {
   search?: string
   tech?: string
   sort?: "score-desc" | "score-asc" | "name-asc"
   page?: number
   limit?: number
}

export interface Developer {
   id: string
   name: string
   email: string
   username: string
   bio?: string | null
   location?: string | null
   linkedIn?: string | null
   website?: string | null
   techStack: string[]
   score: number
   isVisible: boolean
   createdAt: Date
}

export interface DevelopersResponse {
   developers: Developer[]
   meta: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
   }
}

export interface TechStackResponse {
   techStacks: string[]
}

export type GetDevelopersResponse = DevelopersResponse
export type GetTechStacksResponse = TechStackResponse
