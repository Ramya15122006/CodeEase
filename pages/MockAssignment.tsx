
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correct: string;
  difficulty: 'Easy' | 'Medium';
}

const TOPIC_DATA: Record<string, { title: string; description: string; questions: Question[] }> = {
  c: {
    title: "C Language – Mastery Practice Test",
    description: "This test assesses your understanding of C basics, pointers, memory management, and control flow. Recommended for early-semester computer science students.",
    questions: [
      { id: 1, difficulty: 'Easy', question: "What is the correct return type for the main function in a standard C program?", options: [{label: 'A', text: 'void'}, {label: 'B', text: 'int'}, {label: 'C', text: 'char'}, {label: 'D', text: 'float'}], correct: 'B' },
      { id: 2, difficulty: 'Easy', question: "Which operator is used to find the size of a data type in bytes?", options: [{label: 'A', text: 'len()'}, {label: 'B', text: 'count()'}, {label: 'C', text: 'sizeof'}, {label: 'D', text: 'malloc'}], correct: 'C' },
      { id: 3, difficulty: 'Medium', question: "What is the value of result in: int result = (5 > 3) ? 10 : 20;", options: [{label: 'A', text: '5'}, {label: 'B', text: '3'}, {label: 'C', text: '10'}, {label: 'D', text: '20'}], correct: 'C' },
      { id: 4, difficulty: 'Medium', question: "In a switch statement, what happens if a 'break' keyword is omitted in a case?", options: [{label: 'A', text: 'Compiler error'}, {label: 'B', text: 'The next case also executes'}, {label: 'C', text: 'The program terminates'}, {label: 'D', text: 'The loop restarts'}], correct: 'B' },
      { id: 5, difficulty: 'Easy', question: "Which loop is guaranteed to execute at least once?", options: [{label: 'A', text: 'for'}, {label: 'B', text: 'while'}, {label: 'C', text: 'do-while'}, {label: 'D', text: 'None of the above'}], correct: 'C' },
      { id: 6, difficulty: 'Medium', question: "What does the 'static' keyword do to a local variable in C?", options: [{label: 'A', text: 'Makes it accessible globally'}, {label: 'B', text: 'Destroys it after function call'}, {label: 'C', text: 'Preserves its value between calls'}, {label: 'D', text: 'Changes its data type'}], correct: 'C' },
      { id: 7, difficulty: 'Medium', question: "What is a recursive function's base case used for?", options: [{label: 'A', text: 'To start the recursion'}, {label: 'B', text: 'To stop the recursion'}, {label: 'C', text: 'To define global variables'}, {label: 'D', text: 'To speed up computation'}], correct: 'B' },
      { id: 8, difficulty: 'Easy', question: "In C, if an array is defined as int arr[5], what is the index of the last element?", options: [{label: 'A', text: '0'}, {label: 'B', text: '4'}, {label: 'C', text: '5'}, {label: 'D', text: '6'}], correct: 'B' },
      { id: 9, difficulty: 'Medium', question: "If int *ptr points to an integer x, how do you access the value of x via ptr?", options: [{label: 'A', text: '&ptr'}, {label: 'B', text: 'ptr'}, {label: 'C', text: '*ptr'}, {label: 'D', text: 'x.ptr'}], correct: 'C' },
      { id: 10, difficulty: 'Medium', question: "Which operator is used to get the memory address of a variable?", options: [{label: 'A', text: '*'}, {label: 'B', text: '&'}, {label: 'C', text: '->'}, {label: 'D', text: '%'}], correct: 'B' }
    ]
  },
  python: {
    title: "Python – Mastery Practice Test",
    description: "Evaluates core Python proficiency including list comprehension, floor division, and dynamic typing behaviors. Suitable for beginners transition to intermediate scripts.",
    questions: [
      { id: 1, difficulty: 'Easy', question: "Which character is used to define a block of code in Python?", options: [{label: 'A', text: 'Curly braces'}, {label: 'B', text: 'Indentation'}, {label: 'C', text: 'Parentheses'}, {label: 'D', text: 'Semicolons'}], correct: 'B' },
      { id: 2, difficulty: 'Easy', question: "How do you create a list in Python?", options: [{label: 'A', text: '()'}, {label: 'B', text: '{}'}, {label: 'C', text: '[]'}, {label: 'D', text: '<>'}], correct: 'C' },
      { id: 3, difficulty: 'Medium', question: "What is the result of 10 // 3 in Python?", options: [{label: 'A', text: '3.33'}, {label: 'B', text: '3'}, {label: 'C', text: '4'}, {label: 'D', text: '0'}], correct: 'B' },
      { id: 4, difficulty: 'Easy', question: "Which keyword is used to handle multiple conditions after an 'if' statement?", options: [{label: 'A', text: 'elseif'}, {label: 'B', text: 'else if'}, {label: 'C', text: 'elif'}, {label: 'D', text: 'when'}], correct: 'C' },
      { id: 5, difficulty: 'Medium', question: "What is the output of: list(range(1, 10, 2))?", options: [{label: 'A', text: '[1, 2, 3]'}, {label: 'B', text: '[1, 3, 5, 7, 9]'}, {label: 'C', text: '[2, 4, 6, 8]'}, {label: 'D', text: '[1, 10, 2]'}], correct: 'B' },
      { id: 6, difficulty: 'Easy', question: "Which keyword is used to define a function in Python?", options: [{label: 'A', text: 'func'}, {label: 'B', text: 'function'}, {label: 'C', text: 'def'}, {label: 'D', text: 'define'}], correct: 'C' },
      { id: 7, difficulty: 'Medium', question: "What is the result of 'Python'[1:4]?", options: [{label: 'A', text: 'Pyth'}, {label: 'B', text: 'yth'}, {label: 'C', text: 'ytho'}, {label: 'D', text: 'Pyt'}], correct: 'B' },
      { id: 8, difficulty: 'Easy', question: "Which of the following data types is immutable?", options: [{label: 'A', text: 'List'}, {label: 'B', text: 'Dictionary'}, {label: 'C', text: 'Tuple'}, {label: 'D', text: 'Set'}], correct: 'C' },
      { id: 9, difficulty: 'Medium', question: "Which method is used to get all keys from a dictionary named 'data'?", options: [{label: 'A', text: 'data.get()'}, {label: 'B', text: 'data.keys()'}, {label: 'C', text: 'data.all()'}, {label: 'D', text: 'data.values()'}], correct: 'B' },
      { id: 10, difficulty: 'Medium', question: "What is the purpose of the 'global' keyword?", options: [{label: 'A', text: 'To declare a new variable'}, {label: 'B', text: 'To modify a variable outside current scope'}, {label: 'C', text: 'To import external modules'}, {label: 'D', text: 'To speed up execution'}], correct: 'B' }
    ]
  },
  java: {
    title: "Java – Mastery Practice Test",
    description: "This test focuses on Java Virtual Machine basics, OOP pillars, and exception handling logic. Ideal for preparing for university-level Java exams.",
    questions: [
      { id: 1, difficulty: 'Easy', question: "What is the primary purpose of the Java Virtual Machine (JVM)?", options: [{label: 'A', text: 'To compile Java code'}, {label: 'B', text: 'To execute Java bytecode'}, {label: 'C', text: 'To edit Java source files'}, {label: 'D', text: 'To design user interfaces'}], correct: 'B' },
      { id: 2, difficulty: 'Easy', question: "Which of these is a valid primitive data type for logical values in Java?", options: [{label: 'A', text: 'bool'}, {label: 'B', text: 'boolean'}, {label: 'C', text: 'Boolean'}, {label: 'D', text: 'logical'}], correct: 'B' },
      { id: 3, difficulty: 'Medium', question: "What is the output of: System.out.println(10 + 20 + \"Java\");?", options: [{label: 'A', text: '1020Java'}, {label: 'B', text: '30Java'}, {label: 'C', text: 'Java30'}, {label: 'D', text: 'Error'}], correct: 'B' },
      { id: 4, difficulty: 'Medium', question: "Which keyword is used to exit a loop immediately in Java?", options: [{label: 'A', text: 'stop'}, {label: 'B', text: 'exit'}, {label: 'C', text: 'break'}, {label: 'D', text: 'continue'}], correct: 'C' },
      { id: 5, difficulty: 'Easy', question: "Which OOP concept is used to hide internal details and show only functionality?", options: [{label: 'A', text: 'Inheritance'}, {label: 'B', text: 'Polymorphism'}, {label: 'C', text: 'Encapsulation'}, {label: 'D', text: 'Abstraction'}], correct: 'D' },
      { id: 6, difficulty: 'Medium', question: "What does the 'this' keyword refer to in Java?", options: [{label: 'A', text: 'Parent class'}, {label: 'B', text: 'Current class object'}, {label: 'C', text: 'Static variable'}, {label: 'D', text: 'The main method'}], correct: 'B' },
      { id: 7, difficulty: 'Easy', question: "A constructor in Java must have the same name as the:", options: [{label: 'A', text: 'Method'}, {label: 'B', text: 'Package'}, {label: 'C', text: 'Class'}, {label: 'D', text: 'Variable'}], correct: 'C' },
      { id: 8, difficulty: 'Medium', question: "Which keyword is used to implement inheritance in Java classes?", options: [{label: 'A', text: 'implements'}, {label: 'B', text: 'inherits'}, {label: 'C', text: 'extends'}, {label: 'D', text: 'using'}], correct: 'C' },
      { id: 9, difficulty: 'Easy', question: "Which block is used to handle an exception that might be thrown in a 'try' block?", options: [{label: 'A', text: 'handle'}, {label: 'B', text: 'catch'}, {label: 'C', text: 'finally'}, {label: 'D', text: 'error'}], correct: 'B' },
      { id: 10, difficulty: 'Medium', question: "What is a 'Checked Exception' in Java?", options: [{label: 'A', text: 'Exception handled by JVM'}, {label: 'B', text: 'Exception that must be handled or declared'}, {label: 'C', text: 'Logic error like div by 0'}, {label: 'D', text: 'Error during runtime'}], correct: 'B' }
    ]
  },
  sql: {
    title: "SQL – Mastery Practice Test",
    description: "Tests knowledge on relational database management, query construction, and data constraints. Essential for database administration and development foundations.",
    questions: [
      { id: 1, difficulty: 'Easy', question: "What does RDBMS stand for?", options: [{label: 'A', text: 'Relational Database Management System'}, {label: 'B', text: 'Runtime Database Management System'}, {label: 'C', text: 'Relational Data Model System'}, {label: 'D', text: 'Rapid Database Modern System'}], correct: 'A' },
      { id: 2, difficulty: 'Easy', question: "Which data type is used for variable-length strings in SQL?", options: [{label: 'A', text: 'CHAR'}, {label: 'B', text: 'VARCHAR'}, {label: 'C', text: 'INT'}, {label: 'D', text: 'FLOAT'}], correct: 'B' },
      { id: 3, difficulty: 'Medium', question: "Which keyword is used to return only unique values from a column?", options: [{label: 'A', text: 'UNIQUE'}, {label: 'B', text: 'SINGLE'}, {label: 'C', text: 'DISTINCT'}, {label: 'D', text: 'DIFFERENT'}], correct: 'C' },
      { id: 4, difficulty: 'Easy', question: "Which clause is used to filter records based on a condition?", options: [{label: 'A', text: 'FROM'}, {label: 'B', text: 'WHERE'}, {label: 'C', text: 'ORDER BY'}, {label: 'D', text: 'GROUP BY'}], correct: 'B' },
      { id: 5, difficulty: 'Medium', question: "Which join returns only the matching rows from both tables?", options: [{label: 'A', text: 'LEFT JOIN'}, {label: 'B', text: 'RIGHT JOIN'}, {label: 'C', text: 'INNER JOIN'}, {label: 'D', text: 'FULL JOIN'}], correct: 'C' },
      { id: 6, difficulty: 'Medium', question: "What happens if a row in the left table has no match in the right table during a LEFT JOIN?", options: [{label: 'A', text: 'Row is skipped'}, {label: 'B', text: 'Error is thrown'}, {label: 'C', text: 'Right side results are NULL'}, {label: 'D', text: 'The join converts to Inner Join'}], correct: 'C' },
      { id: 7, difficulty: 'Easy', question: "Which constraint uniquely identifies each record in a table?", options: [{label: 'A', text: 'UNIQUE'}, {label: 'B', text: 'NOT NULL'}, {label: 'C', text: 'PRIMARY KEY'}, {label: 'D', text: 'FOREIGN KEY'}], correct: 'C' },
      { id: 8, difficulty: 'Medium', question: "A table can have how many Primary Keys?", options: [{label: 'A', text: 'Zero'}, {label: 'B', text: 'One'}, {label: 'C', text: 'Multiple'}, {label: 'D', text: 'Depends on columns'}], correct: 'B' },
      { id: 9, difficulty: 'Medium', question: "Which clause is used with aggregate functions to group the result-set?", options: [{label: 'A', text: 'ORDER BY'}, {label: 'B', text: 'SORT BY'}, {label: 'C', text: 'GROUP BY'}, {label: 'D', text: 'AGGREGATE BY'}], correct: 'C' },
      { id: 10, difficulty: 'Medium', question: "What is the difference between WHERE and HAVING?", options: [{label: 'A', text: 'None'}, {label: 'B', text: 'HAVING is for individual rows'}, {label: 'C', text: 'HAVING is used for grouping conditions'}, {label: 'D', text: 'WHERE is only for numeric columns'}], correct: 'C' }
    ]
  },
  html: {
    title: "HTML – Mastery Practice Test",
    description: "Evaluates understanding of web document structure, semantic markup, and form elements. Key for frontend developers and UI/UX specialists.",
    questions: [
      { id: 1, difficulty: 'Easy', question: "Which HTML tag is the root element of an HTML page?", options: [{label: 'A', text: '<body>'}, {label: 'B', text: '<head>'}, {label: 'C', text: '<html>'}, {label: 'D', text: '<!DOCTYPE>'}], correct: 'C' },
      { id: 2, difficulty: 'Easy', question: "Which of the following is an example of a void (self-closing) element?", options: [{label: 'A', text: '<p>'}, {label: 'B', text: '<img>'}, {label: 'C', text: '<div>'}, {label: 'D', text: '<span>'}], correct: 'B' },
      { id: 3, difficulty: 'Easy', question: "Which heading tag defines the most important heading?", options: [{label: 'A', text: '<h6>'}, {label: 'B', text: '<head>'}, {label: 'C', text: '<h1>'}, {label: 'D', text: '<header>'}], correct: 'C' },
      { id: 4, difficulty: 'Medium', question: "How do you open a link in a new tab using the <a> tag?", options: [{label: 'A', text: 'target="_new"'}, {label: 'B', text: 'target="_blank"'}, {label: 'C', text: 'mode="new"'}, {label: 'D', text: 'href="new"'}], correct: 'B' },
      { id: 5, difficulty: 'Easy', question: "Which tag is used to define an item in an unordered list?", options: [{label: 'A', text: '<ol>'}, {label: 'B', text: '<li>'}, {label: 'C', text: '<ul>'}, {label: 'D', text: '<list>'}], correct: 'B' },
      { id: 6, difficulty: 'Medium', question: "Which attribute is used to make a table cell span multiple columns?", options: [{label: 'A', text: 'rowspan'}, {label: 'B', text: 'colspan'}, {label: 'C', text: 'span'}, {label: 'D', text: 'merge'}], correct: 'B' },
      { id: 7, difficulty: 'Medium', question: "What input type allows a user to select only one option from a group?", options: [{label: 'A', text: 'checkbox'}, {label: 'B', text: 'radio'}, {label: 'C', text: 'text'}, {label: 'D', text: 'range'}], correct: 'B' },
      { id: 8, difficulty: 'Easy', question: "The 'for' attribute of a <label> tag must match the ____ of the input element.", options: [{label: 'A', text: 'class'}, {label: 'B', text: 'id'}, {label: 'C', text: 'name'}, {label: 'D', text: 'type'}], correct: 'B' },
      { id: 9, difficulty: 'Medium', question: "What is the primary purpose of semantic tags like <section> or <article>?", options: [{label: 'A', text: 'To style the page'}, {label: 'B', text: 'To provide meaning to the content'}, {label: 'C', text: 'To create faster load times'}, {label: 'D', text: 'To replace CSS'}], correct: 'B' },
      { id: 10, difficulty: 'Medium', question: "Which attribute provides alternative text for an image if it cannot be displayed?", options: [{label: 'A', text: 'title'}, {label: 'B', text: 'src'}, {label: 'C', text: 'alt'}, {label: 'D', text: 'desc'}], correct: 'C' }
    ]
  }
};

