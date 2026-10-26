export type Status = 'Completed' | 'In progress'

export type Qualification = {
  id: string
  qualification: string
  institution: string
  startYear?: number
  endYear?: number | 'Present'
  status: Status
  highlights?: string[]
}

// Newest first
export const qualifications: Qualification[] = [
  {
    id: 'centennial-set',
    qualification: 'Software Engineering Technology',
    institution: 'Centennial College',
    startYear: 2025,
    endYear: 'Present',
    status: 'In progress',
    highlights: [
      'Currently in third semester',
      'Earned A grades in the first two semesters',
      'Coursework in web development, Agile teamwork, and requirements engineering',
    ],
  },
  {
    id: 'high-school',
    qualification: 'Ontario Secondary School Diploma',
    institution: 'Brooklin High School',
    endYear: 2020,
    status: 'Completed',
  },
]