
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdvancedTutorialTopic, TutorialLanding, TutorialSummary } from '../components/TutorialSection';

const C_TUTORIAL_DATA = [
  {
    title: "LEVEL 1: C BASICS",
    topics: [
      {
        id: "c-intro",
        name: "Introduction",
        explanation: "C is a powerful general-purpose programming language. It is fast, portable and available on all platforms.",
        importantPoints: ["Procedural Language", "Fast & Efficient", "Foundation of Modern OS"],
        syntax: "#include <stdio.h>\nint main() { ... }",
        code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, CodeEase!\");\n    return 0;\n}",
        sampleOutput: "Hello, CodeEase!",
        asciiFlowchart: "( Start )\n    ↓\n[ Load Header ]\n    ↓\n[ main() Entry ]\n    ↓\n/ Execute Code /\n    ↓\n/ Return 0 /\n    ↓\n( End )",
        flowchartSteps: ["Load stdio.h", "Enter main function", "Print message", "Exit program"],
        executionExplanation: "The compiler starts from main() and executes instructions sequentially.",
        practiceTask: "Print 'C is powerful' to the console.",
        practiceQuestions: ["Use printf()", "Check for ;"],
        mistakes: ["Missing #include", "Case sensitivity"],
        mcqs: [
          { question: "C was developed at?", options: ["AT&T Bell Labs", "Google", "Microsoft"], correct: 0 },
          { question: "Entry point of C?", options: ["start()", "main()", "begin()"], correct: 1 },
          { question: "C is mostly?", options: ["Low level", "Middle level", "High level"], correct: 1 }
        ]
      },
      {
        id: "c-keywords",
        name: "Keywords",
        explanation: "Keywords are reserved words in C that have a specific meaning to the compiler.",
        importantPoints: ["32 Standard Keywords", "Cannot be variable names", "All lowercase"],
        syntax: "int, if, else, for, while, return...",
        code: "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    if(x > 0) {\n        printf(\"x is positive\");\n    }\n    return 0;\n}",
        sampleOutput: "x is positive",
        asciiFlowchart: "( Start )\n    ↓\n[ Scan Token ]\n    ↓\n< Is Keyword? >\n├── Yes → [ Apply Rule ]\n└── No  → [ Identify Name ]\n    ↓\n[ Execute Logic ]\n    ↓\n( End )",
        flowchartSteps: ["Identify keyword", "Match with C table", "Execute specific logic"],
        executionExplanation: "Keywords tell the compiler what operation to perform.",
        practiceTask: "Identify two keywords in the code provided.",
        practiceQuestions: ["Check 'int'", "Check 'return'"],
        mistakes: ["Using keywords as variables"],
        mcqs: [
          { question: "How many keywords in C89?", options: ["32", "48", "64"], correct: 0 },
          { question: "Is 'printf' a keyword?", options: ["Yes", "No"], correct: 1 },
          { question: "Keyword for integer?", options: ["Integer", "int", "INT"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 2: VARIABLES & DATA TYPES",
    topics: [
      {
        id: "c-vars-datatypes",
        name: "Variables & Data Types",
        explanation: "Variables are containers for storing data values. Data types define the type of data a variable can hold.",
        importantPoints: ["Variables store data", "Data types define memory size", "Constants stay fixed"],
        syntax: "datatype variable = value;",
        code: "#include <stdio.h>\n\nint main() {\n    int a = 10;\n    float b = 5.5;\n    char c = 'A';\n\n    printf(\"Integer: %d\\n\", a);\n    printf(\"Float: %.2f\\n\", b);\n    printf(\"Character: %c\\n\", c);\n\n    printf(\"Size of int: %lu\", sizeof(int));\n    return 0;\n}",
        sampleOutput: "Integer: 10\nFloat: 5.50\nCharacter: A\nSize of int: 4",
        asciiFlowchart: "( Start )\n    ↓\n[ Declare Variable ]\n    ↓\n[ Allocate Memory ]\n    ↓\n[ Assign Value ]\n    ↓\n/ Display Result /\n    ↓\n( End )",
        flowchartSteps: ["Choose data type", "Name the variable", "Assign a value", "Print to screen"],
        executionExplanation: "The compiler allocates memory based on the chosen data type (int, float, char).",
        practiceTask: "Take integer, float and character from user. Display values and their sizes.",
        practiceQuestions: ["Use sizeof()", "Use format specifiers"],
        mistakes: ["Wrong format specifier", "Variable name starts with number"],
        mcqs: [
          { question: "Which datatype stores decimal?", options: ["int", "float", "char"], correct: 1 },
          { question: "sizeof is used to?", options: ["Find length", "Find memory size", "Find address"], correct: 1 },
          { question: "Which is constant declaration?", options: ["const int x = 5;", "int const x = 5;", "Both"], correct: 2 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 3: INPUT / OUTPUT",
    topics: [
      {
        id: "c-io-scanf",
        name: "scanf & printf",
        explanation: "The printf() function is used for output and scanf() function is used for input.",
        importantPoints: ["printf - output function", "scanf - input function", "Format Specifiers: %d, %f, %c"],
        syntax: "scanf(\"%d\", &a);\nprintf(\"%d\", a);",
        code: "#include <stdio.h>\n\nint main() {\n    int a;\n    float b;\n\n    printf(\"Enter integer: \");\n    scanf(\"%d\", &a);\n\n    printf(\"Enter float: \");\n    scanf(\"%f\", &b);\n\n    printf(\"Integer: %d\\n\", a);\n    printf(\"Float: %.2f\", b);\n\n    return 0;\n}",
        sampleOutput: "Enter integer: 10\nEnter float: 5.5\nInteger: 10\nFloat: 5.50",
        asciiFlowchart: "( Start )\n    ↓\n/ Prompt User /\n    ↓\n/ Input Value /\n    ↓\n[ Store at Address ]\n    ↓\n/ Output Result /\n    ↓\n( End )",
        flowchartSteps: ["Prompt user", "Wait for keyboard input", "Store in variable address", "Show result"],
        executionExplanation: "scanf reads from the standard input (keyboard) and stores it using the variable address (&).",
        practiceTask: "Take two numbers from user. Print sum, difference, multiplication.",
        practiceQuestions: ["Use & in scanf", "Check format specifiers"],
        mistakes: ["Forgetting & in scanf", "Wrong specifier for data type"],
        mcqs: [
          { question: "Which symbol used in scanf?", options: ["%", "&", "$"], correct: 1 },
          { question: "printf belongs to which header?", options: ["conio.h", "stdio.h", "math.h"], correct: 1 },
          { question: "%f is used for?", options: ["float", "int", "char"], correct: 0 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 4: OPERATORS & CONDITIONS",
    topics: [
      {
        id: "c-conditions",
        name: "if / else & switch",
        explanation: "Decision making structures require that the programmer specifies one or more conditions to be evaluated.",
        importantPoints: ["if-else: Boolean branching", "switch: Multi-way branching", "Break: Exit switch case"],
        syntax: "if(cond) { ... } else { ... }\nswitch(var) { case val: ... }",
        code: "#include <stdio.h>\n\nint main() {\n    int age = 18;\n    if(age >= 18) {\n        printf(\"Eligible to vote\\n\");\n    } else {\n        printf(\"Not eligible\\n\");\n    }\n\n    int day = 1;\n    switch(day) {\n        case 1: printf(\"Monday\"); break;\n        default: printf(\"Other day\");\n    }\n    return 0;\n}",
        sampleOutput: "Eligible to vote\nMonday",
        asciiFlowchart: "( Start )\n    ↓\n< Evaluate Condition >\n├── True → [ Run Block A ]\n└── False → [ Run Block B ]\n    ↓\n[ Exit Structure ]\n    ↓\n( End )",
        flowchartSteps: ["Evaluate expression", "Branch logic", "Execute block", "Resume program"],
        executionExplanation: "Conditions allow the program to take different paths based on values.",
        practiceTask: "Create a calculator that takes an operator (+, -) and two numbers, then performs the operation.",
        practiceQuestions: ["Use switch case", "Use char for operator"],
        mistakes: ["Forgetting 'break' in switch", "Using = instead of =="],
        mcqs: [
          { question: "Relational operator for equal?", options: ["=", "==", "==="], correct: 1 },
          { question: "Logical AND symbol?", options: ["&", "&&", "AND"], correct: 1 },
          { question: "Is 'default' mandatory in switch?", options: ["Yes", "No"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 5: LOOPS",
    topics: [
      {
        id: "c-loops",
        name: "For, While & Do-While",
        explanation: "Loops are used to repeat a block of code until a specified condition is reached.",
        importantPoints: ["for: Loop with counter", "while: Loop with condition", "do-while: Runs at least once"],
        syntax: "for(init; cond; incr) { ... }\nwhile(cond) { ... }",
        code: "#include <stdio.h>\n\nint main() {\n    printf(\"For Loop: \");\n    for(int i=1; i<=3; i++) {\n        printf(\"%d \", i);\n    }\n\n    printf(\"\\nWhile Loop: \");\n    int j=1;\n    while(j<=3) {\n        printf(\"%d \", j);\n        j++;\n    }\n    return 0;\n}",
        sampleOutput: "For Loop: 1 2 3\nWhile Loop: 1 2 3",
        asciiFlowchart: "( Start )\n    ↓\n[ Initialization ]\n    ↓\n< Condition Met? >\n│ ├── Yes → [ Run Body ]\n│ │          ↓\n│ │         [ Update Counter ]\n│ │          ↓\n│ └──────────┘\n└── No → ( End )",
        flowchartSteps: ["Set starting value", "Test condition", "Run code block", "Update counter"],
        executionExplanation: "The program repeats the execution path until the loop exit condition evaluates to false.",
        practiceTask: "Print the table of a number taken from the user.",
        practiceQuestions: ["Use for loop", "Take input first"],
        mistakes: ["Infinite loops", "Off-by-one errors"],
        mcqs: [
          { question: "Loop that runs at least once?", options: ["while", "for", "do-while"], correct: 2 },
          { question: "To skip one iteration?", options: ["break", "continue", "exit"], correct: 1 },
          { question: "Exit controlled loop?", options: ["for", "while", "do-while"], correct: 2 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 6: ARRAYS",
    topics: [
      {
        id: "c-arrays",
        name: "1D & 2D Arrays",
        explanation: "Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.",
        importantPoints: ["Contiguous memory", "0-based indexing", "Fixed size"],
        syntax: "int arr[5];\nint matrix[2][2];",
        code: "#include <stdio.h>\n\nint main() {\n    int nums[3] = {10, 20, 30};\n    printf(\"Array element 1: %d\\n\", nums[0]);\n\n    int matrix[2][2] = {{1, 2}, {3, 4}};\n    printf(\"Matrix [1][1]: %d\", matrix[1][1]);\n    return 0;\n}",
        sampleOutput: "Array element 1: 10\nMatrix [1][1]: 4",
        asciiFlowchart: "( Start )\n    ↓\n[ Reserve Memory ]\n    ↓\n[ Calculate Index Offset ]\n    ↓\n[ Access Value ]\n    ↓\n/ Process Data /\n    ↓\n( End )",
        flowchartSteps: ["Allocate block size", "Map indices", "Store/Read data", "Loop through items"],
        executionExplanation: "Arrays allow random access to elements using an index offset from the base address.",
        practiceTask: "Find the sum of 5 elements in an array taken from the user.",
        practiceQuestions: ["Loop for input", "Sum variable"],
        mistakes: ["Array index out of bounds", "Forgetting index starts at 0"],
        mcqs: [
          { question: "Array index starts from?", options: ["1", "0", "-1"], correct: 1 },
          { question: "Type of data in array?", options: ["Homogeneous", "Heterogeneous", "Both"], correct: 0 },
          { question: "Size of int arr[10] (4-byte int)?", options: ["10", "40", "20"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 7: STRINGS",
    topics: [
      {
        id: "c-strings",
        name: "Strings",
        explanation: "A string in C is a collection of characters terminated by a null character (\\0). It's essentially a 1D character array.",
        importantPoints: [
          "Strings: collection of characters",
          "String Functions: strlen, strcpy, strcat, strcmp",
          "Input & Output: gets/fgets and puts/printf"
        ],
        syntax: "char str[20];\nfgets(str, 20, stdin);\nstrlen(str);",
        code: "#include<stdio.h>\n#include<string.h>\n\nint main(){\n char name[50];\n printf(\"Enter name: \");\n fgets(name, 50, stdin);\n\n // Removing newline if present\n name[strcspn(name, \"\\n\")] = 0;\n\n printf(\"Length: %lu\\n\", strlen(name));\n printf(\"Copy: %s\", name);\n\n return 0;\n}",
        sampleOutput: "Enter name: Ram\nLength: 3\nCopy: Ram",
        asciiFlowchart: "( Start )\n    ↓\n/ Input String /\n    ↓\n[ Declare Array ]\n    ↓\n[ Apply Library Func ]\n    ↓\n/ Output Result /\n    ↓\n( End )",
        flowchartSteps: [
          "Declare character array",
          "Read input using fgets()",
          "Call string library functions",
          "Output the manipulated data"
        ],
        executionExplanation: "The <string.h> library provides optimized logic for calculating length, copying memory blocks, and comparing character values one by one.",
        practiceTask: "Input two strings. Compare them. Concatenate if equal.",
        practiceQuestions: [
          "Use strcmp() for comparison",
          "Use strcat() for joining",
          "Check string.h header"
        ],
        mistakes: [
          "Forgetting the null terminator",
          "Buffer overflow with gets() (use fgets instead)"
        ],
        mcqs: [
          { question: "Which header for strings?", options: ["stdio.h", "string.h", "math.h"], correct: 1 },
          { question: "strlen returns?", options: ["Memory address", "Number of characters", "Array size"], correct: 1 },
          { question: "strcmp returns 0 when?", options: ["Strings are different", "Strings are equal", "First string is longer"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 8: FUNCTIONS",
    topics: [
      {
        id: "c-functions",
        name: "Functions",
        explanation: "Functions are reusable blocks of code that perform specific tasks. They help in breaking down large programs into smaller, manageable pieces.",
        importantPoints: [
          "Functions – reusable code",
          "Parameters & Return: data in, results out",
          "Call by Value / Reference: how data is passed"
        ],
        syntax: "return_type function_name(parameters){\n statements;\n}",
        code: "#include<stdio.h>\n\nint add(int a, int b){\n return a + b;\n}\n\nint main(){\n int x = 10, y = 20;\n printf(\"Sum = %d\", add(x, y));\n return 0;\n}",
        sampleOutput: "Sum = 30",
        asciiFlowchart: "( Start )\n    ↓\n[ Call Function ]\n    ↓\n[ Save PC Context ]\n    ↓\n[ Execute Logic ]\n    ↓\n/ Return Value /\n    ↓\n( End )",
        flowchartSteps: [
          "Identify function signature",
          "Transfer control to function block",
          "Execute internal instructions",
          "Return control and value to caller"
        ],
        executionExplanation: "When a function is called, the CPU pushes the current address onto the stack and jumps to the function's start address.",
        practiceTask: "Create a function to find the factorial of a number.",
        practiceQuestions: [
          "Define return type as long or int",
          "Use a loop or recursion",
          "Call it from main()"
        ],
        mistakes: [
          "Missing function prototype",
          "Wrong return type",
          "Forgetting return statement"
        ],
        mcqs: [
          { question: "Function used to return value?", options: ["break", "return", "exit"], correct: 1 },
          { question: "Which passes a copy of the variable?", options: ["Call by value", "Call by reference"], correct: 0 },
          { question: "Recursive means?", options: ["Looping forever", "Function calling itself", "Using global variables"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 9: POINTERS",
    topics: [
      {
        id: "c-pointers-basics",
        name: "Pointer Mastery",
        explanation: "Pointers are variables that store the memory address of another variable.",
        importantPoints: ["Address storage", "Dereferencing with *", "Address with &"],
        syntax: "int *ptr = &var;\n*ptr = 20; // change value",
        code: "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    int *ptr = &x;\n\n    printf(\"Value of x: %d\\n\", x);\n    printf(\"Address of x: %p\\n\", &x);\n    printf(\"Value using ptr: %d\", *ptr);\n\n    return 0;\n}",
        sampleOutput: "Value of x: 10\nAddress of x: 0x...\nValue using ptr: 10",
        asciiFlowchart: "( Start )\n    ↓\n[ Declare Pointer ]\n    ↓\n[ Get Address & ]\n    ↓\n[ Store in Pointer ]\n    ↓\n[ Dereference * ]\n    ↓\n/ Display Value /\n    ↓\n( End )",
        flowchartSteps: ["Get address of variable", "Store in pointer", "Access data via pointer", "Modify memory directly"],
        executionExplanation: "Pointers allow you to manipulate memory locations directly for high efficiency.",
        practiceTask: "Swap two numbers using pointers.",
        practiceQuestions: ["Use temp variable", "Pass addresses"],
        mistakes: ["Dereferencing NULL pointer", "Pointer type mismatch"],
        mcqs: [
          { question: "Operator to get address?", options: ["*", "&", "->"], correct: 1 },
          { question: "Pointer to pointer?", options: ["**p", "*p", "&p"], correct: 0 },
          { question: "Address size (64-bit)?", options: ["4 bytes", "8 bytes", "System dependent"], correct: 2 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 10: STRUCTURES & UNIONS",
    topics: [
      {
        id: "c-struct-union",
        name: "Structures & Unions",
        explanation: "Structures and Unions allow you to group variables of different data types under a single name.",
        importantPoints: [
          "Structure – stores multiple data types separately",
          "Union – shares memory among members",
          "Dot Operator – used to access members"
        ],
        syntax: "struct name {\n  datatype member;\n};\nstruct name variable;",
        code: "#include<stdio.h>\n\nstruct Student{\n int id;\n float marks;\n};\n\nint main(){\n struct Student s1;\n s1.id=101;\n s1.marks=88.5;\n\n printf(\"ID: %d\\n\", s1.id);\n printf(\"Marks: %.2f\", s1.marks);\n\n return 0;\n}",
        sampleOutput: "ID: 101\nMarks: 88.50",
        asciiFlowchart: "( Start )\n    ↓\n[ Define Template ]\n    ↓\n[ Declare Struct ]\n    ↓\n[ Assign Members ]\n    ↓\n/ Print values /\n    ↓\n( End )",
        flowchartSteps: [
          "Define the struct template",
          "Declare a struct variable (instance)",
          "Assign values using the dot (.) operator",
          "Print values using format specifiers"
        ],
        executionExplanation: "Structures allocate separate memory for each member, while Unions allocate only enough memory for the largest member, sharing it across all.",
        practiceTask: "Create a structure 'Employee' with 'id' and 'salary'. Input and display them.",
        practiceQuestions: [
          "Define the 'Employee' struct",
          "Use scanf() to take user input",
          "Print the values clearly"
        ],
        mistakes: [
          "Forgetting the semicolon after struct definition",
          "Assuming all union members keep their values simultaneously"
        ],
        mcqs: [
          { question: "Which stores multiple data types?", options: ["Array", "Structure", "Pointer"], correct: 1 },
          { question: "Union uses:", options: ["Separate memory", "Shared memory"], correct: 1 },
          { question: "Operator to access members?", options: ["#", ".", "&"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 11: FILE HANDLING",
    topics: [
      {
        id: "c-files",
        name: "File Handling",
        explanation: "File handling allows a C program to read from and write data to external files, making data persistent.",
        importantPoints: [
          "fopen – open file",
          "fprintf – write to file",
          "fscanf – read from file"
        ],
        syntax: "FILE *fp;\nfp = fopen(\"file.txt\", \"w\");",
        code: "#include<stdio.h>\n\nint main(){\n FILE *fp;\n fp=fopen(\"data.txt\", \"w\");\n\n if(fp == NULL) {\n    printf(\"Error opening file!\");\n    return 1;\n }\n\n fprintf(fp, \"Welcome to CodeEase\");\n fclose(fp);\n\n printf(\"File created and written successfully\");\n\n return 0;\n}",
        sampleOutput: "File created and written successfully",
        asciiFlowchart: "( Start )\n    ↓\n[ Open File ]\n    ↓\n/ Write/Read Data /\n    ↓\n[ Close File ]\n    ↓\n( End )",
        flowchartSteps: [
          "Declare a FILE pointer",
          "Open file with fopen() in specific mode ('r', 'w', 'a')",
          "Perform I/O using fprintf or fscanf",
          "Close the file with fclose()"
        ],
        executionExplanation: "The FILE pointer acts as a bridge between the program and the physical storage on the disk.",
        practiceTask: "Write a student name into a file. Then read it back and display it on screen.",
        practiceQuestions: [
          "Use 'w' mode to write",
          "Use 'r' mode to read back",
          "Check for NULL after opening"
        ],
        mistakes: [
          "Forgetting to fclose() the file (can lead to data loss)",
          "Opening a file in 'w' mode (overwrites everything)"
        ],
        mcqs: [
          { question: "fopen returns?", options: ["int", "FILE*", "char"], correct: 1 },
          { question: "Which mode writes to a file?", options: ["'r'", "'w'", "'x'"], correct: 1 },
          { question: "fclose does?", options: ["Deletes file", "Releases file pointer", "Renames file"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 12: DYNAMIC MEMORY",
    topics: [
      {
        id: "c-dma-logic",
        name: "malloc, calloc, realloc & free",
        explanation: "Dynamic Memory Allocation (DMA) allows you to allocate memory at runtime from the heap.",
        importantPoints: ["Heap memory", "malloc/calloc for allocation", "free to prevent leaks"],
        syntax: "int *p = (int*)malloc(size);\nfree(p);",
        code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = (int*)malloc(2 * sizeof(int));\n    if(p != NULL) {\n        p[0] = 100; p[1] = 200;\n        printf(\"Value: %d\\n\", p[0]);\n        free(p);\n        printf(\"Memory Freed\");\n    }\n    return 0;\n}",
        sampleOutput: "Value: 100\nMemory Freed",
        asciiFlowchart: "( Start )\n    ↓\n[ Request OS RAM ]\n    ↓\n< Success? >\n├── Yes → [ Use Pointer ]\n└── No  → / Error Msg /\n    ↓\n[ Release RAM ]\n    ↓\n( End )",
        flowchartSteps: ["Ask OS for memory", "Check if allocated", "Access via pointer", "Free when done"],
        executionExplanation: "DMA is crucial for structures like linked lists where size isn't known ahead of time.",
        practiceTask: "Allocate an array of 'n' integers dynamically, fill them, and find their average.",
        practiceQuestions: ["Use malloc", "Use free()"],
        mistakes: ["Memory leaks (no free)", "Dangling pointers"],
        mcqs: [
          { question: "Which initializes memory to zero?", options: ["malloc", "calloc", "realloc"], correct: 1 },
          { question: "Returns what on failure?", options: ["0", "NULL", "-1"], correct: 1 },
          { question: "malloc stands for?", options: ["Memory Allocate", "Main Location", "Many Location"], correct: 0 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 14: MINI PROJECTS",
    topics: [
      {
        id: "c-project-calc",
        name: "Simple Calculator",
        explanation: "Combine all your knowledge: I/O, Operators, and Switch case to build a real tool.",
        importantPoints: ["User Interaction", "Arithmetic Logic", "Clean Interface"],
        syntax: "Switch based on operator (+, -, *, /)",
        code: "#include <stdio.h>\n\nint main() {\n    char op;\n    double n1, n2;\n    printf(\"Enter operator (+, -): \");\n    scanf(\" %c\", &op);\n    printf(\"Enter two numbers: \");\n    scanf(\"%lf %lf\", &n1, &n2);\n\n    switch(op) {\n        case '+': printf(\"Result: %.2lf\", n1+n2); break;\n        case '-': printf(\"Result: %.2lf\", n1-n2); break;\n        default: printf(\"Invalid operator\");\n    }\n    return 0;\n}",
        sampleOutput: "Enter operator (+, -): +\nEnter two numbers: 10 20\nResult: 30.00",
        asciiFlowchart: "( Start )\n    ↓\n/ Input Op /\n    ↓\n/ Input Nums /\n    ↓\n< Match Case >\n├── Add  → / Output Sum /\n├── Sub  → / Output Diff /\n└── Fail → / Error Msg /\n    ↓\n( End )",
        flowchartSteps: ["Prompt for op", "Prompt for values", "Select math logic", "Print output"],
        executionExplanation: "A practical application of conditional branching to solve math problems.",
        practiceTask: "Extend the calculator to support multiplication and division.",
        practiceQuestions: ["Check for divide by zero", "Add '*' and '/' cases"],
        mistakes: ["Ignoring division by zero"],
        mcqs: [
          { question: "To read a char correctly after a number?", options: ["scanf(\"%c\")", "scanf(\" %c\")", "getc()"], correct: 1 },
          { question: "Type for high precision?", options: ["int", "float", "double"], correct: 2 },
          { question: "Return type of main?", options: ["void", "int", "None"], correct: 1 }
        ]
      }
    ]
  }
];

export const CTutorial: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeLevel, setActiveLevel] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);

  useEffect(() => {
    const topicId = searchParams.get('topic');
    if (topicId) {
      C_TUTORIAL_DATA.forEach((level, lIdx) => {
        level.topics.forEach((topic, tIdx) => {
          if (topic.id === topicId) {
            setActiveLevel(lIdx);
            setActiveTopic(tIdx);
          }
        });
      });
    }
  }, [searchParams]);

  const currentLevel = C_TUTORIAL_DATA[activeLevel];
  const currentTopic = currentLevel?.topics[activeTopic];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-20">
      <TutorialLanding 
        title="C Specialist" 
        icon="⚙️" 
        subtitle="Master the machine logic. From binary thinking to advanced memory architecture." 
        features={["Procedural", "Memory Control", "Hardware Interaction", "Fast Execution"]} 
      />
      
      <div className="sticky top-24 z-50 p-3 ce-glass rounded-[2.5rem] border border-[#BDD8E9]/20 shadow-2xl flex flex-col md:flex-row gap-6 overflow-hidden">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
          {C_TUTORIAL_DATA.map((level, i) => (
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
          {currentLevel.topics.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveTopic(idx)}
              className={`w-full text-left px-6 py-4 rounded-2xl text-xs font-bold transition-all border ${
                activeTopic === idx ? 'bg-[#0A4174] text-[#BDD8E9] border-[#7BBDE8]/30 shadow-lg' : 'text-[#6EA2B3]/70 border-transparent hover:bg-[#0A4174]/20'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="lg:col-span-9">
          {currentTopic && (
            <AdvancedTutorialTopic 
              {...currentTopic} 
              level={activeLevel + 1} 
              language="C" 
              imageDescription=""
            />
          )}
        </div>
      </div>
      <TutorialSummary 
        takeaways={["Standard Syntax Mastery", "Memory Architecture", "Logic Branching"]} 
        bestPractices={["Comment Risky Logic", "Always Check Pointers", "Use Descriptive Var Names"]} 
      />
    </div>
  );
};
