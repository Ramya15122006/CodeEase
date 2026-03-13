
import React, { useState } from 'react';
import { AdvancedTutorialTopic, TutorialLanding, TutorialSummary } from '../components/TutorialSection';

const LEVELS = [
  "LEVEL 1: STRUCTURE & HEAD",
  "LEVEL 2: TEXT & LINKS",
  "LEVEL 3: MEDIA (IMG/VID)",
  "LEVEL 4: LISTS & TABLES",
  "LEVEL 5: FORMS & INPUTS",
  "LEVEL 6: SEMANTIC HTML5",
  "LEVEL 7: SEO & ACCESSIBILITY"
];

export const HTMLTutorial: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-20">
      <TutorialLanding 
        title="HTML5"
        icon="🌐"
        meshClass="mesh-gradient-html"
        subtitle="The blueprint of the modern web. Learn to structure content that is readable by browsers, humans, and search engines alike."
        features={[
          "Semantic Tags",
          "Structured Content",
          "Multimedia Support",
          "Form Data Handling",
          "SEO Optimization"
        ]}
      />

      <div className="sticky top-24 z-50 p-2 glass-card rounded-3xl border border-slate-100 shadow-xl flex gap-2 overflow-x-auto scrollbar-hide">
        {LEVELS.map((level, i) => (
          <button
            key={i}
            onClick={() => setActiveLevel(i)}
            className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeLevel === i 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {activeLevel === 4 && (
          /* Added missing id and removed unsupported variations, interviewTips, and realWorldCase props */
          <AdvancedTutorialTopic
            id="html-forms-validation"
            level={5}
            themeColor="rose"
            name="Forms & Data Validation"
            explanation="HTML forms are the primary way users interact with the web. Using modern attributes allows the browser to validate data before it ever hits the server."
            importantPoints={[
              "The action attribute defines where data is sent.",
              "The method (GET/POST) defines how data travels.",
              "Name attributes are essential for server data retrieval.",
              "HTML5 attributes provide built-in client-side validation."
            ]}
            asciiFlowchart={`( User Submit )
        ↓
[ Check Required ]
        ↓
 < Match Pattern? >
   ├── No  → [ Error UI ]
   └── Yes → [ Send Data ]
        ↓
 ( Success Page )`}
            imageDescription="Submission trigger at top. Sequential validation checks. Decision fork leading to error handling or successful data transfer."
            flowchartSteps={[
              "User clicks the submit button inside the form.",
              "Browser scans all inputs for 'required' attributes.",
              "Constraint validation (type=email, minlength) is performed.",
              "If invalid, browser cancels navigation and displays tooltip.",
              "If valid, browser encodes data and sends to 'action' endpoint."
            ]}
            syntax={`<form action="/api" method="POST">\n  <input type="email" required>\n  <button type="submit">Send</button>\n</form>`}
            code={`<form action="/login" method="POST">\n  <div className="mb-4">\n    <label for="email">Email Address:</label>\n    <input type="email" id="email" name="user_email" required>\n  </div>\n\n  <div className="mb-4">\n    <label for="pass">Password (Min 8):</label>\n    <input type="password" id="pass" name="pwd" required minlength="8">\n  </div>\n\n  <button type="submit">Login Now</button>\n</form>`}
            sampleOutput="[Label: Email] [Input Box]\n[Label: Password] [Input Box]\n[Button: Login Now]"
            executionExplanation="1. The form wrapper groups inputs.\n2. input 'type=email' triggers built-in regex validation for @ and dots.\n3. minlength='8' ensures passwords aren't too short.\n4. 'name' attributes provide the keys for the server-side data map."
            mistakes={[
              "Forgetting the 'name' attribute on inputs (server receives nothing).",
              "Using <div> for buttons (breaks tab indexing and submit logic).",
              "Missing the 'for' attribute on labels (bad for screen readers)."
            ]}
            practiceTask="Add a checkbox for 'Remember Me' and a radio group for selecting 'Account Type' (Individual or Business)."
            practiceQuestions={[
              "What is the difference between GET and POST?",
              "Why is the 'id' attribute used on labels?",
              "What does the 'placeholder' attribute do?"
            ]}
          />
        )}
      </div>

      <TutorialSummary 
        takeaways={[
          "HTML defines the meaning and structure, not the style.",
          "Semantic tags (header, main, footer) are crucial for SEO.",
          "Forms are the bridge between the user and the database.",
          "Clean nesting makes for easier debugging and maintenance."
        ]}
        bestPractices={[
          "Always use labels for form inputs.",
          "Prefer semantic tags over generic <div> wherever possible.",
          "Validate as much as possible in HTML before using JS.",
          "Keep your document structure clear and indented."
        ]}
      />
    </div>
  );
};