export const MockAssignment: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentTopic = topic ? TOPIC_DATA[topic.toLowerCase()] : null;

  if (!currentTopic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-400">Practice Test Not Found</h2>
        <button onClick={() => navigate('/lessons')} className="mt-4 text-indigo-600 font-bold underline">Return to Tutorials</button>
      </div>
    );
  }

  const handleSelect = (qId: number, label: string) => {
    if (showResults) return;
    setUserAnswers(prev => ({ ...prev, [qId]: label }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    currentTopic.questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
        {/* Academic Header */}
        <div className="bg-slate-900 p-10 text-center text-white">
          <h1 className="text-3xl font-black mb-3">{currentTopic.title}</h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">{currentTopic.description}</p>
          <div className="mt-6 flex justify-center gap-8 text-xs font-bold tracking-widest uppercase text-indigo-400">
            <span>⏱️ 15 Minutes</span>
            <span>📝 10 Questions</span>
            <span>✅ Passing: 7/10</span>
          </div>
        </div>

        {showResults && (
          <div className="bg-indigo-50 p-8 text-center border-b border-indigo-100">
             <h2 className="text-4xl font-black text-indigo-900">Score: {score} / 10</h2>
             <p className="text-indigo-600 font-bold mt-1 uppercase tracking-widest text-xs">
               {score >= 7 ? "Assessment Passed – Excellent Work!" : "Review the Answer Key to improve your score."}
             </p>
          </div>
        )}

        {/* Questions Section */}
        <div className="p-8 md:p-12 space-y-12">
          {currentTopic.questions.map((q) => (
            <div key={q.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-black">{q.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {q.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">{q.question}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt) => {
                  const isSelected = userAnswers[q.id] === opt.label;
                  const isCorrect = q.correct === opt.label;
                  
                  let stateStyle = 'border-slate-100 hover:border-indigo-200';
                  if (showResults) {
                    if (isCorrect) stateStyle = 'border-emerald-500 bg-emerald-50';
                    else if (isSelected && !isCorrect) stateStyle = 'border-rose-500 bg-rose-50';
                  } else if (isSelected) {
                    stateStyle = 'border-indigo-600 bg-indigo-50 shadow-sm';
                  }

                  return (
                    <button 
                      key={opt.label}
                      disabled={showResults}
                      onClick={() => handleSelect(q.id, opt.label)}
                      className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${stateStyle}`}
                    >
                      <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {opt.label}
                      </span>
                      <span className="text-slate-700 text-sm font-medium">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Action & Answer Key */}
        <div className="p-10 bg-slate-50 border-t border-slate-100">
          {!showResults ? (
            <button 
              onClick={calculateScore}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl transition-all"
            >
              Submit Test & View Answers
            </button>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-700">
               <div className="p-6 bg-white border border-indigo-100 rounded-2xl">
                 <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4">Professor's Answer Key</h4>
                 <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-600">
                   {currentTopic.questions.map(q => (
                     <span key={q.id}>Q{q.id} – <span className="text-indigo-600">{q.correct}</span></span>
                   ))}
                 </div>
               </div>
               <div className="flex justify-center gap-4">
                  <button onClick={() => { setShowResults(false); setUserAnswers({}); }} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all">Retry Test</button>
                  <button onClick={() => navigate('/lessons')} className="px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all">Return to Tutorials</button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
