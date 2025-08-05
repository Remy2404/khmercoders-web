-- Article seed data for development and testing
-- Contains 30 short articles about programming topics
-- Generated for Khmer Coders community

INSERT INTO `article` (`id`, `user_id`, `title`, `slug`, `image`, `summary`, `content`, `published`, `approved_by_ai`, `review_status`, `review_by`, `created_at`, `updated_at`)
VALUES
  -- Article 1
  ('art_01HQTG5BBRX3XY1JJVNN6CZ001', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB', 'Getting Started with JavaScript', 'getting-started-with-javascript', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop', 'Learn the fundamentals of JavaScript programming language.', 'JavaScript is a versatile programming language that powers the web. In this comprehensive guide, we will explore the fundamental concepts that every developer needs to master.

## Variables and Data Types

JavaScript provides several ways to declare variables:

```javascript
// Using let for block-scoped variables
let userName = "John Doe";
let age = 25;

// Using const for constants
const PI = 3.14159;
const apiUrl = "https://api.example.com";

// Basic data types
let isActive = true; // Boolean
let score = null; // Null
let data; // Undefined
```

## Functions

Functions are the building blocks of JavaScript applications:

```javascript
// Function declaration
function greetUser(name) {
    return `Hello, ${name}!`;
}

// Arrow function (ES6)
const calculateArea = (radius) => {
    return PI * radius * radius;
};

// Function with default parameters
function createUser(name, role = "user") {
    return {
        name: name,
        role: role,
        createdAt: new Date()
    };
}
```

## Control Structures

JavaScript provides various control structures for program flow:

```javascript
// Conditional statements
if (age >= 18) {
    console.log("You are an adult");
} else if (age >= 13) {
    console.log("You are a teenager");
} else {
    console.log("You are a child");
}

// Loops
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i + 1}`);
}

// Array iteration
const fruits = ["apple", "banana", "orange"];
fruits.forEach(fruit => {
    console.log(`I like ${fruit}`);
});
```

## Objects and Arrays

Understanding objects and arrays is crucial for JavaScript development:

```javascript
// Creating objects
const user = {
    name: "Alice",
    email: "alice@example.com",
    skills: ["HTML", "CSS", "JavaScript"],
    isActive: true
};

// Accessing object properties
console.log(user.name); // Dot notation
console.log(user["email"]); // Bracket notation

// Working with arrays
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const evenNumbers = numbers.filter(num => num % 2 === 0);
```

JavaScript is essential for modern web development, enabling you to create interactive and dynamic user experiences. Practice these fundamentals regularly to build a strong foundation for more advanced concepts.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717247622, 1717247622),

  -- Article 2
  ('art_01HQTG5BBRX3XY1JJVNN6CZ002', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC', 'Understanding CSS Flexbox', 'understanding-css-flexbox', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop', 'Master CSS Flexbox for responsive layouts.', 'CSS Flexbox is a powerful one-dimensional layout method that revolutionizes how we create flexible and responsive designs. This comprehensive guide will take you through everything you need to know about Flexbox.

## What is Flexbox?

Flexbox, short for Flexible Box Layout, is a CSS layout module that makes it easier to design flexible responsive layout structures without using floats or positioning. It provides an efficient way to arrange, distribute, and align items in a container.

![Flexbox Layout Example](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop)

## Flex Container Properties

The parent element becomes a flex container when you apply `display: flex`:

```css
.container {
    display: flex;
    
    /* Direction of flex items */
    flex-direction: row; /* row, row-reverse, column, column-reverse */
    
    /* How items wrap */
    flex-wrap: nowrap; /* nowrap, wrap, wrap-reverse */
    
    /* Shorthand for direction and wrap */
    flex-flow: row nowrap;
    
    /* Horizontal alignment */
    justify-content: flex-start; /* flex-start, flex-end, center, space-between, space-around, space-evenly */
    
    /* Vertical alignment */
    align-items: stretch; /* stretch, flex-start, flex-end, center, baseline */
    
    /* Align wrapped lines */
    align-content: stretch;
}
```

## Flex Item Properties

Individual flex items can be controlled with these properties:

```css
.item {
    /* Growth factor */
    flex-grow: 0;
    
    /* Shrink factor */
    flex-shrink: 1;
    
    /* Initial size */
    flex-basis: auto;
    
    /* Shorthand for grow, shrink, basis */
    flex: 0 1 auto;
    
    /* Individual alignment */
    align-self: auto; /* auto, flex-start, flex-end, center, baseline, stretch */
    
    /* Order of appearance */
    order: 0;
}
```

## Practical Examples

### Navigation Bar
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
}

.navbar .logo {
    font-size: 1.5rem;
    color: white;
}

.navbar .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}
```

