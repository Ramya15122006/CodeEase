
import React, { useState } from 'react';

interface VisualLogicTopic {
  title: string;
  logicFlow: string[];
  diagramDescription: string;
  intuitiveExplanation: string;
  exampleWalkthrough: string;
}

const PYTHON_LOGIC: VisualLogicTopic[] = [
  {
    title: "Program Execution Flow",
    logicFlow: [
      "Start → Entry Point (Top of script)",
      "Process → Read current line",
      "Process → Execute instruction",
      "Decision → Is there a next line?",
      "End → Final instruction complete"
    ],
    diagramDescription: "A vertical linear flowchart. A Start oval at the top leads to a series of rectangular Process blocks. Arrows point strictly downward unless a jump instruction (like a function) is encountered. The flow ends at a Finish oval.",
    intuitiveExplanation: "Think of a recipe. You start at the top and follow each instruction one by one until you reach the bottom of the page.",
    exampleWalkthrough: "Line 1 defines x, Line 2 defines y, Line 3 adds them. The computer creates the 'x' slot, then the 'y' slot, then calculates the sum in order."
  },
  {
    title: "Variables and Data Types",
    logicFlow: [
      "Process → Identify Variable Name",
      "Process → Calculate Value",
      "Decision → Does variable name exist in Memory?",
      "Process → Create/Update Memory Address with Value",
      "End → Link Name to Memory Address"
    ],
    diagramDescription: "A mapping diagram. On the left, a column of text labels (Variable Names). On the right, a series of boxes (Memory Slots) containing values. Arrows connect labels to specific slots.",
    intuitiveExplanation: "Variables are like luggage tags. The tag is the name, and the suitcase it is attached to is the actual data in the computer's memory.",
    exampleWalkthrough: "x = 10 creates a label 'x' and sticks it on a memory box containing the number 10. If we say x = 20, we move the 'x' tag to a new box."
  },
  {
    title: "Conditional Statements",
    logicFlow: [
      "Start → Reach IF gate",
      "Decision → Evaluate condition (True/False)",
      "Branch → If True: Enter indented block → Process instructions",
      "Branch → If False: Skip indented block → Check ELIF or ELSE",
      "End → Exit IF structure and continue script"
    ],
    diagramDescription: "A fork-in-the-road flowchart. A diamond-shaped decision block sits in the center. One arrow leads to a side process (True), while another arrow bypasses it (False) to join back with the main path later.",
    intuitiveExplanation: "It is a security guard at a gate. If you have the right ID (True), you get to enter the room. If not, you must stay in the hallway.",
    exampleWalkthrough: "If age > 18: The computer checks the age value. If 20, it enters the 'Allowed' block. If 15, it jumps over that code entirely."
  },
  {
    title: "Loops (For/While)",
    logicFlow: [
      "Start → Check Loop Condition/Sequence",
      "Decision → Is condition still met / are items left?",
      "Process → Execute code block once",
      "Process → Update counter or move to next item",
      "Loop → Return to condition check (Step 2)",
      "End → Condition False: Exit loop"
    ],
    diagramDescription: "A circular loop diagram. An entry arrow leads into a decision diamond. One path leads into a process block, which has an arrow looping back to the top of the diamond. A second exit arrow leads out of the cycle.",
    intuitiveExplanation: "It is like running laps on a track. You check if you have finished your laps; if not, you run another one and check again.",
    exampleWalkthrough: "for i in range(3): The computer sets i=0, runs code, sets i=1, runs code, sets i=2, runs code, then sees no more numbers and stops."
  }
];

const SQL_LOGIC: VisualLogicTopic[] = [
  {
    title: "Query Execution Flow",
    logicFlow: [
      "Process → FROM (Identify source table)",
      "Process → JOIN (Combine with other tables)",
      "Process → WHERE (Filter individual rows)",
      "Process → GROUP BY (Bucket the data)",
      "Process → HAVING (Filter the buckets)",
      "Process → SELECT (Pick specific columns)",
      "Process → ORDER BY (Sort final results)"
    ],
    diagramDescription: "A layered filter or funnel system. Data enters a large 'FROM' reservoir at the top. It passes through multiple filtering layers (WHERE, HAVING) and a 'SELECT' cutter before reaching the 'ORDER BY' sorter at the bottom.",
    intuitiveExplanation: "The computer does not read SQL in the order you write it. It finds the data first (FROM), filters it (WHERE), and only then decides which parts to show you (SELECT).",
    exampleWalkthrough: "In a query for expensive shoes, the computer first opens the 'Products' table, removes all non-shoe items, then hides everything but the Name and Price."
  },
  {
    title: "JOIN Matching Logic",
    logicFlow: [
      "Process → Pick first row from Table A",
      "Process → Scan Table B for matching ID",
      "Decision → Is there a match?",
      "Process → True: Combine columns and add to results",
      "Process → Repeat for all rows in Table A"
    ],
    diagramDescription: "A side-by-side table comparison. Arrows point from a specific cell in Table A to a corresponding cell in Table B. Only rows where arrows successfully connect are shown in the final combined table.",
    intuitiveExplanation: "Think of two lists: one for students and one for their grades. You look at a student's ID, then find that same ID in the grade book to see how they did.",
    exampleWalkthrough: "Orders JOIN Customers on CustomerID: For every order, the computer finds the customer with that ID and attaches their name to the order row."
  }
];

