
import React, { useState } from 'react';
import { AdvancedTutorialTopic, TutorialLanding, TutorialSummary } from '../components/TutorialSection';

const LEVELS = [
  "LEVEL 1: BASICS & ENGINES",
  "LEVEL 2: VARIABLES & SCOPE",
  "LEVEL 3: ARROW FUNCTIONS",
  "LEVEL 4: DOM & EVENTS",
  "LEVEL 5: ASYNC & PROMISES",
  "LEVEL 6: ES6+ FEATURES",
  "LEVEL 7: BROWSER APIS"
];

export const JavaScriptTutorial: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-20">
      <TutorialLanding 
        title="JavaScript"
        icon="📜"
        meshClass="mesh-gradient-js"
        subtitle="The language of the web. From simple animations to complex single-page applications and server-side environments."
        features={[
          "Event Driven",
          "Asynchronous Logic",
          "Prototype Based",
          "DOM Manipulation",
          "Full-Stack Potential"
        ]}
      />

      <div className="sticky top-24 z-50 p-2 glass-card rounded-3xl border border-slate-100 shadow-xl flex gap-2 overflow-x-auto scrollbar-hide">
        {LEVELS.map((level, i) => (
          <button
            key={i}
            onClick={() => setActiveLevel(i)}
            className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeLevel === i 
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {activeLevel === 0 && (
          /* Added missing id and removed unsupported variations, interviewTips, and realWorldCase props */
          <AdvancedTutorialTopic
            id="js-engine-basics"
            level={1}
            themeColor="amber"
            name="The JS Engine & console.log"
            explanation="JavaScript is a single-threaded, non-blocking language. The engine (like V8 in Chrome) parses code and executes it. console.log() is your portal to debugging."
            importantPoints={[
              "JS engine executes code single-threadedly.",
              "console.log() outputs data to the debugger console.",
              "JS is case-sensitive (console vs Console).",
              "Expressions evaluate before being logged."
            ]}
            asciiFlowchart={`( Start Execution )
         ↓
[ Engine Loads Script ]
         ↓
 [ AST Parser Logic ]
         ↓
 [ Execution Context ]
         ↓
/ Log to Console /
         ↓
( End Script )`}
            imageDescription="Main entry leading to Engine. Parser box transforming code. Context circle where code lives. Output parallelogram to the console UI."
            flowchartSteps={[
              "Browser encounters script tags or file reference.",
              "V8 Engine parses text into Abstract Syntax Tree (AST).",
              "Execution context allocates memory for variables.",
              "The log method is invoked with the evaluated expression.",
              "Context is cleared and execution halts."
            ]}
            syntax={`console.log("Hello JS!");\nconsole.warn("Watch out!");`}
            code={`console.log("Welcome to CodeEase!");\nconsole.log(10 + 20);\n\nlet message = "Variable logging";\nconsole.log(message);`}
            sampleOutput="Welcome to CodeEase!\n30\nVariable logging"
            executionExplanation="1. First string literal is evaluated and printed.\n2. Math expression (10+20) results in 30, then printed.\n3. Variable 'message' is looked up in memory and its value printed."
            mistakes={[
              "Typing 'Console.log' (Must be lowercase 'c').",
              "Forgetting parentheses around the log content.",
              "Attempting to log variables that haven't been defined yet."
            ]}
            practiceTask="Print the results of 10 multiplied by 5, and then log your own name with a 'Hello' greeting prefix."
            practiceQuestions={[
              "What is the V8 engine?",
              "Why is case sensitivity important in JS?",
              "Where do you open the console in Chrome?"
            ]}
          />
        )}
      </div>

      <TutorialSummary 
        takeaways={[
          "JS runs in almost every browser on Earth.",
          "Single-threaded means it does one thing at a time, but very fast.",
          "The console is your best friend for fixing broken code.",
          "Asynchronous code allows the UI to stay smooth while data loads."
        ]}
        bestPractices={[
          "Use 'let' and 'const' instead of 'var' for better scope control.",
          "Always use meaningful variable names.",
          "Use console.log strategically to track variable values.",
          "Keep your scripts modular and clean."
        ]}
      />
    </div>
  );
};