### Card Layout
```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
}

.card {
    flex: 1 1 300px; /* grow, shrink, basis */
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 1rem;
}
```

## Common Flexbox Patterns

![Flexbox Patterns](https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=300&fit=crop)

1. **Centering Content**: Use `justify-content: center` and `align-items: center`
2. **Equal Height Columns**: Items naturally stretch to match the tallest item
3. **Sticky Footer**: Use `flex-grow: 1` on the main content area
4. **Responsive Navigation**: Combine with media queries for mobile-friendly menus

## Browser Support and Best Practices

Flexbox has excellent browser support across all modern browsers. Here are some best practices:

- Use Flexbox for one-dimensional layouts (rows or columns)
- Combine with CSS Grid for complex two-dimensional layouts
- Always test on different screen sizes
- Use `gap` property for consistent spacing between items
- Consider fallbacks for older browsers if needed

Mastering Flexbox will significantly improve your CSS layout skills and make responsive design much more manageable. Practice with different combinations of properties to understand how they interact with each other.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717248622, 1717248622),

  -- Article 3
  ('art_01HQTG5BBRX3XY1JJVNN6CZ003', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZD', 'Introduction to React Hooks', 'introduction-to-react-hooks', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 'Learn how to use React Hooks in functional components.', 'React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components. This comprehensive guide covers the most important hooks and their practical applications.

## What are React Hooks?

React Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 and have become the standard way to write React components.

## useState Hook

The `useState` hook allows you to add state to functional components:

```jsx
import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    
    const increment = () => {
        setCount(count + 1);
    };
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={increment}>Increment</button>
            
            <input 
                type="text" 
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
            />
            <p>Hello, {name}!</p>
        </div>
    );
}
```

## useEffect Hook

The `useEffect` hook handles side effects in functional components:

```jsx
import React, { useState, useEffect } from "react";

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Effect runs after every render
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [userId]); // Dependency array - effect runs when userId changes
    
    // Cleanup effect
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Component is active");
        }, 1000);
        
        // Cleanup function
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;
    
    return (
        <div>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
        </div>
    );
}
```

## Custom Hooks

Create reusable logic by building custom hooks:

```jsx
// Custom hook for API calls
function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [url]);
    
    return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    
    const setValue = (value) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };
    
    return [storedValue, setValue];
}

// Using custom hooks
function App() {
    const { data: posts, loading, error } = useApi("/api/posts");
    const [theme, setTheme] = useLocalStorage("theme", "light");
    
    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className={`app ${theme}`}>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                Toggle Theme
            </button>
            <div>
                {posts?.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

## Other Important Hooks

### useContext
```jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function Profile() {
    const { user, logout } = useContext(AuthContext);
    
    return (
        <div>
            <h2>Welcome, {user?.name}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
```

### useReducer
```jsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        case "reset":
            return initialState;
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        </div>
    );
}
```

## Hook Rules

Remember these important rules when using hooks:

1. **Only call hooks at the top level** - Don''t call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call hooks from React function components or custom hooks
3. **Use the ESLint plugin** - Install `eslint-plugin-react-hooks` to catch common mistakes

React Hooks provide a more direct way to use React features and make it easier to share stateful logic between components. They lead to cleaner, more readable code and better component composition.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717249622, 1717249622),

  -- Article 4
  ('art_01HQTG5BBRX3XY1JJVNN6CZ004', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZE', 'Python Lists and Dictionaries', 'python-lists-and-dictionaries', 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&h=400&fit=crop', 'Explore Python data structures: lists and dictionaries.', 'Lists and dictionaries are fundamental data structures in Python that form the backbone of most Python programs. This comprehensive guide will teach you everything you need to know about working with these powerful data structures.

## Understanding Python Lists

Lists are ordered, mutable collections that can store multiple items of different data types. They are one of the most versatile data structures in Python.

![Python Data Structures](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop)

### Creating and Basic Operations

```python
# Creating lists
fruits = ["apple", "banana", "orange", "grape"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14, None]
empty_list = []

# List methods
print(len(fruits))  # Get length: 4
print(fruits[0])    # Access first item: "apple"
print(fruits[-1])   # Access last item: "grape"

# Adding items
fruits.append("mango")           # Add to end
fruits.insert(1, "strawberry")  # Insert at index 1
fruits.extend(["kiwi", "peach"]) # Add multiple items

# Removing items
fruits.remove("banana")  # Remove by value
last_fruit = fruits.pop()  # Remove and return last item
del fruits[0]  # Remove by index

print(fruits)
```

### List Slicing and Comprehensions

```python
# Slicing
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:7])     # [2, 3, 4, 5, 6]
print(numbers[:5])      # [0, 1, 2, 3, 4]
print(numbers[5:])      # [5, 6, 7, 8, 9]
print(numbers[::2])     # [0, 2, 4, 6, 8] (step of 2)
print(numbers[::-1])    # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (reverse)