const HTML_LOGIC: VisualLogicTopic[] = [
  {
    title: "Browser Rendering Logic",
    logicFlow: [
      "Start → Receive HTML source code",
      "Process → Parse tags into DOM Tree (Structure)",
      "Process → Load and apply CSS (Style)",
      "Process → Calculate Layout (Geometry/Placement)",
      "Process → Paint pixels on screen",
      "End → Page ready for interaction"
    ],
    diagramDescription: "A assembly-line diagram. Raw text enters a parser. The parser outputs a branching tree structure (DOM). A style-sheet is applied over the tree like a blueprint, and finally, a 2D image is generated for the screen.",
    intuitiveExplanation: "The browser is an architect. It first builds the skeleton of the house (HTML), then decides on the paint and furniture (CSS), and finally lets you walk in.",
    exampleWalkthrough: "When you load a page, you might see the text appear for a split second (Structure) before the colors and fonts 'snap' into place (Style)."
  },
  {
    title: "Tag Nesting Logic",
    logicFlow: [
      "Start → Opening Tag encountered",
      "Process → Define Container boundaries",
      "Process → Place child content/tags inside boundaries",
      "Process → Close Inner Tags first",
      "End → Close Outer Tag last"
    ],
    diagramDescription: "A Russian Nesting Doll (Matryoshka) diagram. Each tag is a box. Smaller boxes are contained entirely within larger boxes. Arrows show that boxes must be closed in reverse order of how they were opened.",
    intuitiveExplanation: "Tags are like parenthesis in math. You cannot close a set of parentheses until all the ones inside it are already finished.",
    exampleWalkthrough: "<div><p>Hello</p></div>: The div starts a large container. The p starts a smaller one inside it. The p must finish before the div can conclude."
  }
];

export const VisualLibrary: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'Python' | 'SQL' | 'HTML'>('Python');

  const getLogicData = () => {
    switch (activeLang) {
      case 'SQL': return SQL_LOGIC;
      case 'HTML': return HTML_LOGIC;
      default: return PYTHON_LOGIC;
    }
  };

  return (
    <div className="space-y-12 pb-24">
      <header className="max-w-3xl">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Visual Logic Guide</h1>
        <p className="text-slate-500 mt-4 text-xl leading-relaxed">
          Master the internal mechanics of code. Stop memorizing syntax and start visualizing how data moves and decisions are made inside the program.
        </p>
      </header>

      <div className="flex gap-4 border-b border-slate-200 pb-px overflow-x-auto scrollbar-hide">
        {['Python', 'SQL', 'HTML'].map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang as any)}
            className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all relative ${
              activeLang === lang ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {lang}
            {activeLang === lang && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {getLogicData().map((topic, idx) => (
          <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/30">
              <h2 className="text-3xl font-black text-slate-900 mb-2">{topic.title}</h2>
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                Logic Architecture
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12">
              {/* Left Column: Logic Steps */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                    Visual Logic Flow
                  </h4>
                  <div className="space-y-3">
                    {topic.logicFlow.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-4 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-indigo-600 font-black text-xs">{sIdx + 1}</span>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    Intuitive Explanation
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-medium bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                    {topic.intuitiveExplanation}
                  </p>
                </div>
              </div>

              {/* Right Column: Visual and Walkthrough */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    Flow Diagram Description
                  </h4>
                  <div className="bg-slate-900 rounded-[2rem] p-8 text-indigo-100 text-sm leading-relaxed font-medium border-l-8 border-indigo-500">
                    {topic.diagramDescription}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-rose-500 rounded-full" />
                    Example Logic Walkthrough
                  </h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 italic text-slate-600 leading-relaxed">
                    {topic.exampleWalkthrough}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-6">Master the "Execution Brain"</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Every programming concept is just a series of small, logical steps. Once you can visualize how a computer processes an IF statement or a SQL JOIN, you can write code in any language.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 h-40 border border-white rounded-full opacity-20" />
        </div>
      </section>
    </div>
  );
};
