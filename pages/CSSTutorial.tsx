
import React, { useState } from 'react';
import { AdvancedTutorialTopic, TutorialLanding, TutorialSummary } from '../components/TutorialSection';

const LEVELS = [
  "LEVEL 1: CASCADE & SELECTORS",
  "LEVEL 2: BOX MODEL",
  "LEVEL 3: POSITIONING",
  "LEVEL 4: FLEXBOX",
  "LEVEL 5: GRID LOGIC",
  "LEVEL 6: ANIMATIONS",
  "LEVEL 7: RESPONSIVE DESIGN"
];

export const CSSTutorial: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-20">
      <TutorialLanding 
        title="CSS3"
        icon="🎨"
        meshClass="mesh-css"
        subtitle="The language of visual style. Master the cascading logic, layout systems, and artistic properties that transform code into beautiful experiences."
        features={[
          "Visual Presentation",
          "Layout Systems",
          "Responsive Design",
          "Cascading Logic",
          "Modern Animations"
        ]}
      />

      <div className="sticky top-24 z-50 p-2 glass-card rounded-3xl border border-slate-100 shadow-xl flex gap-2 overflow-x-auto scrollbar-hide">
        {LEVELS.map((level, i) => (
          <button
            key={i}
            onClick={() => setActiveLevel(i)}
            className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeLevel === i 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {activeLevel === 1 && (
          /* Added missing id and removed unsupported variations, interviewTips, and realWorldCase props */
          <AdvancedTutorialTopic
            id="css-box-model-mastery"
            level={2}
            themeColor="cyan"
            name="The Box Model"
            explanation="Every single element on a webpage is a rectangular box. Understanding how margins, borders, padding, and content interact is the secret to perfect layouts."
            importantPoints={[
              "Content: The actual text or image.",
              "Padding: Space inside the border.",
              "Border: The line around the padding.",
              "Margin: Space outside the border.",
              "box-sizing: border-box is a life-saver."
            ]}
            asciiFlowchart={`[  Margin   ]
  [ Border ]
    [ Padding ]
      [ Content ]`}
            imageDescription="A nested series of rectangles. The outer shell is Margin. Next layer in is Border. Third layer is Padding. The core is Content."
            flowchartSteps={[
              "Browser calculates the Content width/height.",
              "Padding is added to create internal breathing room.",
              "The Border is drawn around the combined area.",
              "The Margin is reserved as a invisible force-field outside.",
              "Final element size = Content + Padding + Border (if box-sizing allows)."
            ]}
            syntax={`.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n  margin: 10px;\n}`}
            code={`.card {\n    width: 250px;\n    padding: 24px;\n    background-color: white;\n    border: 4px solid #6366f1;\n    margin: 20px auto;\n    border-radius: 20px;\n}`}
            sampleOutput="[ 20px Margin ]\n[ 4px indigo Border ]\n[ 24px Padding ]\n[ Content Area ]"
            executionExplanation="1. The browser reserves 250px for the width.\n2. 24px of clear space is added inside the card.\n3. A solid indigo line is wrapped around that space.\n4. The margin: auto centers the entire box horizontally.\n5. border-radius curves the corners of the border and background."
            mistakes={[
              "Ignoring padding when calculating total width (leading to horizontal scrolls).",
              "Confusing padding (inside) with margin (outside).",
              "Forgetting that background-color applies to padding but not margin."
            ]}
            practiceTask="Create a box with a gradient background, 40px of padding, and a thick dashed margin. Observe how the dashed lines create space from other elements."
            practiceQuestions={[
              "What is box-sizing: border-box?",
              "How does margin: auto work?",
              "Can margins be negative?"
            ]}
          />
        )}

        {activeLevel === 0 && (
          <div className="p-12 text-center glass-premium rounded-[3.5rem] border border-cyan-100">
             <h2 className="text-3xl font-black text-slate-800 mb-4">Level 1: The Cascade</h2>
             <p className="text-slate-500 font-bold italic mb-8">Choose a specific topic like 'The Box Model' or 'Flexbox' to see the detailed logic breakdown.</p>
             <div className="flex justify-center gap-4">
               <button onClick={() => setActiveLevel(1)} className="px-8 py-3 bg-cyan-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Start Box Model Logic →</button>
             </div>
          </div>
        )}
      </div>

      <TutorialSummary 
        takeaways={[
          "CSS is the 'paint' and 'furniture' of the web house.",
          "Specific selectors override generic ones (Specificity).",
          "Everything in CSS follows the 'Box' philosophy.",
          "The 'Cascade' means code order and importance define the final look."
        ]}
        bestPractices={[
          "Avoid using !important unless absolutely necessary.",
          "Use relative units (rem, %, vh) for responsive layouts.",
          "Keep your CSS organized with comments and consistent naming.",
          "Prefer classes over IDs for styling."
        ]}
      />
    </div>
  );
};