# List comprehensions
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Conditional comprehensions
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# Nested comprehensions
matrix = [[i*j for j in range(3)] for i in range(3)]
print(matrix)  # [[0, 0, 0], [0, 1, 2], [0, 2, 4]]
```

### Advanced List Operations

```python
# Sorting
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]
numbers.sort()  # Sort in place
print(numbers)  # [1, 1, 2, 3, 4, 5, 5, 6, 9]

# Sorting with custom key
words = ["python", "java", "c", "javascript", "go"]
words.sort(key=len)  # Sort by length
print(words)  # ["c", "go", "java", "python", "javascript"]

# Finding items
if "python" in words:
    index = words.index("python")
    print(f"Python found at index {index}")

# Counting occurrences
numbers = [1, 2, 3, 2, 2, 4, 5]
count_of_2 = numbers.count(2)
print(f"Number 2 appears {count_of_2} times")
```

## Working with Python Dictionaries

Dictionaries are unordered, mutable collections that store key-value pairs. They provide fast lookup, insertion, and deletion operations.

### Creating and Basic Operations

```python
# Creating dictionaries
student = {
    "name": "Alice",
    "age": 20,
    "courses": ["Math", "Physics", "Chemistry"],
    "gpa": 3.8
}

# Alternative creation methods
student2 = dict(name="Bob", age=22, major="Computer Science")
student3 = dict([("name", "Charlie"), ("age", 19)])

# Accessing values
print(student["name"])           # "Alice"
print(student.get("age"))        # 20
print(student.get("height", 0))  # 0 (default value)

# Adding/updating values
student["height"] = 165
student["age"] = 21
student.update({"weight": 60, "city": "New York"})

print(student)
```

### Dictionary Methods and Operations

```python
# Dictionary methods
grades = {"math": 85, "physics": 92, "chemistry": 78, "biology": 88}

# Get all keys, values, and items
print(grades.keys())    # dict_keys(["math", "physics", "chemistry", "biology"])
print(grades.values())  # dict_values([85, 92, 78, 88])
print(grades.items())   # dict_items([("math", 85), ("physics", 92), ...])

# Iterating through dictionaries
for subject in grades:
    print(f"{subject}: {grades[subject]}")

for subject, grade in grades.items():
    print(f"{subject}: {grade}")

