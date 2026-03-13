
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdvancedTutorialTopic, TutorialLanding, TutorialSummary } from '../components/TutorialSection';

const JAVA_TUTORIAL_DATA = [
  {
    title: "LEVEL 1: JAVA BASICS",
    topics: [
      {
        id: "java-intro",
        name: "Introduction",
        explanation: "Java is an object-oriented language designed to have as few implementation dependencies as possible. It runs on billions of devices.",
        importantPoints: ["Simple & Secure", "Object-Oriented", "Platform Independent (WORA)"],
        syntax: "public class Main {\n  public static void main(String[] args) {\n  }\n}",
        code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Welcome to CodeEase Java!\");\n    }\n}",
        sampleOutput: "Welcome to CodeEase Java!",
        asciiFlowchart: "( Start )\n    ↓\n[ Write .java ]\n    ↓\n[ Compile (Javac) ]\n    ↓\n[ Bytecode .class ]\n    ↓\n/ JVM Run /\n    ↓\n( End )",
        flowchartSteps: ["Write .java file", "Compile to .class", "JVM reads bytecode", "Execute instructions"],
        executionExplanation: "The main method is the entry point where the JVM begins execution.",
        practiceTask: "Change the message to 'Mastering Java Logic'.",
        practiceQuestions: ["Use System.out.println", "Don't forget the semicolon"],
        mistakes: ["Mismatch between class name and filename", "Missing curly braces"],
        mcqs: [
          { question: "Java is which type of language?", options: ["Compiled", "Interpreted", "Both"], correct: 2 },
          { question: "Extension of a compiled file?", options: [".java", ".class", ".exe"], correct: 1 },
          { question: "Entry point method name?", options: ["start()", "main()", "init()"], correct: 1 }
        ]
      },
      {
        id: "java-jvm-architecture",
        name: "JVM / JDK / JRE",
        explanation: "Understanding the tools needed to build and run Java applications is crucial for every developer.",
        importantPoints: ["JDK: For development", "JRE: For running apps", "JVM: The execution engine"],
        syntax: "JDK = JRE + Tools\nJRE = JVM + Libraries",
        code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"JVM: Bytecode Execution\");\n        System.out.println(\"JRE: Library Support\");\n        System.out.println(\"JDK: Compiler & Tools\");\n    }\n}",
        sampleOutput: "JVM: Bytecode Execution\nJRE: Library Support\nJDK: Compiler & Tools",
        asciiFlowchart: "( Start )\n    ↓\n[ Load Source ]\n    ↓\n[ JIT Compile ]\n    ↓\n[ GC Logic ]\n    ↓\n/ Native Out /\n    ↓\n( End )",
        flowchartSteps: ["Load source", "JIT compilation", "Garbage collection", "Native interaction"],
        executionExplanation: "The JVM interprets bytecode or compiles it to native code using the JIT compiler.",
        practiceTask: "Print the definitions of JRE and JDK separately.",
        practiceQuestions: ["Use multiple println statements"],
        mistakes: ["Confusing JDK with JRE"],
        mcqs: [
          { question: "Which contains the compiler?", options: ["JDK", "JRE", "JVM"], correct: 0 },
          { question: "The JVM is?", options: ["Hardware", "Software", "Both"], correct: 1 },
          { question: "What is WORA?", options: ["Write Once Run Anywhere", "Walk Only Red Apps"], correct: 0 }
        ]
      },
      {
        id: "java-keywords",
        name: "Keywords",
        explanation: "Keywords are reserved words in Java that have special meaning and cannot be used as identifiers.",
        importantPoints: ["50+ Reserved Words", "Always lowercase", "Logic triggers"],
        syntax: "public, static, void, int, class...",
        code: "public class Main {\n    public static void main(String[] args) {\n        int x = 10; // 'int' is a keyword\n        if(x > 5) { // 'if' is a keyword\n           System.out.println(\"Keywords used!\");\n        }\n    }\n}",
        sampleOutput: "Keywords used!",
        asciiFlowchart: "( Start )\n    ↓\n[ Scan Token ]\n    ↓\n< Match Case? >\n├── Yes → [ Set Logic ]\n└── No  → [ Set Name ]\n    ↓\n[ Execute Op ]\n    ↓\n( End )",
        flowchartSteps: ["Compiler scans token", "Compares with reserved list", "Assigns internal logic"],
        executionExplanation: "The compiler uses keywords to define the structure and behavior of the code.",
        practiceTask: "Identify 3 keywords used in the current code.",
        practiceQuestions: ["Look for words in bold or color"],
        mistakes: ["Using 'class' as a variable name", "Capitalizing keywords"],
        mcqs: [
          { question: "Which is a valid keyword?", options: ["Class", "class", "CLASS"], correct: 1 },
          { question: "Keyword for integer?", options: ["Integer", "int", "decimal"], correct: 1 },
          { question: "Is 'String' a keyword?", options: ["Yes", "No (It's a Class)"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 2: VARIABLES & I/O",
    topics: [
      {
        id: "java-scanner",
        name: "Scanner Class",
        explanation: "The Scanner class is used to get user input, and it is found in the java.util package.",
        importantPoints: ["java.util.Scanner import", "System.in source", "Multiple data methods"],
        syntax: "Scanner sc = new Scanner(System.in);\nint x = sc.nextInt();",
        code: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(\"Enter your age:\");\n        int age = sc.nextInt();\n        System.out.println(\"You are \" + age + \" years old.\");\n    }\n}",
        sampleOutput: "Enter your age: 20\nYou are 20 years old.",
        asciiFlowchart: "( Start )\n    ↓\n[ Init Scanner ]\n    ↓\n/ System.in /\n    ↓\n[ sc.nextInt() ]\n    ↓\n/ Display val /\n    ↓\n( End )",
        flowchartSteps: ["Import Utility", "Initialize object", "sc.nextInt() pauses app", "Print stored value"],
        executionExplanation: "System.in reads the raw bytes from the keyboard, which the Scanner then parses into types.",
        practiceTask: "Ask for name (String) and marks (double). Display them.",
        practiceQuestions: ["Use sc.next()", "Use sc.nextDouble()"],
        mistakes: ["Forgetting to import java.util.Scanner", "Using wrong next method for type"],
        mcqs: [
          { question: "Package for Scanner?", options: ["java.io", "java.util", "java.lang"], correct: 1 },
          { question: "Read a full line?", options: ["next()", "nextLine()", "get()"], correct: 1 },
          { question: "Parameter for new Scanner()?", options: ["System.out", "System.in", "File"], correct: 1 }
        ]
      },
      {
        id: "java-datatypes",
        name: "Data Types",
        explanation: "Java is strictly typed. Every variable must have a declared type that specifies the size and type of data it can hold.",
        importantPoints: ["Primitives: int, double, boolean", "Reference: String, Array", "Fixed memory allocation"],
        syntax: "int a = 5;\ndouble b = 10.5;\nboolean c = true;",
        code: "public class Main {\n    public static void main(String[] args) {\n        int count = 100;\n        double price = 99.99;\n        char grade = 'A';\n        boolean isOpen = true;\n\n        System.out.println(\"Int: \" + count);\n        System.out.println(\"Double: \" + price);\n        System.out.println(\"Bool: \" + isOpen);\n    }\n}",
        sampleOutput: "Int: 100\nDouble: 99.99\nBool: true",
        asciiFlowchart: "( Start )\n    ↓\n[ Define Type ]\n    ↓\n[ Reserve RAM ]\n    ↓\n[ Assign Value ]\n    ↓\n/ Access Data /\n    ↓\n( End )",
        flowchartSteps: ["Choose bit size", "Name reference", "Store binary value", "Print decimal representation"],
        executionExplanation: "Primitives are stored directly on the stack, while objects live in the heap.",
        practiceTask: "Create variables for a student's ID, GPA, and graduation status.",
        practiceQuestions: ["Use int, double, boolean"],
        mistakes: ["Assigning 10.5 to an int", "Mismatched quotes for char"],
        mcqs: [
          { question: "Size of int?", options: ["2 bytes", "4 bytes", "8 bytes"], correct: 1 },
          { question: "Primitive for decimals?", options: ["int", "long", "float"], correct: 2 },
          { question: "Is String primitive?", options: ["Yes", "No"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 3: OPERATORS & DECISIONS",
    topics: [
      {
        id: "java-if-else",
        name: "if / else / switch",
        explanation: "Decision making blocks allow your program to take different paths based on conditions.",
        importantPoints: ["if: Boolean check", "switch: Value matching", "Logic branching"],
        syntax: "if(cond) { ... } else { ... }\nswitch(var) { case val: ... }",
        code: "public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        if(score >= 90) {\n            System.out.println(\"Grade: A\");\n        } else if(score >= 80) {\n            System.out.println(\"Grade: B\");\n        } else {\n            System.out.println(\"Grade: C\");\n        }\n    }\n}",
        sampleOutput: "Grade: B",
        asciiFlowchart: "( Start )\n    ↓\n< Evaluate Expr >\n├── True → [ Task A ]\n└── False → [ Task B ]\n    ↓\n[ Structure Exit ]\n    ↓\n( End )",
        flowchartSteps: ["Evaluate expression", "Check boolean result", "Jump to code block", "Exit structure"],
        executionExplanation: "The CPU evaluates the comparison and jumps to a specific memory address based on the result.",
        practiceTask: "Build a mini calculator using switch case for +, -, *, /.",
        practiceQuestions: ["Take two numbers", "Take operator as char"],
        mistakes: ["Using = instead of ==", "Forgetting 'break' in switch"],
        mcqs: [
          { question: "Relational operator for equal?", options: ["=", "==", "==="], correct: 1 },
          { question: "Symbol for logical AND?", options: ["&", "&&", "AND"], correct: 1 },
          { question: "Switch default mandatory?", options: ["Yes", "No"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 4: LOOPS",
    topics: [
      {
        id: "java-loops",
        name: "For & While",
        explanation: "Loops repeat a block of code multiple times. Use 'for' for fixed counts and 'while' for condition-based counts.",
        importantPoints: ["for: Loop with counter", "while: Loop with condition", "Infinite loop risks"],
        syntax: "for(init; cond; incr) { ... }\nwhile(cond) { ... }",
        code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"For Loop:\");\n        for(int i=1; i<=3; i++) {\n            System.out.println(\"Count: \" + i);\n        }\n\n        System.out.println(\"\\nWhile Loop:\");\n        int j=1;\n        while(j<=3) {\n            System.out.println(\"Step: \" + j);\n            j++;\n        }\n    }\n}",
        sampleOutput: "For Loop:\nCount: 1\nCount: 2\nCount: 3\n\nWhile Loop:\nStep: 1\nStep: 2\nStep: 3",
        asciiFlowchart: "( Start )\n    ↓\n[ Initialization ]\n    ↓\n< Condition Met? >\n│ ├── Yes → [ Run Body ]\n│ │          ↓\n│ │         [ Update Logic ]\n│ │          ↓\n│ └──────────┘\n└── No → ( End )",
        flowchartSteps: ["Initialize counter", "Test limit", "Run logic", "Increment/Decrement"],
        executionExplanation: "The JVM checks the condition before every iteration (for entry-controlled loops).",
        practiceTask: "Print the table of 5 using a for loop.",
        practiceQuestions: ["5 * i", "Loop from 1 to 10"],
        mistakes: ["Missing update statement (Infinite loop)", "Off-by-one error"],
        mcqs: [
          { question: "Loop that runs at least once?", options: ["while", "for", "do-while"], correct: 2 },
          { question: "Force next iteration?", options: ["break", "continue", "skip"], correct: 1 },
          { question: "Exit controlled loop?", options: ["for", "while", "do-while"], correct: 2 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 5: METHODS & OVERLOADING",
    topics: [
      {
        id: "java-methods-basics",
        name: "Method Creation",
        explanation: "Methods are reusable blocks of code that only run when called. They help in organizing code into manageable units.",
        importantPoints: ["Code Reusability", "Modular Logic", "Naming: lowerCamelCase"],
        syntax: "modifier returnType name(params) {\n  // body\n}",
        code: "public class Main {\n    static void sayHello() {\n        System.out.println(\"Hello from a custom method!\");\n    }\n\n    public static void main(String[] args) {\n        sayHello();\n        sayHello();\n    }\n}",
        sampleOutput: "Hello from a custom method!\nHello from a custom method!",
        asciiFlowchart: "( Start )\n    ↓\n[ Call Method ]\n    ↓\n[ Stack Frame ]\n    ↓\n[ Execute ]\n    ↓\n/ Return Flow /\n    ↓\n( End )",
        flowchartSteps: ["Define logic in block", "Encounter method name", "Transfer control to method", "Resume main stream"],
        executionExplanation: "When a method is called, the JVM pushes a new frame onto the stack for that method's execution.",
        practiceTask: "Create a method named 'showWelcome' that prints a greeting and call it in main.",
        practiceQuestions: ["Define as static", "Call it inside main()"],
        mistakes: ["Calling non-static methods from static main", "Missing curly braces"],
        mcqs: [
          { question: "Keyword to indicate no return?", options: ["none", "void", "null"], correct: 1 },
          { question: "Entry point of Java?", options: ["main", "start", "init"], correct: 0 },
          { question: "Static methods belong to?", options: ["Object", "Class", "Memory"], correct: 1 }
        ]
      },
      {
        id: "java-methods-params",
        name: "Parameters & Return",
        explanation: "Parameters pass data into methods, and return values send data back to the caller.",
        importantPoints: ["Inputs: Parameters", "Output: Return Value", "Matching types required"],
        syntax: "int add(int a, int b) {\n  return a + b;\n}",
        code: "public class Main {\n    static int addNumbers(int a, int b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        int result = addNumbers(10, 20);\n        System.out.println(\"The sum is: \" + result);\n    }\n}",
        sampleOutput: "The sum is: 30",
        asciiFlowchart: "( Start )\n    ↓\n/ Input Data /\n    ↓\n[ Map Params ]\n    ↓\n[ Process calculation ]\n    ↓\n/ Return Data /\n    ↓\n( End )",
        flowchartSteps: ["Pass arguments", "Map to parameters", "Execute calculation", "Return result back"],
        executionExplanation: "Return values replace the method call in the calling expression.",
        practiceTask: "Create a method 'getSquare' that takes an int and returns its square.",
        practiceQuestions: ["Use return keyword", "Declare return type as int"],
        mistakes: ["Type mismatch in return", "Forgetting return in non-void method"],
        mcqs: [
          { question: "Value passed to method?", options: ["Parameter", "Argument", "Variable"], correct: 1 },
          { question: "To exit method with value?", options: ["exit", "break", "return"], correct: 2 },
          { question: "Can a method return two values?", options: ["Yes", "No", "Only via arrays"], correct: 1 }
        ]
      },
      {
        id: "java-methods-overloading",
        name: "Method Overloading",
        explanation: "Method Overloading allows multiple methods to have the same name but different parameters (number or type).",
        importantPoints: ["Same name, different params", "Compile-time polymorphism", "Increases readability"],
        syntax: "void fun(int a) { ... }\nvoid fun(double a) { ... }",
        code: "public class Main {\n    static int add(int a, int b) {\n        return a + b;\n    }\n    \n    static double add(double a, double b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Int sum: \" + add(5, 5));\n        System.out.println(\"Double sum: \" + add(5.5, 2.5));\n    }\n}",
        sampleOutput: "Int sum: 10\nDouble sum: 8.0",
        asciiFlowchart: "( Start )\n    ↓\n[ Call Method ]\n    ↓\n[ Scan Signature ]\n    ↓\n< Match Types? >\n├── Yes → [ Execute block ]\n└── No  → / Error State /\n    ↓\n( End )",
        flowchartSteps: ["Scan method name", "Evaluate argument count/type", "Select best match", "Invoke specific logic"],
        executionExplanation: "The compiler determines which method to call based on the arguments provided (Static Binding).",
        practiceTask: "Overload a 'printData' method to handle an int and a String separately.",
        practiceQuestions: ["Same method name", "Different parameter types"],
        mistakes: ["Overloading by return type only (Not allowed)", "Ambiguous calls"],
        mcqs: [
          { question: "Overloading depends on?", options: ["Return type", "Parameters", "Access modifier"], correct: 1 },
          { question: "Is overloading dynamic?", options: ["Yes", "No (Static)"], correct: 1 },
          { question: "Can we overload main?", options: ["Yes", "No"], correct: 0 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 6: STRINGS & STRINGBUILDER",
    topics: [
      {
        id: "java-strings-methods",
        name: "String Methods",
        explanation: "Strings in Java are objects. They are immutable, meaning their value cannot be changed once created.",
        importantPoints: ["Immutable objects", "String Pool memory", "Common: length(), charAt(), equals()"],
        syntax: "String s = \"Code\";\ns.length();",
        code: "public class Main {\n    public static void main(String[] args) {\n        String str = \"CodeEase\";\n        System.out.println(\"Length: \" + str.length());\n        System.out.println(\"Upper: \" + str.toUpperCase());\n        System.out.println(\"Contains 'Ease': \" + str.contains(\"Ease\"));\n    }\n}",
        sampleOutput: "Length: 8\nUpper: CODEEASE\nContains 'Ease': true",
        asciiFlowchart: "( Start )\n    ↓\n[ Access Ref ]\n    ↓\n[ Call Logic ]\n    ↓\n[ Generate New Obj ]\n    ↓\n/ Display Result /\n    ↓\n( End )",
        flowchartSteps: ["Reference heap object", "Apply transformation logic", "Generate result", "Original remains unchanged"],
        executionExplanation: "String methods return a new string rather than modifying the original one in the pool.",
        practiceTask: "Take a string from user and print its first and last characters.",
        practiceQuestions: ["Use charAt(0)", "Use charAt(length-1)"],
        mistakes: ["Using == to compare string content (use .equals())", "IndexOutOfBounds for charAt"],
        mcqs: [
          { question: "Compare string content?", options: ["==", ".equals()", ".is()"], correct: 1 },
          { question: "Length of 'Hello'?", options: ["4", "5", "6"], correct: 1 },
          { question: "Are Strings mutable?", options: ["Yes", "No"], correct: 1 }
        ]
      },
      {
        id: "java-stringbuilder",
        name: "StringBuilder",
        explanation: "StringBuilder is used to create mutable (changeable) sequences of characters efficiently.",
        importantPoints: ["Mutable strings", "Efficient concatenation", "Non-synchronized (Fast)"],
        syntax: "StringBuilder sb = new StringBuilder(\"Hello\");\nsb.append(\" World\");",
        code: "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder(\"Code\");\n        sb.append(\"Ease\");\n        sb.insert(4, \"-\");\n        sb.reverse();\n        System.out.println(\"Result: \" + sb.toString());\n    }\n}",
        sampleOutput: "Result: esae-edoC",
        asciiFlowchart: "( Start )\n    ↓\n[ Init Buffer ]\n    ↓\n[ Modify In-Place ]\n    ↓\n[ Re-size if needed ]\n    ↓\n/ Return String /\n    ↓\n( End )",
        flowchartSteps: ["Allocate expandable buffer", "Modify bytes in place", "Resize if needed", "Convert to String"],
        executionExplanation: "StringBuilder modifies its internal array without creating multiple intermediate objects.",
        practiceTask: "Use StringBuilder to build a string 'Java-Logic' and then reverse it.",
        practiceQuestions: ["Use .append()", "Use .reverse()"],
        mistakes: ["Using StringBuilder when immutability is needed", "Thread safety (use StringBuffer if safe)"],
        mcqs: [
          { question: "Which is faster?", options: ["String", "StringBuilder"], correct: 1 },
          { question: "Method to add text at end?", options: ["add()", "append()", "push()"], correct: 1 },
          { question: "Is StringBuilder thread-safe?", options: ["Yes", "No"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 7: ARRAYS",
    topics: [
      {
        id: "java-arrays-1d",
        name: "1D Arrays",
        explanation: "An array is a collection of similar types of elements which has a contiguous memory location.",
        importantPoints: ["Fixed size", "0-indexed", "Contiguous memory"],
        syntax: "int[] arr = new int[5];\narr[0] = 10;",
        code: "public class Main {\n    public static void main(String[] args) {\n        int[] numbers = {10, 20, 30, 40};\n        System.out.println(\"First element: \" + numbers[0]);\n        System.out.println(\"Array Length: \" + numbers.length);\n        \n        for(int n : numbers) {\n            System.out.print(n + \" \");\n        }\n    }\n}",
        sampleOutput: "First element: 10\nArray Length: 4\n10 20 30 40 ",
        asciiFlowchart: "( Start )\n    ↓\n[ Allocate Heap ]\n    ↓\n[ Base Address ]\n    ↓\n[ Index Access ]\n    ↓\n/ Display Loop /\n    ↓\n( End )",
        flowchartSteps: ["Define array size", "Reserve memory block", "Access via index", "Iterate using loop"],
        executionExplanation: "Array access is O(1) because the address is calculated as: Base + (Index * Size).",
        practiceTask: "Find the average of 5 numbers stored in an array.",
        practiceQuestions: ["Sum elements using loop", "Divide by length"],
        mistakes: ["ArrayIndexOutOfBoundsException", "Forgetting size is fixed"],
        mcqs: [
          { question: "Index of first element?", options: ["1", "0", "-1"], correct: 1 },
          { question: "Property to get size?", options: ["size()", "length", "count"], correct: 1 },
          { question: "Declare an array?", options: ["int arr[]", "int[] arr", "Both"], correct: 2 }
        ]
      },
      {
        id: "java-arrays-2d",
        name: "2D Arrays (Matrices)",
        explanation: "A 2D array is an array of arrays, often used to represent matrices or grids.",
        importantPoints: ["Rows and Columns", "Nested indexing", "Grid structure"],
        syntax: "int[][] matrix = new int[row][col];",
        code: "public class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n        System.out.println(\"Element at [1][1]: \" + matrix[1][1]);\n    }\n}",
        sampleOutput: "Element at [1][1]: 5",
        asciiFlowchart: "( Start )\n    ↓\n[ Row Array ]\n    ↓\n[ Col Array ]\n    ↓\n[ Index Pointer ]\n    ↓\n/ Read Cell /\n    ↓\n( End )",
        flowchartSteps: ["Initialize outer array", "Initialize inner arrays", "Access using two indices", "Nested loops for traversal"],
        executionExplanation: "In Java, 2D arrays are actually arrays containing references to other arrays.",
        practiceTask: "Create a 2x2 matrix and print the sum of all its elements.",
        practiceQuestions: ["Use nested for loops", "Add to totalSum variable"],
        mistakes: ["Swapping rows and columns", "Inconsistent column lengths (Jagged arrays)"],
        mcqs: [
          { question: "Access row 2 col 3?", options: ["arr[2,3]", "arr[2][3]", "arr[1][2]"], correct: 2 },
          { question: "Are rows always same length?", options: ["Yes", "No"], correct: 1 },
          { question: "Memory for 2D array?", options: ["Heap", "Stack", "Registers"], correct: 0 }
        ]
      },
      {
        id: "java-arrays-sorting",
        name: "Sorting Logic",
        explanation: "Sorting arranges elements in a specific order (ascending or descending). Java provides built-in utilities for this.",
        importantPoints: ["Arrays.sort() utility", "Ascending by default", "Dual-Pivot Quicksort logic"],
        syntax: "java.util.Arrays.sort(arr);",
        code: "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {50, 10, 40, 20, 30};\n        Arrays.sort(arr);\n        System.out.println(\"Sorted: \" + Arrays.toString(arr));\n    }\n}",
        sampleOutput: "Sorted: [10, 20, 30, 40, 50]",
        asciiFlowchart: "( Start )\n    ↓\n/ Input List /\n    ↓\n[ Comparison ]\n    ↓\n[ Swap logic ]\n    ↓\n[ Iteration ]\n    ↓\n/ Sorted Output /\n    ↓\n( End )",
        flowchartSteps: ["Call sorting library", "Compare adjacent elements", "Move smaller values left", "Final ordered output"],
        executionExplanation: "Arrays.sort() uses an optimized version of Quicksort for primitives and Mergesort for objects.",
        practiceTask: "Sort an array of strings (names) and print them.",
        practiceQuestions: ["Use Arrays.sort()", "Check alphabetical order"],
        mistakes: ["Trying to sort null arrays", "Forgetting the import statement"],
        mcqs: [
          { question: "Package for sort utility?", options: ["java.io", "java.util", "java.lang"], correct: 1 },
          { question: "Default order of sort?", options: ["Ascending", "Descending", "Random"], correct: 0 },
          { question: "Sorts in-place?", options: ["Yes", "No"], correct: 0 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 8: CLASSES & OOP",
    topics: [
      {
        id: "java-oop-classes",
        name: "Classes & Objects",
        explanation: "Java is centered around objects. A class is a blueprint, and an object is an instance of that blueprint.",
        importantPoints: ["Class: Blueprint", "Object: Real Entity", "Memory: Stack & Heap"],
        syntax: "class Car {\n  String color;\n}\nCar myCar = new Car();",
        code: "class Student {\n    int id;\n    String name;\n    void display() {\n        System.out.println(\"ID: \" + id + \" Name: \" + name);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.id = 101;\n        s1.name = \"Alice\";\n        s1.display();\n    }\n}",
        sampleOutput: "ID: 101 Name: Alice",
        asciiFlowchart: "( Start )\n    ↓\n[ Define Class ]\n    ↓\n[ 'new' Call ]\n    ↓\n[ Allocate Heap ]\n    ↓\n[ Set Ref ]\n    ↓\n( End )",
        flowchartSteps: ["Write Class", "Call Constructor", "Map fields in memory", "Invoke behavior"],
        executionExplanation: "Variables are defined in the class, but values are stored in the unique object memory.",
        practiceTask: "Create a 'Dog' class with a 'bark()' method. Instantiate it in Main.",
        practiceQuestions: ["Define sound String", "Call bark() method"],
        mistakes: ["Not using 'new' keyword", "Accessing private members"],
        mcqs: [
          { question: "Instance of a class?", options: ["Method", "Object", "Variable"], correct: 1 },
          { question: "Keyword to create object?", options: ["create", "new", "init"], correct: 1 },
          { question: "Memory for objects?", options: ["Stack", "Heap", "Registers"], correct: 1 }
        ]
      },
      {
        id: "java-inheritance",
        name: "Inheritance",
        explanation: "Inheritance allows one class to acquire the properties and behaviors of another class.",
        importantPoints: ["extends keyword", "Code Reusability", "Parent-Child relation"],
        syntax: "class Child extends Parent { ... }",
        code: "class Animal {\n    void eat() { System.out.println(\"Eating...\"); }\n}\n\nclass Dog extends Animal {\n    void bark() { System.out.println(\"Barking...\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.eat();\n        d.bark();\n    }\n}",
        sampleOutput: "Eating...\nBarking...",
        asciiFlowchart: "( Start )\n    ↓\n[ Superclass Def ]\n    ↓\n[ Subclass extends ]\n    ↓\n[ Inherit Data ]\n    ↓\n< Override? >\n├── Yes → [ Use Sub logic ]\n└── No  → [ Use Super logic ]\n    ↓\n( End )",
        flowchartSteps: ["Define Superclass", "Extend with Subclass", "Inherit methods", "Override if needed"],
        executionExplanation: "The subclass has access to its own methods plus the non-private methods of the superclass.",
        practiceTask: "Create a 'Vehicle' parent and 'Car' child. Car should have a 'drive' method.",
        practiceQuestions: ["Use extends", "Call parent method"],
        mistakes: ["Multiple inheritance (Java doesn't support class multiple inheritance)", "Private members not inherited"],
        mcqs: [
          { question: "Keyword for inheritance?", options: ["implements", "extends", "inherits"], correct: 1 },
          { question: "Topmost class in Java?", options: ["Object", "Main", "Base"], correct: 0 },
          { question: "Does Java support multiple inheritance?", options: ["Yes", "No", "Only via interfaces"], correct: 2 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 9: EXCEPTION HANDLING",
    topics: [
      {
        id: "java-try-catch",
        name: "try / catch",
        explanation: "Exceptions are problems that arise during the execution of a program. The try-catch block handles these errors gracefully so the app doesn't crash.",
        importantPoints: ["try: Monitor code", "catch: Handle error", "Graceful recovery"],
        syntax: "try {\n  // risky code\n} catch (Exception e) {\n  // resolution\n}",
        code: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int[] nums = {1, 2};\n            System.out.println(nums[5]); // Risky!\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"Handled: Index doesn't exist.\");\n        }\n        System.out.println(\"Program continues...\");\n    }\n}",
        sampleOutput: "Handled: Index doesn't exist.\nProgram continues...",
        asciiFlowchart: "( Start )\n    ↓\n[ Try Block ]\n    ↓\n< Exception? >\n├── Yes → [ Catch Handler ]\n└── No  → [ Next Step ]\n    ↓\n[ Resume flow ]\n    ↓\n( End )",
        flowchartSteps: ["Run risky logic", "Detect runtime fault", "Jump to catch handler", "Resume main flow"],
        executionExplanation: "When an exception occurs in the try block, control is immediately transferred to the matching catch block.",
        practiceTask: "Create a try-catch for division by zero (ArithmeticException).",
        practiceQuestions: ["Divide by 0", "Print error message"],
        mistakes: ["Catching generic Exception when specific is better", "Leaving catch block empty (Silent failure)"],
        mcqs: [
          { question: "Which block runs if no exception occurs?", options: ["try", "catch", "finally"], correct: 0 },
          { question: "Keyword to handle errors?", options: ["fix", "catch", "error"], correct: 1 },
          { question: "Can we have multiple catch blocks?", options: ["Yes", "No"], correct: 0 }
        ]
      },
      {
        id: "java-throw-throws",
        name: "throw & throws",
        explanation: "The 'throw' keyword is used to manually trigger an exception, while 'throws' declares that a method might throw an exception.",
        importantPoints: ["throw: Trigger event", "throws: Sign contracts", "Flow control control"],
        syntax: "void fun() throws Exception { ... }\nthrow new Exception();",
        code: "public class Main {\n    static void checkAge(int age) {\n        if (age < 18) {\n            throw new ArithmeticException(\"Access denied - Minor\");\n        } else {\n            System.out.println(\"Access granted!\");\n        }\n    }\n\n    public static void main(String[] args) {\n        try {\n            checkAge(15);\n        } catch (Exception e) {\n            System.out.println(e.getMessage());\n        }\n    }\n}",
        sampleOutput: "Access denied - Minor",
        asciiFlowchart: "( Start )\n    ↓\n[ Logic Check ]\n    ↓\n< Valid Case? >\n├── No  → [ Instantiate Err ]\n│          ↓\n│         [ Throw Event ]\n└── Yes → / Success Flow /\n    ↓\n( End )",
        flowchartSteps: ["Validate business logic", "Instantiate Exception object", "Interrupt current call stack", "Delegate to caller"],
        executionExplanation: "Throwing an exception stops current logic and looks for the nearest handler (catch) up the stack.",
        practiceTask: "Use 'throw' to prevent a withdrawal if balance is less than amount.",
        practiceQuestions: ["Check balance", "Throw RuntimeException"],
        mistakes: ["Using throw instead of throws in method signature", "Throwing exceptions for normal control flow"],
        mcqs: [
          { question: "Where is 'throws' used?", options: ["Method signature", "Method body", "Constructor body"], correct: 0 },
          { question: "How many objects can 'throw' throw at once?", options: ["One", "Many", "Unlimited"], correct: 0 },
          { question: "Checked exceptions require?", options: ["try-catch or throws", "only throw", "nothing"], correct: 0 }
        ]
      },
      {
        id: "java-custom-exception",
        name: "Custom Exception",
        explanation: "You can create your own exception classes by extending the Exception class. This helps in writing business-specific error messages.",
        importantPoints: ["Extend Exception class", "Domain specific", "Better readability"],
        syntax: "class MyError extends Exception { ... }",
        code: "class LogicException extends Exception {\n    public LogicException(String s) { super(s); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            throw new LogicException(\"CodeEase custom error!\");\n        } catch (LogicException e) {\n            System.out.println(\"Caught: \" + e.getMessage());\n        }\n    }\n}",
        sampleOutput: "Caught: CodeEase custom error!",
        asciiFlowchart: "( Start )\n    ↓\n[ Extend Exception ]\n    ↓\n[ Init Constructor ]\n    ↓\n[ Object Creation ]\n    ↓\n[ Trigger Throw ]\n    ↓\n( End )",
        flowchartSteps: ["Inherit from standard Exception", "Add custom constructor", "Use like standard logic", "Standard catch handling"],
        executionExplanation: "A custom exception is just a normal class that follows the Throwable contract, allowing integration with try-catch logic.",
        practiceTask: "Create an 'InvalidEmailException' and throw it if a string doesn't contain '@'.",
        practiceQuestions: ["Define the class", "Check email string"],
        mistakes: ["Not extending 'Exception' or 'RuntimeException'", "Missing 'super(message)' call"],
        mcqs: [
          { question: "Base class for all exceptions?", options: ["Object", "Throwable", "Error"], correct: 1 },
          { question: "Custom exceptions should extend?", options: ["Exception", "Error", "String"], correct: 0 },
          { question: "Why use custom exceptions?", options: ["Speed", "Context-specific errors", "Memory"], correct: 1 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 10: COLLECTIONS API",
    topics: [
      {
        id: "java-arraylist",
        name: "ArrayList",
        explanation: "The ArrayList class is a resizable array, which can be found in the java.util package.",
        importantPoints: ["Dynamic Size", "Ordered List", "Generic Types"],
        syntax: "ArrayList<String> list = new ArrayList<>();",
        code: "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> fruits = new ArrayList<>();\n        fruits.add(\"Apple\");\n        fruits.add(\"Banana\");\n        fruits.add(\"Mango\");\n\n        System.out.println(\"Size: \" + fruits.size());\n        System.out.println(\"First Fruit: \" + fruits.get(0));\n    }\n}",
        sampleOutput: "Size: 3\nFirst Fruit: Apple",
        asciiFlowchart: "( Start )\n    ↓\n[ Init Capacity ]\n    ↓\n< Add Item? >\n│ ├── Yes → < Is Full? >\n│ │          ├── Yes → [ Re-size ]\n│ │          └── No  → [ Insert ]\n│ └──────────┘\n└── No → ( End )",
        flowchartSteps: ["Initialize Dynamic Array", "Append elements", "Manage indexing", "Iterate through items"],
        executionExplanation: "Internally, ArrayList uses an array that gets replaced by a larger one as it fills up.",
        practiceTask: "Add 5 numbers to an ArrayList and find their sum.",
        practiceQuestions: ["Use ArrayList<Integer>", "Use a for-each loop"],
        mistakes: ["Using primitives instead of wrapper classes (int vs Integer)", "IndexOutOfBoundsException"],
        mcqs: [
          { question: "Is ArrayList resizable?", options: ["Yes", "No"], correct: 0 },
          { question: "Get element by index?", options: ["get()", "fetch()", "pull()"], correct: 0 },
          { question: "Remove all items?", options: ["clear()", "empty()", "delete()"], correct: 0 }
        ]
      }
    ]
  },
  {
    title: "LEVEL 11: FILE HANDLING",
    topics: [
      {
        id: "java-file-io",
        name: "FileReader & FileWriter",
        explanation: "Java File Handling allows you to work with files for reading from and writing data into them.",
        importantPoints: ["java.io package", "Persistence", "Stream Management"],
        syntax: "FileWriter writer = new FileWriter(\"file.txt\");",
        code: "import java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            FileWriter fw = new FileWriter(\"test.txt\");\n            fw.write(\"Logic saved to file!\");\n            fw.close();\n            System.out.println(\"Successfully written.\");\n        } catch(IOException e) {\n            System.out.println(\"Error occurred.\");\n        }\n    }\n}",
        sampleOutput: "Successfully written.",
        asciiFlowchart: "( Start )\n    ↓\n[ Open Stream ]\n    ↓\n/ Write Data /\n    ↓\n[ Flush Buffer ]\n    ↓\n[ Close Stream ]\n    ↓\n( End )",
        flowchartSteps: ["Access File System", "Link Output Stream", "Transfer bits", "Secure and close"],
        executionExplanation: "Streams are pipes of data between your code and the physical disk hardware.",
        practiceTask: "Create a program that writes your name to 'name.txt'.",
        practiceQuestions: ["Use try-catch block", "Close the file"],
        mistakes: ["Forgetting to close the writer (data might not save)", "No exception handling"],
        mcqs: [
          { question: "Package for File I/O?", options: ["java.util", "java.io", "java.net"], correct: 1 },
          { question: "Exception for file errors?", options: ["FileException", "IOException", "DiskException"], correct: 1 },
          { question: "Closes the stream?", options: ["stop()", "finish()", "close()"], correct: 2 }
        ]
      }
    ]
  }
];

export const JavaTutorial: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeLevel, setActiveLevel] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);

  useEffect(() => {
    const topicId = searchParams.get('topic');
    if (topicId) {
      JAVA_TUTORIAL_DATA.forEach((level, lIdx) => {
        level.topics.forEach((topic, tIdx) => {
          if (topic.id === topicId) {
            setActiveLevel(lIdx);
            setActiveTopic(tIdx);
          }
        });
      });
    }
  }, [searchParams]);

  const currentLevel = JAVA_TUTORIAL_DATA[activeLevel];
  const currentTopic = currentLevel?.topics[activeTopic];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-20">
      <TutorialLanding 
        title="Java Specialist" 
        icon="☕" 
        subtitle="Master Enterprise logic. Build robust, high-performance, and platform-independent applications." 
        features={["Enterprise Level", "Object Oriented", "JVM Architecture", "Industry Standard"]} 
      />
      
      <div className="sticky top-24 z-50 p-3 ce-glass rounded-[2.5rem] border border-[#BDD8E9]/20 shadow-2xl flex flex-col md:flex-row gap-6 overflow-hidden">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
          {JAVA_TUTORIAL_DATA.map((level, i) => (
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
              language="Java" 
              imageDescription=""
            />
          )}
        </div>
      </div>
      <TutorialSummary 
        takeaways={["Strict Typing", "Memory Hierarchy", "OOP Design Patterns"]} 
        bestPractices={["Always Close Streams", "Handle Checked Exceptions", "Follow CamelCase Naming"]} 
      />
    </div>
  );
};
