
import React, { useState } from 'react';
import { AdvancedTutorialTopic, TutorialLanding, TutorialSummary } from '../components/TutorialSection';

const LEVELS = [
  "LEVEL 1: INTRO & DDL",
  "LEVEL 2: DML (INSERT/SELECT)",
  "LEVEL 3: WHERE & FILTERS",
  "LEVEL 4: AGGREGATIONS",
  "LEVEL 5: JOINS (INNER/LEFT)",
  "LEVEL 6: SUBQUERIES",
  "LEVEL 7: NORMALIZATION"
];

export const SQLTutorial: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-20">
      <TutorialLanding 
        title="SQL"
        icon="📊"
        meshClass="mesh-gradient-sql"
        subtitle="The standard for managing relational data. Learn to speak to databases and extract powerful insights through structured queries."
        features={[
          "Data Definition",
          "Data Manipulation",
          "Relational Logic",
          "Aggregate Analytics",
          "Query Optimization"
        ]}
      />

      <div className="sticky top-24 z-50 p-2 glass-card rounded-3xl border border-slate-100 shadow-xl flex gap-2 overflow-x-auto scrollbar-hide">
        {LEVELS.map((level, i) => (
          <button
            key={i}
            onClick={() => setActiveLevel(i)}
            className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeLevel === i 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
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
            id="sql-joins-inner"
            level={5}
            themeColor="emerald"
            name="Joins: INNER JOIN"
            explanation="INNER JOIN selects records that have matching values in both tables. It allows us to rebuild relationships that are split across multiple database tables."
            importantPoints={[
              "Returns records with matching values in both tables.",
              "Requires an ON clause to specify the link.",
              "It is the default join type if only 'JOIN' is written.",
              "Matches are typically between Primary and Foreign Keys."
            ]}
            asciiFlowchart={`[ Customers ]     [ Orders ]
      |               |
      |--- ID Match --|
      |       ↓       |
      [ Combined Data ]
      |   (Name, ID)  |`}
            imageDescription="Left table Customer. Right table Orders. Connection bridge labeled ON CustomerID. Merged results showing customer name next to their order."
            flowchartSteps={[
              "Identify the primary table (the 'From' source).",
              "Scan the second table for matching values on the link column.",
              "For every matching pair, combine the columns from both rows.",
              "Filter out any rows that do not have a corresponding match.",
              "Return the final relational result set."
            ]}
            syntax={`SELECT col1, col2\nFROM TableA\nINNER JOIN TableB\nON TableA.key = TableB.key;`}
            code={`-- Find students and their hostel room assignments\nSELECT Students.name, Hostels.room_no\nFROM Students\nINNER JOIN Hostels\nON Students.student_id = Hostels.student_id;`}
            sampleOutput="| name  | room_no |\n|-------|---------|\n| Alice | 101     |\n| Bob   | 204     |"
            executionExplanation="1. DBMS opens 'Students' table.\n2. It scans 'Hostels' for each student ID.\n3. Alice (ID 1) matches Room 101. Row created.\n4. Bob (ID 2) matches Room 204. Row created.\n5. Charlie (ID 3) has no room entry, so he is excluded."
            mistakes={[
              "Forgetting the ON clause (creates a Cartesian Product).",
              "Using ambiguous column names without table prefixing.",
              "Joining columns that don't share the same data type."
            ]}
            practiceTask="Write a query to join 'Employees' and 'Departments' to see who works in the 'Marketing' department."
            practiceQuestions={[
              "What happens if there's no match in an INNER JOIN?",
              "Can you join more than two tables in one query?",
              "What is an alias in SQL joins?"
            ]}
          />
        )}
      </div>

      <TutorialSummary 
        takeaways={[
          "SQL is declarative—you describe what you want, not how to get it.",
          "Joins are the heart of relational database power.",
          "Primary and Foreign keys maintain data integrity.",
          "Efficient queries are essential for high-performance apps."
        ]}
        bestPractices={[
          "Always use table aliases for clarity.",
          "Format your SQL with clear indentation.",
          "Only SELECT the columns you actually need.",
          "Test complex queries on small data samples first."
        ]}
      />
    </div>
  );
};