# Dictionary comprehensions
squared_grades = {subject: grade**2 for subject, grade in grades.items()}
high_grades = {subject: grade for subject, grade in grades.items() if grade > 85}

print(squared_grades)
print(high_grades)
```

### Advanced Dictionary Techniques

```python
from collections import defaultdict, Counter

# Using defaultdict
dd = defaultdict(list)
dd["fruits"].append("apple")
dd["fruits"].append("banana")
dd["vegetables"].append("carrot")
print(dict(dd))  # {"fruits": ["apple", "banana"], "vegetables": ["carrot"]}

# Using Counter
text = "hello world hello python world"
word_count = Counter(text.split())
print(word_count)  # Counter({"hello": 2, "world": 2, "python": 1})

# Nested dictionaries
company = {
    "employees": {
        "john": {"position": "developer", "salary": 75000},
        "jane": {"position": "designer", "salary": 65000},
        "bob": {"position": "manager", "salary": 85000}
    },
    "departments": ["IT", "HR", "Finance"]
}

# Accessing nested data
john_salary = company["employees"]["john"]["salary"]
print(f"John''s salary: ${john_salary}")

# Safe nested access
def get_nested(dictionary, keys, default=None):
    for key in keys:
        if isinstance(dictionary, dict) and key in dictionary:
            dictionary = dictionary[key]
        else:
            return default
    return dictionary

salary = get_nested(company, ["employees", "alice", "salary"], "Not found")
print(salary)  # "Not found"
```

## Practical Examples

### Data Processing with Lists and Dictionaries

```python
# Student grade management system
students = [
    {"name": "Alice", "grades": [85, 92, 78, 96]},
    {"name": "Bob", "grades": [79, 85, 88, 91]},
    {"name": "Charlie", "grades": [95, 89, 92, 97]},
    {"name": "Diana", "grades": [88, 94, 87, 93]}
]

# Calculate average grades
for student in students:
    avg_grade = sum(student["grades"]) / len(student["grades"])
    student["average"] = round(avg_grade, 2)

# Find top student
top_student = max(students, key=lambda s: s["average"])
print(f"Top student: {top_student[''name'']} with average {top_student[''average'']}")

# Group students by grade range
grade_ranges = {"A": [], "B": [], "C": []}
for student in students:
    avg = student["average"]
    if avg >= 90:
        grade_ranges["A"].append(student["name"])
    elif avg >= 80:
        grade_ranges["B"].append(student["name"])
    else:
        grade_ranges["C"].append(student["name"])

print("Grade distribution:", grade_ranges)
```

![Data Analysis](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop)

## Performance Considerations

- **Lists**: Great for ordered data, sequential access, and when you need to maintain insertion order
- **Dictionaries**: Excellent for key-based lookups, unique keys, and when you need fast access by identifier
- **Memory usage**: Dictionaries use more memory than lists due to hash table overhead
- **Time complexity**: Dictionary lookups are O(1) average case, while list searches are O(n)

## Best Practices

1. Use list comprehensions for simple transformations
2. Choose dictionaries when you need fast lookups by key
3. Use `get()` method for safe dictionary access
4. Consider using `collections.defaultdict` for grouping operations
5. Use meaningful variable names and comments for complex data structures

Understanding lists and dictionaries thoroughly will make you a more effective Python programmer. These data structures are the foundation for more complex algorithms and data processing tasks.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717250622, 1717250622),

  -- Article 5
  ('art_01HQTG5BBRX3XY1JJVNN6CZ005', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZF', 'Git Basics for Beginners', 'git-basics-for-beginners', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop', 'Learn essential Git commands for version control.', 'Git is a powerful distributed version control system that has become essential for software development. Whether you''re working alone or with a team, understanding Git is crucial for managing your code effectively and collaborating with others.

## What is Git?

Git is a distributed version control system created by Linus Torvalds in 2005. It tracks changes in files and allows multiple developers to work on the same project simultaneously without conflicts.

![Git Workflow](https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=300&fit=crop)

## Git Workflow Overview

Git operates with three main areas:
- **Working Directory**: Where you make changes to your files
- **Staging Area (Index)**: Where you prepare changes for commit
- **Repository**: Where Git stores the complete history of your project

![Git Areas](https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=300&fit=crop)

## Essential Git Commands

### Setting Up Git

```bash
# Configure your identity (do this once)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check your configuration
git config --list

