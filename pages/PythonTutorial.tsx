
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdvancedTutorialTopic, TutorialLanding, TutorialSummary } from '../components/TutorialSection';

const PYTHON_TUTORIAL_DATA = [
  {
    title: "LEVEL 1: PYTHON BASICS",
    topics: [
      {
        id: "py-intro",
        name: "Introduction",
        explanation: "Python is a high-level, interpreted language known for its simplicity and readability. It's the #1 choice for AI and Automation.",
        importantPoints: ["Easy to learn: Syntax resembles English.", "Interpreted: Code runs line by line.", "Versatile: Used in Web, AI, Data Science."],
        syntax: "print('Hello Python')",
        code: "print('Welcome to CodeEase!')\nprint('Python makes logic simple.')",
        sampleOutput: "Welcome to CodeEase!\nPython makes logic simple.",
        asciiFlowchart: "( Start )\n    ↓\n[ Load Interpreter ]\n    ↓\n[ Read Script ]\n    ↓\n/ Output results /\n    ↓\n( End )",
        flowchartSteps: ["Open Python Interpreter", "Read source code", "Execute instructions", "Display results"],
        executionExplanation: "The Python interpreter reads your code, translates it to bytecode, and runs it instantly.",
        practiceTask: "Print 'Mission Start: Python' to the console.",
        practiceQuestions: ["Use the print function", "Wrap text in quotes"],
        mistakes: ["Capitalizing Print (must be print)", "Missing closing quotes"],
        mcqs: [
          { question: "Is Python compiled or interpreted?", options: ["Compiled", "Interpreted", "Both"], correct: 1 },
          { question: "Who created Python?", options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling"], correct: 0 },
          { question: "Python is mostly used for?", options: ["AI & Data", "Only Windows Apps", "Game Engines only"], correct: 0 }
        ]
      },
      {
        id: "py-install",
        name: "Installation",
        explanation: "To run Python locally, you need the Python interpreter installed from python.org.",
        importantPoints: ["Check version: python --version.", "IDLE: Built-in development environment.", "PIP: Python's package manager."],
        syntax: "# No code syntax, just command line:\npython script.py",
        code: "import sys\nprint(f'Python version: {sys.version}')",
        sampleOutput: "Python version: 3.10...",
        asciiFlowchart: "( Start )\n    ↓\n[ Download Setup ]\n    ↓\n[ Run Installer ]\n    ↓\n< Add to PATH? >\n├── Yes → [ Verify Version ]\n└── No  → / Error State /\n    ↓\n( End )",
        flowchartSteps: ["Get Installer", "Run Setup", "Enable 'Add to PATH'", "Run terminal check"],
        executionExplanation: "Installing Python puts the engine in your computer's system path so it can be called from anywhere.",
        practiceTask: "Import the 'platform' module and print the system name.",
        practiceQuestions: ["import platform", "print(platform.system())"],
        mistakes: ["Forgetting to check 'Add to PATH' during install"],
        mcqs: [
          { question: "Official website?", options: ["python.com", "python.org", "py.dev"], correct: 1 },
          { question: "Package manager name?", options: ["npm", "pip", "apt"], correct: 1 },
          { question: "Check version command?", options: ["python -v", "python --version", "py -show"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 2: VARIABLES & I/O",
    topics: [
      {
        id: "py-input",
        name: "input()",
        explanation: "The input() function allows your program to receive data from the user.",
        importantPoints: ["Always returns a string.", "Prompt is optional but helpful.", "Program pauses until Enter is hit."],
        syntax: "val = input('Prompt text')",
        code: "name = input('Enter name: ')\nprint('Hi ' + name + '!')",
        sampleOutput: "Enter name: user\nHi user!",
        asciiFlowchart: "( Start )\n    ↓\n/ Display Prompt /\n    ↓\n[ Wait for User ]\n    ↓\n/ Read String /\n    ↓\n[ Store variable ]\n    ↓\n( End )",
        flowchartSteps: ["Print prompt message", "Await keyboard interrupt", "Buffer input string", "Assign to variable"],
        executionExplanation: "The interpreter stops execution and waits for the standard input stream to send characters.",
        practiceTask: "Ask for a user's favorite color and print 'X is a great color!'.",
        practiceQuestions: ["Use input()", "Concatenate strings"],
        mistakes: ["Expecting an integer result from input()", "Missing the prompt string"],
        mcqs: [
          { question: "input() return type?", options: ["int", "string", "float"], correct: 1 },
          { question: "How to stop input pause?", options: ["Click mouse", "Hit Enter", "Type exit"], correct: 1 },
          { question: "Is input() a keyword?", options: ["Yes", "No (it's a function)"], correct: 1 }
        ]
      },
      {
        id: "py-casting",
        name: "Casting",
        explanation: "Casting is the process of converting one data type into another.",
        importantPoints: ["int(): To integer.", "str(): To string.", "float(): To decimal."],
        syntax: "num = int('10')",
        code: "s = '100'\nn = int(s)\nprint(n + 50)",
        sampleOutput: "150",
        asciiFlowchart: "( Start )\n    ↓\n/ Input Value /\n    ↓\n[ Check Logic ]\n    ↓\n< Valid Type? >\n├── Yes → [ Convert Data ]\n└── No  → / Raise Error /\n    ↓\n/ Return New Type /\n    ↓\n( End )",
        flowchartSteps: ["Take source value", "Check if compatible", "Allocate new memory as new type", "Copy/Convert data"],
        executionExplanation: "Python attempts to re-interpret the bit pattern of data as a different type.",
        practiceTask: "Convert 10.9 to an integer and print it.",
        practiceQuestions: ["Use int()", "Observe truncation"],
        mistakes: ["Casting letters to int (int('abc'))"],
        mcqs: [
          { question: "int(10.9) result?", options: ["10.9", "11", "10"], correct: 2 },
          { question: "Convert int to str?", options: ["str()", "string()", "toString()"], correct: 0 },
          { question: "Required for math on inputs?", options: ["Casting", "Slicing", "Looping"], correct: 0 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 3: OPERATORS & CONDITIONS",
    topics: [
      {
        id: "py-operators",
        name: "Arithmetic & Comparison",
        explanation: "Operators allow you to perform math and logic. Arithmetic handles numbers, while comparison returns True or False.",
        importantPoints: ["Arithmetic: +, -, *, /, //, %, **", "Comparison: ==, !=, >, <", "Logical: and, or, not"],
        syntax: "result = (5 + 2) * 10\nis_equal = (a == b)",
        code: "a = 10\nb = 3\n\nprint(f'Sum: {a + b}')\nprint(f'Floor Div: {a // b}')\nprint(f'Power: {a ** b}')\nprint(f'Greater? {a > b}')",
        sampleOutput: "Sum: 13\nFloor Div: 3\nPower: 1000\nGreater? True",
        asciiFlowchart: "( Start )\n    ↓\n/ Input Operands /\n    ↓\n[ Execute Op ]\n    ↓\n/ Return Result /\n    ↓\n( End )",
        flowchartSteps: ["Load values into memory", "Execute ALU instruction", "Store result in target", "Output to console"],
        executionExplanation: "Arithmetic operators return numeric values, whereas comparison operators return boolean flags (True/False).",
        practiceTask: "Calculate the area of a circle with radius 5 (Radius squared * 3.14).",
        practiceQuestions: ["Use ** for power", "Define radius = 5"],
        mistakes: ["Using = (assignment) instead of == (comparison)", "Confusing / with //"],
        mcqs: [
          { question: "Operator for remainder?", options: ["/", "//", "%"], correct: 2 },
          { question: "Result of 5 // 2?", options: ["2.5", "2", "3"], correct: 1 },
          { question: "Operator for power?", options: ["^", "**", "pow"], correct: 1 }
        ]
      },
      {
        id: "py-conditions",
        name: "if / elif / else",
        explanation: "Conditions act as forks in the road. Code only runs if its condition evaluates to True.",
        importantPoints: ["if: Standard check", "elif: Check if previous failed", "else: Final fallback"],
        syntax: "if condition:\n    # logic\nelif cond2:\n    # logic\nelse:\n    # logic",
        code: "score = 85\n\nif score >= 90:\n    print('Grade: A')\nelif score >= 80:\n    print('Grade: B')\nelse:\n    print('Grade: C')",
        sampleOutput: "Grade: B",
        asciiFlowchart: "( Start )\n    ↓\n< Evaluate Cond 1? >\n├── True  → / Task A /\n└── False → < Evaluate Cond 2? >\n              ├── True  → / Task B /\n              └── False → / Task C /\n    ↓\n( End )",
        flowchartSteps: ["Evaluate boolean expression", "Check indentation block", "Jump to code segment", "Resume main flow"],
        executionExplanation: "The interpreter checks each condition sequentially and only executes the first block that matches.",
        practiceTask: "Take a number from user. Print if it is Positive, Negative, or Zero.",
        practiceQuestions: ["Use int(input())", "Use if, elif, else"],
        mistakes: ["Missing colon (:) after condition", "Incorrect indentation"],
        mcqs: [
          { question: "Symbol for 'not equal'?", options: ["<>", "!=", "not="], correct: 1 },
          { question: "Python block requirement?", options: ["Curly braces", "Indentation", "Semicolons"], correct: 1 },
          { question: "Keyword for 'else if'?", options: ["elseif", "elif", "else if"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 4: LOOPS",
    topics: [
      {
        id: "py-loops-for",
        name: "For Loops & range()",
        explanation: "For loops repeat code for a fixed number of times or across items in a collection.",
        importantPoints: ["Iterates over sequences", "range(start, stop, step)", "Finite by design"],
        syntax: "for i in range(5):\n    print(i)",
        code: "print('Counting...')\nfor i in range(1, 4):\n    print(f'Step {i}')\n\nprint('\\nIterating List:')\nfruits = ['apple', 'banana']\nfor f in fruits:\n    print(f'I like {f}')",
        sampleOutput: "Counting...\nStep 1\nStep 2\nStep 3\n\nIterating List:\nI like apple\nI like banana",
        asciiFlowchart: "( Start )\n    ↓\n[ Init Iterator ]\n    ↓\n< Has Next Item? >\n│ ├── Yes → [ Run Body ]\n│ │          ↓\n│ │         [ Next Item ]\n│ │          ↓\n│ └──────────┘\n└── No → ( End )",
        flowchartSteps: ["Fetch next item from iterator", "Map item to loop variable", "Run indented code", "Loop back to check"],
        executionExplanation: "Python handles the iteration pointer automatically, moving from the first element to the last.",
        practiceTask: "Print all even numbers from 1 to 10.",
        practiceQuestions: ["Use range(2, 11, 2)", "Loop 5 times"],
        mistakes: ["Off-by-one errors with range() stop value", "Infinite loops (rare in for)"],
        mcqs: [
          { question: "range(5) goes from?", options: ["1 to 5", "0 to 4", "0 to 5"], correct: 1 },
          { question: "Keyword to start loop?", options: ["repeat", "loop", "for"], correct: 2 },
          { question: "To skip one iteration?", options: ["pass", "continue", "skip"], correct: 1 }
        ]
      },
      {
        id: "py-loops-while",
        name: "While Loops",
        explanation: "While loops run as long as a condition remains True. Ideal for tasks where the end count is unknown.",
        importantPoints: ["Condition-based looping", "Risk of infinite loops", "Manual counter update"],
        syntax: "while condition:\n    # logic\n    update_counter",
        code: "count = 1\nwhile count <= 3:\n    print(f'Loop {count}')\n    count += 1",
        sampleOutput: "Loop 1\nLoop 2\nLoop 3",
        asciiFlowchart: "( Start )\n    ↓\n< Condition True? >\n│ ├── Yes → [ Run Body ]\n│ │          ↓\n│ │         [ Update Logic ]\n│ │          ↓\n│ └──────────┘\n└── No → ( End )",
        flowchartSteps: ["Check boolean condition", "Execute block if True", "Modify variables in body", "Return to check step"],
        executionExplanation: "The program checks the 'gate' condition before every single pass of the loop.",
        practiceTask: "Create a 'Guessing Game' loop that runs until user inputs 'quit'.",
        practiceQuestions: ["Initialize input var", "Check input != 'quit'"],
        mistakes: ["Forgetting to update the counter", "Condition always being True"],
        mcqs: [
          { question: "When to use While?", options: ["Known iterations", "Unknown iterations", "Always"], correct: 1 },
          { question: "Force stop a loop?", options: ["exit", "break", "stop"], correct: 1 },
          { question: "Infinite loop trigger?", options: ["count = 0", "while True:", "while False:"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 5: FUNCTIONS",
    topics: [
      {
        id: "py-funcs-def",
        name: "Defining & Calling",
        explanation: "Functions are reusable blocks of code. They help you avoid repeating logic ('Don't Repeat Yourself').",
        importantPoints: ["def keyword", "Reusable blueprint", "Call with ()"],
        syntax: "def greet():\n    print('Hello')",
        code: "def welcome():\n    print('--- CodeEase Console ---')\n    print('Initializing Logic...')\n\nwelcome()\nprint('Working...')\nwelcome()",
        sampleOutput: "--- CodeEase Console ---\nInitializing Logic...\nWorking...\n--- CodeEase Console ---\nInitializing Logic...",
        asciiFlowchart: "( Start )\n    ↓\n[ Define Func ]\n    ↓\n[ Encounter Call ]\n    ↓\n[ Save Context ]\n    ↓\n[ Jump to logic ]\n    ↓\n[ Execute ]\n    ↓\n/ Return Flow /\n    ↓\n( End )",
        flowchartSteps: ["Allocate function memory", "Encounter function call", "Save current PC state", "Jump to function address", "Resume main logic"],
        executionExplanation: "Defining a function just saves the logic for later. Calling it is what actually runs the code.",
        practiceTask: "Define a function 'show_menu' and call it twice.",
        practiceQuestions: ["Use def keyword", "Indent properly"],
        mistakes: ["Calling function before defining it", "Missing parentheses in call"],
        mcqs: [
          { question: "Keyword to create function?", options: ["func", "def", "create"], correct: 1 },
          { question: "Correct call syntax?", options: ["greet", "greet[]", "greet()"], correct: 2 },
          { question: "Is indentation required?", options: ["Yes", "No", "Optional"], correct: 0 }
        ]
      },
      {
        id: "py-funcs-args",
        name: "Arguments & Return",
        explanation: "Functions become powerful when they can accept data (Arguments) and give back results (Return).",
        importantPoints: ["Arguments: Input data", "Return: Logic output", "Variables are local to function"],
        syntax: "def add(a, b):\n    return a + b",
        code: "def square(num):\n    return num * num\n\nresult = square(4)\nprint(f'4 squared is {result}')\n\ndef greet(name='Student'):\n    print(f'Hi {name}!')\n\ngreet('Ram')\ngreet()",
        sampleOutput: "4 squared is 16\nHi Ram!\nHi Student!",
        asciiFlowchart: "( Start )\n    ↓\n/ Input Args /\n    ↓\n[ Local Scope ]\n    ↓\n[ Compute Logic ]\n    ↓\n/ Return result /\n    ↓\n( End )",
        flowchartSteps: ["Pass arguments to local scope", "Compute internal logic", "Return pointer to result", "Exit function scope"],
        executionExplanation: "Return immediately exits the function and passes the resulting object back to the line that called it.",
        practiceTask: "Create a function 'find_max' that takes two numbers and returns the larger one.",
        practiceQuestions: ["Use if-else inside", "Use return"],
        mistakes: ["Printing inside instead of returning", "Misaligned parameter count"],
        mcqs: [
          { question: "To send data out of function?", options: ["output", "send", "return"], correct: 2 },
          { question: "Default parameter used when?", options: ["Always", "Never", "No arg provided"], correct: 2 },
          { question: "Scope of function variables?", options: ["Global", "Local", "Static"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 6: STRINGS",
    topics: [
      {
        id: "py-strings-slicing",
        name: "Indexing & Slicing",
        explanation: "Strings are sequences. You can grab specific characters (Indexing) or parts of the string (Slicing).",
        importantPoints: ["0-based index", "Negative indexing (starts -1)", "Slicing: [start:stop:step]"],
        syntax: "s = 'Code'\nfirst = s[0]\npart = s[0:2]",
        code: "word = 'Logic'\nprint(f'First char: {word[0]}')\nprint(f'Last char: {word[-1]}')\nprint(f'Slice (0:2): {word[0:2]}')\nprint(f'Reverse: {word[::-1]}')",
        sampleOutput: "First char: L\nLast char: c\nSlice (0:2): Lo\nReverse: cigoL",
        asciiFlowchart: "( Start )\n    ↓\n[ Locate Address ]\n    ↓\n[ Calc Offset ]\n    ↓\n[ Extract Segment ]\n    ↓\n/ Return Obj /\n    ↓\n( End )",
        flowchartSteps: ["Locate string start address", "Calculate offset * byte size", "Extract bit segment", "Convert to char object"],
        executionExplanation: "Indexing finds a single character at a specific offset. Slicing creates a brand new string from a range of indices.",
        practiceTask: "Extract 'Code' from 'CodeEase' and print it.",
        practiceQuestions: ["Use slicing", "Identify start/stop indices"],
        mistakes: ["Index out of range", "Confusing 0 with 1 as start"],
        mcqs: [
          { question: "Index of first char?", options: ["0", "1", "-1"], correct: 0 },
          { question: "'Python'[:2] result?", options: ["Py", "Pyt", "yt"], correct: 0 },
          { question: "Index of last char?", options: ["0", "last", "-1"], correct: 2 }
        ]
      },
      {
        id: "py-strings-methods",
        name: "String Methods",
        explanation: "Python strings come with built-in tools to transform text instantly.",
        importantPoints: ["Strings are immutable (original doesn't change)", "upper(), lower(), strip()", "replace(), find(), split()"],
        syntax: "text.upper()",
        code: "msg = '  python logic  '\nprint(f'Clean: \"{msg.strip().capitalize()}\"')\nprint(f'Replace: {msg.replace(\"logic\", \"power\")}')\nprint(f'Split: {msg.split()}')",
        sampleOutput: "Clean: \"Python logic\"\nReplace:   python power  \nSplit: ['python', 'logic']",
        asciiFlowchart: "( Start )\n    ↓\n[ Access Object ]\n    ↓\n[ Call Method ]\n    ↓\n[ New Memory ]\n    ↓\n/ Return result /\n    ↓\n( End )",
        flowchartSteps: ["Access string attributes", "Run string-class algorithm", "Allocate new string object", "Map transformed data"],
        executionExplanation: "Since strings are immutable, methods return a *new* string instead of changing the old one.",
        practiceTask: "Take a user's name and print it in ALL CAPS.",
        practiceQuestions: ["Use .upper()", "input()"],
        mistakes: ["Expecting original variable to change", "Missing () in method call"],
        mcqs: [
          { question: "Change to uppercase?", options: ["UP()", "upper()", "Capital()"], correct: 1 },
          { question: "Remove spaces from ends?", options: ["clear()", "clean()", "strip()"], correct: 2 },
          { question: "Strings are?", options: ["Mutable", "Immutable", "Empty"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 7: LISTS, TUPLES, SETS & DICTIONARY",
    topics: [
      {
        id: "py-collections",
        name: "Collections Overview",
        explanation: "Python provides built-in structures to group multiple data points together.",
        importantPoints: ["Lists: Ordered & Mutable.", "Tuples: Ordered & Immutable.", "Sets & Dicts: Unique values & Key-pair logic."],
        syntax: "list=[ ]\ntuple=( )\nset={ }\ndict={key:value}",
        code: "# Lists\nnums=[1,2,3,4]\nnums.append(5)\nprint('List:', nums)\n\n# Tuple\nt=(10,20,30)\nprint('Tuple:', t)\n\n# Set\ns={1,2,3,3}\nprint('Set (Unique):', s)\n\n# Dictionary\nd={'name':'Ramya','age':20}\nprint('Dict Name:', d['name'])",
        sampleOutput: "List: [1, 2, 3, 4, 5]\nTuple: (10, 20, 30)\nSet (Unique): {1, 2, 3}\nDict Name: Ramya",
        asciiFlowchart: "( Start )\n    ↓\n[ Allocate Heap ]\n    ↓\n[ Insert Values ]\n    ↓\n[ Apply Rules ]\n    ↓\n/ Display Set /\n    ↓\n( End )",
        flowchartSteps: ["Allocate container memory", "Insert items with specific rules (e.g. no dupes in set)", "Apply methods (append, update)", "Output content"],
        executionExplanation: "Each structure uses different memory pointers to optimize for either speed, order, or uniqueness.",
        practiceTask: "Take 5 numbers from user. Store them in list. Convert list to set. Print dictionary with numbers and their squares.",
        practiceQuestions: ["Use input() inside a loop", "Use set() to convert", "Use dict comprehension or loop for the squares"],
        mistakes: ["Trying to append to a tuple", "Duplicate keys in a dictionary"],
        mcqs: [
          { question: "Which is immutable?", options: ["List", "Tuple", "Set", "Dictionary"], correct: 1 },
          { question: "Which stores key-value pairs?", options: ["List", "Tuple", "Set", "Dictionary"], correct: 3 },
          { question: "Which removes duplicates automatically?", options: ["List", "Tuple", "Set", "Dictionary"], correct: 2 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 8: ARRAYS & NUMPY BASICS",
    topics: [
      {
        id: "py-numpy",
        name: "Arrays & NumPy",
        explanation: "NumPy is the fundamental package for scientific computing in Python. It provides high-performance multi-dimensional arrays.",
        importantPoints: ["Efficient: Faster than lists.", "Vectorized: Math operations on whole array at once.", "Multi-dimensional: Support for matrices."],
        syntax: "import numpy as np\narr=np.array([ ])",
        code: "import numpy as np\n\narr=np.array([1,2,3,4])\nprint('Array:', arr)\nprint('Sum:', arr.sum())\nprint('Max:', arr.max())\nprint('Mean:', arr.mean())",
        sampleOutput: "Array: [1 2 3 4]\nSum: 10\nMax: 4\nMean: 2.5",
        asciiFlowchart: "( Start )\n    ↓\n[ Load Module ]\n    ↓\n[ Allocate Block ]\n    ↓\n[ C-Level Logic ]\n    ↓\n/ Return result /\n    ↓\n( End )",
        flowchartSteps: ["Load NumPy module", "Allocate contiguous memory", "Apply optimized C-level functions", "Return aggregated result"],
        executionExplanation: "NumPy arrays are stored in contiguous memory blocks, allowing the CPU to process them much faster than standard Python lists.",
        practiceTask: "Create NumPy array from user input. Find sum and average.",
        practiceQuestions: ["Use np.array()", "Use arr.sum() and arr.mean()"],
        mistakes: ["Forgetting to import numpy", "Passing non-list items to np.array()"],
        mcqs: [
          { question: "Which library supports numerical arrays?", options: ["pandas", "numpy", "matplotlib"], correct: 1 },
          { question: "Standard alias for NumPy?", options: ["nmp", "np", "ny"], correct: 1 },
          { question: "Array creation function?", options: ["np.list()", "np.create()", "np.array()"], correct: 2 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 9: OOP IN PYTHON",
    topics: [
      {
        id: "py-class",
        name: "Classes & Objects",
        explanation: "Object-Oriented Programming (OOP) organizes code around data (Objects) and their behaviors (Classes).",
        importantPoints: ["Class: The blueprint.", "Object: Real instance.", "self: Points to current object."],
        syntax: "class MyClass:\n    pass\n\nobj = MyClass()",
        code: "class Robot:\n    def speak(self):\n        print('Hello! I am a robot.')\n\nr1 = Robot()\nr1.speak()",
        sampleOutput: "Hello! I am a robot.",
        asciiFlowchart: "( Start )\n    ↓\n[ Define Blueprint ]\n    ↓\n[ Create Instance ]\n    ↓\n[ Map self ]\n    ↓\n[ Execute Method ]\n    ↓\n( End )",
        flowchartSteps: ["Write class structure", "Instantiate using ()", "Pass 'self' implicitly", "Execute method"],
        executionExplanation: "A class defines a new data type; objects are actual segments of memory structured like that type.",
        practiceTask: "Create a 'Dog' class with a 'bark()' method.",
        practiceQuestions: ["Define the class", "Instantiate it", "Call the method"],
        mistakes: ["Forgetting 'self' in method definition"],
        mcqs: [
          { question: "Keyword to create class?", options: ["def", "class", "obj"], correct: 1 },
          { question: "A class is like a...?", options: ["Tool", "Variable", "Blueprint"], correct: 2 },
          { question: "Refer to the object itself?", options: ["this", "self", "it"], correct: 1 }
        ]
      },
      {
        id: "py-init",
        name: "Constructors (__init__)",
        explanation: "The __init__ method is a special function that runs automatically when a new object is created.",
        importantPoints: ["Used for initialization.", "Takes 'self' as first argument.", "Double underscores are called 'dunder' methods."],
        syntax: "def __init__(self, name):",
        code: "class Hero:\n    def __init__(self, name, power):\n        self.name = name\n        self.power = power\n\nh1 = Hero('Ironman', 'Flight')\nprint(f'{h1.name} has {h1.power}!')",
        sampleOutput: "Ironman has Flight!",
        asciiFlowchart: "( Start )\n    ↓\n[ Allocate Heap ]\n    ↓\n[ Trigger __init__ ]\n    ↓\n[ Set Attributes ]\n    ↓\n/ Return Ref /\n    ↓\n( End )",
        flowchartSteps: ["Allocation in heap", "Trigger __init__", "Set initial state values", "Assign to variable name"],
        executionExplanation: "Python calls __init__ as soon as memory is allocated for the object to ensure it starts with valid data.",
        practiceTask: "Create a 'Car' class that initializes with 'brand' and 'year'.",
        practiceQuestions: ["Use __init__", "Print details in a method"],
        mistakes: ["Adding a return to __init__ (must return None)"],
        mcqs: [
          { question: "Constructor name?", options: ["init()", "start()", "__init__"], correct: 2 },
          { question: "Runs automatically?", options: ["True", "False"], correct: 0 },
          { question: "Double underscores are called?", options: ["Dunder", "Binary", "Private"], correct: 0 }
        ]
      },
      {
        id: "py-inheritance",
        name: "Inheritance",
        explanation: "Inheritance allows a child class to acquire properties and methods from a parent class.",
        importantPoints: ["Promotes code reuse.", "Child class can override methods.", "super() refers to parent class."],
        syntax: "class Child(Parent):",
        code: "class Animal:\n    def breathe(self):\n        print('Breathing...')\n\nclass Fish(Animal):\n    def swim(self):\n        print('Swimming...')\n\nnemo = Fish()\nnemo.breathe()\nnemo.swim()",
        sampleOutput: "Breathing...\nSwimming...",
        asciiFlowchart: "( Start )\n    ↓\n[ Check Child ]\n    ↓\n< Found Method? >\n├── Yes → [ Execute ]\n└── No  → [ Check Parent ]\n    ↓\n( End )",
        flowchartSteps: ["Check method in Child", "If not found, check Parent", "If not found, check Object class", "Execute first found"],
        executionExplanation: "Python searches the 'Method Resolution Order' (MRO) to find which logic to execute.",
        practiceTask: "Create a 'Manager' class that inherits from an 'Employee' class.",
        practiceQuestions: ["Use Parent(Child) syntax"],
        mistakes: ["Circular inheritance (A inherits B, B inherits A)"],
        mcqs: [
          { question: "Inheritance promotes...?", options: ["Speed", "Reuse", "Errors"], correct: 1 },
          { question: "Refer to parent?", options: ["parent()", "up()", "super()"], correct: 2 },
          { question: "Can child have more methods?", options: ["Yes", "No"], correct: 0 }
        ]
      }
    ]
  }
];

export const PythonTutorial: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeLevel, setActiveLevel] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);

  useEffect(() => {
    const topicId = searchParams.get('topic');
    if (topicId) {
      PYTHON_TUTORIAL_DATA.forEach((level, lIdx) => {
        level.topics.forEach((topic, tIdx) => {
          if (topic.id === topicId) {
            setActiveLevel(lIdx);
            setActiveTopic(tIdx);
          }
        });
      });
    }
  }, [searchParams]);

  const currentLevel = PYTHON_TUTORIAL_DATA[activeLevel];
  const currentTopic = currentLevel?.topics[activeTopic];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-20">
      <TutorialLanding 
        title="Python Specialist"
        icon="🐍"
        subtitle="Go from 'What is code?' to 'I build AI and Apps'. Master Python, the most beginner-friendly yet powerful language in modern tech."
        features={["Readable", "Full-Stack", "AI Ready", "Enterprise Choice"]}
      />

      <div className="sticky top-24 z-50 p-3 ce-glass rounded-[2.5rem] border border-[#BDD8E9]/20 shadow-2xl flex flex-col md:flex-row gap-6 overflow-hidden">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
          {PYTHON_TUTORIAL_DATA.map((level, i) => (
            <button
              key={i}
              onClick={() => { setActiveLevel(i); setActiveTopic(0); }}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                activeLevel === i ? 'bg-[#7BBDE8] text-[#001D39]' : 'text-[#6EA2B3] hover:bg-[#0A4174]/30'
              }`}
            >
              {level.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 space-y-2">
          {currentLevel.topics.map((topic, idx) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(idx)}
              className={`w-full text-left px-6 py-4 rounded-2xl text-xs font-bold transition-all border ${
                activeTopic === idx ? 'bg-[#0A4174] text-[#BDD8E9] border-[#7BBDE8]/30 shadow-lg' : 'text-[#6EA2B3]/70 border-transparent hover:bg-[#0A4174]/20'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>

        <div className="lg:col-span-9">
          {currentTopic && (
            <AdvancedTutorialTopic
              {...currentTopic}
              level={activeLevel + 1}
              language="Python"
              imageDescription=""
            />
          )}
        </div>
      </div>

      <TutorialSummary 
        takeaways={["Simple Syntax", "Large Libraries", "Dynamic Typing"]}
        bestPractices={["Use PEP8", "Avoid global variables", "Use context managers"]}
      />
    </div>
  );
};
