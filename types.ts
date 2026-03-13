
export enum Language {
  PYTHON = 'Python',
  JAVASCRIPT = 'JavaScript',
  C = 'C',
  SQL = 'SQL',
  HTML = 'HTML',
  JAVA = 'Java',
  CSS = 'CSS'
}

export enum ForumCategory {
  BASICS = 'Basics',
  LOOPS = 'Loops',
  FUNCTIONS = 'Functions',
  OOP = 'OOP',
  DBMS = 'DBMS',
  PROJECTS = 'Projects',
  BUGS = 'Bug Help'
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'Learning' | 'Participation' | 'Achievement' | 'Consistency' | 'Mastery';
  unlocked: boolean;
  requirement: string;
}

export interface Certification {
  id: string;
  studentName: string;
  language: string;
  totalTopics: number;
  averageScore: number;
  performanceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  issueDate: string;
  certificateId: string;
}

export interface TopicScore {
  subjectId: string;
  topicName: string;
  score: number; // Correct answers count (out of 10)
  timestamp: number;
}

export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  problem: string;
  inputFormat: string;
  outputFormat: string;
  exampleInput: string;
  exampleOutput: string;
  starterCode: string;
  solutionCode: string;
  explanation: string;
  testCases: { input: string; output: string }[];
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  isBestAnswer?: boolean;
}

export interface ForumPost {
  id: string;
  author: string;
  authorLevel: number;
  title: string;
  content: string;
  language: Language;
  category: ForumCategory;
  tags: string[];
  upvotes: number;
  replies: ForumReply[];
  timestamp: Date;
  isSolved?: boolean;
}

export interface UserProgress {
  xp: number;
  level: number;
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  completedLessons: string[];
  badges: string[];
  streak: number;
  dailyPoints: number;
}