# Get help for any command
git help <command>
git <command> --help
```

### Creating and Cloning Repositories

```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone https://github.com/username/repository.git

# Clone to a specific directory
git clone https://github.com/username/repository.git my-project
```

### Basic Workflow Commands

```bash
# Check the status of your working directory
git status

# Add files to staging area
git add filename.txt          # Add specific file
git add .                     # Add all files in current directory
git add *.js                  # Add all JavaScript files
git add -A                    # Add all changes (including deletions)

# Commit changes
git commit -m "Add new feature"
git commit -am "Update existing files"  # Add and commit modified files

# View commit history
git log                       # Full history
git log --oneline            # Compact view
git log --graph              # Show branch structure
git log -5                   # Show last 5 commits
```

### Working with Branches

```bash
# List all branches
git branch                   # Local branches
git branch -r               # Remote branches
git branch -a               # All branches

# Create a new branch
git branch feature-login
git checkout -b feature-login  # Create and switch to new branch

# Switch between branches
git checkout main
git checkout feature-login
git switch main             # Modern syntax (Git 2.23+)

# Merge branches
git checkout main
git merge feature-login

# Delete branches
git branch -d feature-login    # Delete merged branch
git branch -D feature-login    # Force delete unmerged branch
```

### Remote Repository Operations

```bash
# View remote repositories
git remote -v

# Add a remote repository
git remote add origin https://github.com/username/repository.git

# Push changes to remote
git push origin main
git push -u origin main      # Set upstream for first push

# Pull changes from remote
git pull origin main
git pull                     # Pull from tracked branch

# Fetch changes without merging
git fetch origin
```

## Practical Git Scenarios

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- filename.txt
git restore filename.txt     # Modern syntax

# Unstage files
git reset HEAD filename.txt
git restore --staged filename.txt  # Modern syntax

# Undo last commit (keep changes in working directory)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create a new commit that undoes changes
git revert HEAD
```

### Working with Differences

```bash
# Show differences
git diff                     # Working directory vs staging
git diff --staged           # Staging vs last commit
git diff HEAD               # Working directory vs last commit
git diff branch1 branch2    # Compare branches

# Show changes in specific commit
git show <commit-hash>
```

### Stashing Changes

```bash
# Save current work temporarily
git stash
git stash save "Work in progress on feature X"

# List stashes
git stash list

# Apply stashed changes
git stash apply             # Apply most recent stash
git stash apply stash@{1}   # Apply specific stash

# Apply and remove stash
git stash pop

# Drop a stash
git stash drop stash@{1}
```

## Git Best Practices

### Commit Message Guidelines

```bash
# Good commit messages
git commit -m "Add user authentication system"
git commit -m "Fix memory leak in image processing"
git commit -m "Update README with installation instructions"

# Use conventional commit format
git commit -m "feat: add user registration functionality"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update API documentation"
```

### Branching Strategies

```bash
# Feature branch workflow
git checkout -b feature/user-profile
# ... make changes ...
git add .
git commit -m "Implement user profile page"
git push origin feature/user-profile
# ... create pull request ...

# Hotfix workflow
git checkout -b hotfix/critical-bug
# ... fix the bug ...
git add .
git commit -m "Fix critical security vulnerability"
git checkout main
git merge hotfix/critical-bug
git push origin main
```

## Common Git Workflows

### Collaborative Development

```bash
# Before starting work
git pull origin main

# Create feature branch
git checkout -b feature/new-component

# Work on your feature
git add .
git commit -m "Add new component structure"
git commit -m "Implement component logic"
git commit -m "Add component tests"

# Push feature branch
git push origin feature/new-component

# After code review and approval
git checkout main
git pull origin main
git merge feature/new-component
git push origin main
git branch -d feature/new-component
```

