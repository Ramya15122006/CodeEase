
import { Language, ForumCategory, ForumPost, Badge } from './types';

export const BADGES: Badge[] = [
  { id: 'first-step', name: 'Explorer', icon: '🚀', description: 'Finished your first lesson!', category: 'Learning', unlocked: true, requirement: 'Complete 1 lesson' },
  { id: 'logic-master', name: 'Logician', icon: '🧩', description: 'Visualized code logic 5 times.', category: 'Achievement', unlocked: false, requirement: '5 Logic Visualizations' },
  { id: 'stack-jr', name: 'Helper Bee', icon: '🐝', description: 'Gave a helpful answer in the forum.', category: 'Participation', unlocked: true, requirement: '1 First Reply' },
  { id: 'python-pro', name: 'Python', icon: '🐍', description: 'Mastered Python basics.', category: 'Learning', unlocked: false, requirement: 'Complete Python Path' },
  { id: 'sql-wizard', name: 'Data Seer', icon: '📊', description: 'Wrote a complex SQL query.', category: 'Learning', unlocked: false, requirement: 'Complete SQL Path' },
  { id: 'bug-hunter', name: 'Bug Hunter', icon: '🐛', description: 'Helped someone fix a logic error.', category: 'Participation', unlocked: false, requirement: '1 Best Answer' },
  { id: 'consistent', name: 'On Fire', icon: '🔥', description: 'Maintained a 7-day streak.', category: 'Consistency', unlocked: false, requirement: '7 Day Streak' },
  // Mastery Badges
  { id: 'c-master', name: 'C Master', icon: '🛡️', description: 'Completed all topics in C Programming.', category: 'Mastery', unlocked: false, requirement: 'Finish C Exam Hall' },
  { id: 'python-master', name: 'Python Master', icon: '👑', description: 'Completed all topics in Python.', category: 'Mastery', unlocked: false, requirement: 'Finish Python Exam Hall' },
  { id: 'java-master', name: 'Java Master', icon: '💎', description: 'Completed all topics in Java.', category: 'Mastery', unlocked: false, requirement: 'Finish Java Exam Hall' },
];

export const LESSONS = [
  {
    id: 'python-basics',
    title: 'Python Variables',
    description: 'Learn how to store data in Python using labels called variables.',
    language: Language.PYTHON,
    difficulty: 'Beginner',
    steps: [
      {
        title: 'Creating Variables',
        content: 'In Python, creating a variable is as simple as picking a name and using the equals sign (=) to give it a value.',
        task: 'Create a variable named "score" and set it to 100.',
        codeSnippet: 'score = ',
        solutionRegex: 'score\\s*=\\s*100'
      }
    ]
  },
  {
    id: 'c-basics',
    title: 'C Basics: printf',
    description: 'Master the basic output function in C.',
    language: Language.C,
    difficulty: 'Beginner',
    steps: [
      {
        title: 'The printf Gate',
        content: 'printf is your way of telling the computer to show something on the screen. It lives in the <stdio.h> library.',
        task: 'Modify the code to print "Ready" inside the main function.',
        codeSnippet: '#include <stdio.h>\n\nint main() {\n  printf("");\n  return 0;\n}',
        solutionRegex: 'printf\\s*\\(\\s*["\']Ready["\']\\s*\\)\\s*;'
      }
    ]
  }
];

export const MOCK_FORUM: ForumPost[] = [
  {
    id: '1',
    author: 'SamCode',
    authorLevel: 5,
    title: 'Why do we use semicolons in C?',
    language: Language.C,
    category: ForumCategory.BASICS,
    tags: ['beginner', 'syntax'],
    content: 'It feels like extra work. Why doesn\'t the computer just know where the line ends?',
    upvotes: 15,
    timestamp: new Date(Date.now() - 86400000),
    isSolved: true,
    replies: [
      { 
        id: 'r1', 
        author: 'MentorMel', 
        content: 'Great question! Think of it like a period at the end of a sentence. In C, it tells the compiler "The instruction ends here". This allows us to write multiple commands on one line if we wanted to (though it is messy!).', 
        timestamp: new Date(),
        upvotes: 10,
        isBestAnswer: true
      }
    ]
  }
];

export const XP_TABLE = {
  POST_QUESTION: 5,
  GIVE_ANSWER: 10,
  BEST_ANSWER: 25,
  UPVOTE_RECEIVED: 2,
  DAILY_LOGIN: 5,
  COMPLETE_LESSON: 50
};