### Resolving Merge Conflicts

```bash
# When conflicts occur during merge
git merge feature-branch
# ... conflicts reported ...

# Edit conflicted files manually, then:
git add conflicted-file.txt
git commit -m "Resolve merge conflicts"

# Or use merge tool
git mergetool
```

## Advanced Git Tips

```bash
# View file history
git log --follow filename.txt

# Find when a bug was introduced
git bisect start
git bisect bad HEAD
git bisect good v1.0

# Cherry-pick specific commits
git cherry-pick <commit-hash>

# Interactive rebase for cleaning up history
git rebase -i HEAD~3

# Create and apply patches
git format-patch -1 HEAD
git apply patch-file.patch

# Work with submodules
git submodule add https://github.com/user/library.git lib
git submodule update --init --recursive
```

## Git Aliases for Productivity

```bash
# Set up useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --decorate"

# Now you can use shortcuts
git st    # instead of git status
git co main  # instead of git checkout main
git lg    # beautiful log output
```

Understanding Git is essential for modern software development. Start with these basic commands and gradually incorporate more advanced features as you become comfortable. Remember, Git is designed to be safe - you rarely lose work permanently, and there''s usually a way to recover from mistakes.

Practice these commands regularly, and don''t be afraid to experiment in a test repository. The more you use Git, the more natural it becomes, and the more productive you''ll be as a developer.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717251622, 1717251622),

  -- Article 6
  ('art_01HQTG5BBRX3XY1JJVNN6CZ006', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 'Building APIs with Node.js', 'building-apis-with-nodejs', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop', 'Create RESTful APIs using Node.js and Express.', 'Node.js is perfect for building fast and scalable APIs. With Express framework, you can create RESTful endpoints easily. This article covers setting up Express, creating routes, handling requests, and connecting to databases.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717252622, 1717252622),

  -- Article 7
  ('art_01HQTG5BBRX3XY1JJVNN6CZ007', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB', 'Database Design Principles', 'database-design-principles', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop', 'Learn fundamental database design concepts.', 'Good database design is crucial for application performance. This article covers normalization, relationships, indexing, and best practices. Understanding these principles helps create efficient and maintainable database schemas.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717253622, 1717253622),

  -- Article 8
  ('art_01HQTG5BBRX3XY1JJVNN6CZ008', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC', 'Responsive Web Design', 'responsive-web-design', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop', 'Create websites that work on all devices.', 'Responsive design ensures your website looks great on all devices. This guide covers media queries, flexible grids, and mobile-first approach. Learn how to use CSS Grid and Flexbox for responsive layouts.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717254622, 1717254622),

  -- Article 9
  ('art_01HQTG5BBRX3XY1JJVNN6CZ009', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZD', 'JavaScript ES6 Features', 'javascript-es6-features', 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop', 'Explore modern JavaScript ES6+ features.', 'ES6 introduced many powerful features to JavaScript including arrow functions, template literals, destructuring, and promises. These features make JavaScript code more readable and efficient. Learn how to use them in your projects.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717255622, 1717255622),

  -- Article 10
  ('art_01HQTG5BBRX3XY1JJVNN6CZ010', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZE', 'Testing Your Code', 'testing-your-code', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop', 'Introduction to software testing principles.', 'Testing is essential for reliable software. This article covers unit testing, integration testing, and test-driven development. Learn how to write effective tests using popular testing frameworks and improve code quality.', 0, 1, 'pending', NULL, 1717256622, 1717256622),

  -- Article 11
  ('art_01HQTG5BBRX3XY1JJVNN6CZ011', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZF', 'Docker for Developers', 'docker-for-developers', 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop', 'Containerize your applications with Docker.', 'Docker simplifies application deployment by using containers. This guide covers Docker basics, creating Dockerfiles, managing containers, and Docker Compose for multi-container applications. Containerization improves consistency across environments.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717257622, 1717257622),

  -- Article 12
  ('art_01HQTG5BBRX3XY1JJVNN6CZ012', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB', 'Understanding Async/Await', 'understanding-async-await', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop', 'Master asynchronous JavaScript programming.', 'Async/await makes asynchronous code easier to read and write. This article explains how async/await works, error handling with try/catch, and when to use it over Promises. Learn to handle asynchronous operations effectively.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717258622, 1717258622),

  -- Article 13
  ('art_01HQTG5BBRX3XY1JJVNN6CZ013', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC', 'CSS Grid Layout', 'css-grid-layout', 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop', 'Create complex layouts with CSS Grid.', 'CSS Grid is a powerful 2D layout system. This guide covers grid containers, grid items, grid lines, and areas. Learn how to create complex responsive layouts with minimal CSS code using CSS Grid properties.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717259622, 1717259622),

  -- Article 14
  ('art_01HQTG5BBRX3XY1JJVNN6CZ014', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZD', 'API Authentication', 'api-authentication', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop', 'Secure your APIs with proper authentication.', 'API security is crucial for web applications. This article covers different authentication methods including JWT tokens, OAuth, and API keys. Learn how to implement secure authentication and protect your API endpoints from unauthorized access.', 0, 1, 'pending', NULL, 1717260622, 1717260622),

  -- Article 15
  ('art_01HQTG5BBRX3XY1JJVNN6CZ015', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZE', 'Python Web Scraping', 'python-web-scraping', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop', 'Extract data from websites using Python.', 'Web scraping allows you to extract data from websites automatically. This guide covers Python libraries like BeautifulSoup and Scrapy. Learn how to parse HTML, handle forms, and respect robots.txt while scraping responsibly.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717261622, 1717261622),

  -- Article 16
  ('art_01HQTG5BBRX3XY1JJVNN6CZ016', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZF', 'MongoDB Basics', 'mongodb-basics', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop', 'Introduction to NoSQL database MongoDB.', 'MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. This article covers basic operations like creating databases, collections, inserting, querying, and updating documents. Perfect for beginners.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717262622, 1717262622),

  -- Article 17
  ('art_01HQTG5BBRX3XY1JJVNN6CZ017', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 'Clean Code Principles', 'clean-code-principles', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop', 'Write maintainable and readable code.', 'Clean code is easy to read, understand, and maintain. This article covers principles like meaningful naming, small functions, comments, and code organization. Following these principles makes your code more professional and easier to work with.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717263622, 1717263622),

  -- Article 18
  ('art_01HQTG5BBRX3XY1JJVNN6CZ018', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB', 'TypeScript Fundamentals', 'typescript-fundamentals', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop', 'Add type safety to your JavaScript projects.', 'TypeScript adds static typing to JavaScript, helping catch errors during development. This guide covers basic types, interfaces, classes, and generics. Learn how TypeScript improves code quality and developer experience.', 0, 1, 'pending', NULL, 1717264622, 1717264622),

  -- Article 19
  ('art_01HQTG5BBRX3XY1JJVNN6CZ019', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC', 'Vue.js Components', 'vuejs-components', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop', 'Build reusable components in Vue.js.', 'Components are the building blocks of Vue.js applications. This article covers creating components, props, events, and slots. Learn how to build reusable and maintainable user interface components in Vue.js.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717265622, 1717265622),

  -- Article 20
  ('art_01HQTG5BBRX3XY1JJVNN6CZ020', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZD', 'Performance Optimization', 'performance-optimization', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop', 'Make your web applications faster.', 'Performance optimization is crucial for user experience. This article covers techniques like code splitting, lazy loading, image optimization, and caching. Learn how to identify performance bottlenecks and improve application speed.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717266622, 1717266622),

  -- Article 21
  ('art_01HQTG5BBRX3XY1JJVNN6CZ021', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZE', 'Regular Expressions', 'regular-expressions', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop', 'Master pattern matching with regex.', 'Regular expressions are powerful tools for pattern matching and text processing. This guide covers regex syntax, common patterns, and practical examples. Learn how to validate input, extract data, and manipulate strings effectively.', 0, 1, 'pending', NULL, 1717267622, 1717267622),

  -- Article 22
  ('art_01HQTG5BBRX3XY1JJVNN6CZ022', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZF', 'Linux Command Line', 'linux-command-line', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop', 'Essential Linux commands for developers.', 'The command line is a powerful tool for developers. This article covers essential Linux commands like ls, cd, grep, find, and chmod. Learn how to navigate the file system, manage files, and automate tasks using shell commands.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717268622, 1717268622),

  -- Article 23
  ('art_01HQTG5BBRX3XY1JJVNN6CZ023', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB', 'GraphQL Introduction', 'graphql-introduction', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop', 'Query APIs more efficiently with GraphQL.', 'GraphQL is a query language for APIs that allows clients to request exactly the data they need. This article covers GraphQL basics, schemas, queries, mutations, and how it differs from REST APIs.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717269622, 1717269622),

  -- Article 24
  ('art_01HQTG5BBRX3XY1JJVNN6CZ024', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC', 'State Management in React', 'state-management-in-react', 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=400&fit=crop', 'Manage application state effectively.', 'State management is crucial for complex React applications. This article covers useState, useReducer, Context API, and popular libraries like Redux and Zustand. Learn when and how to use different state management solutions.', 0, 1, 'pending', NULL, 1717270622, 1717270622),

  -- Article 25
  ('art_01HQTG5BBRX3XY1JJVNN6CZ025', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZD', 'Microservices Architecture', 'microservices-architecture', 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop', 'Build scalable applications with microservices.', 'Microservices architecture breaks applications into small, independent services. This guide covers benefits, challenges, communication patterns, and deployment strategies. Learn when microservices are appropriate for your project.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717271622, 1717271622),

  -- Article 26
  ('art_01HQTG5BBRX3XY1JJVNN6CZ026', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZE', 'CSS Animations', 'css-animations', 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=400&fit=crop', 'Create engaging animations with CSS.', 'CSS animations enhance user experience by adding motion to web pages. This article covers keyframes, transitions, transforms, and animation properties. Learn how to create smooth, performant animations using only CSS.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717272622, 1717272622),

  -- Article 27
  ('art_01HQTG5BBRX3XY1JJVNN6CZ027', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZF', 'Agile Development', 'agile-development', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop', 'Understand Agile software development methodology.', 'Agile development emphasizes iterative development, collaboration, and adaptability. This article covers Scrum, Kanban, user stories, and sprint planning. Learn how Agile methodologies improve team productivity and project success.', 0, 1, 'pending', NULL, 1717273622, 1717273622),

  -- Article 28
  ('art_01HQTG5BBRX3XY1JJVNN6CZ028', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 'Web Accessibility', 'web-accessibility', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop', 'Build inclusive web applications.', 'Web accessibility ensures your applications are usable by everyone, including people with disabilities. This guide covers WCAG guidelines, semantic HTML, ARIA attributes, and testing tools. Create inclusive digital experiences.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717274622, 1717274622),

  -- Article 29
  ('art_01HQTG5BBRX3XY1JJVNN6CZ029', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB', 'Data Structures and Algorithms', 'data-structures-and-algorithms', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop', 'Foundation concepts for programming interviews.', 'Understanding data structures and algorithms is essential for problem-solving and technical interviews. This article covers arrays, linked lists, trees, sorting algorithms, and time complexity analysis. Strengthen your programming fundamentals.', 1, 1, 'approved', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 1717275622, 1717275622),

  -- Article 30
  ('art_01HQTG5BBRX3XY1JJVNN6CZ030', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC', 'DevOps Best Practices', 'devops-best-practices', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop', 'Streamline development and deployment processes.', 'DevOps combines development and operations to improve collaboration and delivery speed. This article covers CI/CD pipelines, infrastructure as code, monitoring, and automation tools. Learn how to implement DevOps practices in your projects.', 0, 1, 'pending', NULL, 1717276622, 1717276622);
