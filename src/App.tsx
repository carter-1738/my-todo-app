import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiStar, FiCalendar } from 'react-icons/fi';

// ========== CSS Styles ========== //
const styles = `
:root {
  --primary: 249, 115, 22;  /* Orange-500 */
  --primary-dark: 194, 65, 12; /* Orange-700 */
  --bg-dark: 10, 10, 10;
  --text-light: 250, 250, 250;
  --text-dark: 23, 23, 23;
  
  --glass-bg: rgba(249, 115, 22, 0.15);
  --glass-border: rgba(249, 115, 22, 0.2);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.todo-app {
  min-height: 100vh;
  background: rgb(var(--bg-dark));
  color: rgb(var(--text-light));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.app-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, rgb(var(--primary)), rgb(var(--primary-dark)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  color: rgba(var(--text-light), 0.7);
  font-size: 1rem;
}

.input-card {
  width: 100%;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.input-card:hover {
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
}

.input-group {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
}

.text-input {
  flex: 1;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: rgb(var(--text-light));
  font-size: 1rem;
  transition: all 0.2s ease;
}

.text-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgb(var(--primary));
}

.add-btn {
  background: rgb(var(--primary));
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: rgb(var(--primary-dark));
  transform: translateY(-1px);
}

.input-row {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.date-input {
  flex: 1;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  border-radius: 0.75rem;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: rgb(var(--text-light));
  font-size: 1rem;
  position: relative;
}

.date-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgb(var(--primary));
}

.calendar-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(var(--text-light), 0.7);
}

.category-select {
  flex: 1;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: rgb(var(--text-light));
  font-size: 1rem;
  cursor: pointer;
}

.category-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgb(var(--primary));
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(var(--text-light), 0.8);
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: rgba(var(--primary), 0.2);
}

.filter-btn.active {
  background: rgb(var(--primary));
  color: white;
  font-weight: 500;
}

.todo-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todo-item {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.75rem;
  padding: 1.25rem;
  border-left: 4px solid rgb(var(--primary));
  transition: all 0.2s ease;
  animation: fadeIn 0.3s ease-out;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.todo-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.checkbox {
  min-width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(var(--text-light), 0.3);
  border-radius: 0.375rem;
  appearance: none;
  cursor: pointer;
  margin-top: 0.125rem;
  transition: all 0.2s ease;
}

.checkbox:checked {
  background: rgb(var(--primary));
  border-color: rgb(var(--primary));
  position: relative;
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.625rem;
  height: 0.625rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
  background-size: contain;
  transform: translate(-50%, -50%);
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  line-height: 1.5;
}

.todo-text.completed {
  text-decoration: line-through;
  color: rgba(var(--text-light), 0.5);
}

.todo-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: rgba(var(--text-light), 0.7);
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.star-btn {
  color: rgba(var(--text-light), 0.5);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.star-btn:hover {
  color: rgb(var(--primary));
}

.star-btn.starred {
  color: rgb(var(--primary));
}

.delete-btn {
  color: rgba(var(--text-light), 0.5);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  color: #ef4444;
}

.category-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.category-work {
  background: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
}

.category-personal {
  background: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
}

.category-urgent {
  background: rgba(239, 68, 68, 0.1);
  color: rgb(239, 68, 68);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: rgba(var(--text-light), 0.5);
}

.stats-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: rgba(var(--text-light), 0.7);
}

@media (max-width: 640px) {
  .todo-app {
    padding: 1.5rem;
  }
  
  .input-row {
    flex-direction: column;
  }
}
`;

// ========== Component ========== //
type Category = 'work' | 'personal' | 'urgent';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  category: Category;
  starred: boolean;
  createdAt: number;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState<Category>('personal');
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [isAnimating, setIsAnimating] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Auto-arrange todos by date
  const sortTodos = (todos: Todo[]) => {
    return [...todos].sort((a, b) => {
      // Starred items first
      if (a.starred !== b.starred) return b.starred ? 1 : -1;
      
      // Then incomplete items
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      
      // Then sort by due date (earliest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      
      // Items with dates before items without
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      
      // Finally sort by creation date (newest first)
      return b.createdAt - a.createdAt;
    });
  };

  const addTodo = () => {
    if (!input.trim()) return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: input,
      completed: false,
      dueDate: dueDate || undefined,
      category,
      starred: false,
      createdAt: Date.now(),
    };

    setIsAnimating(newTodo.id);
    setTodos([newTodo, ...todos]);
    setInput('');
    setDueDate('');
    
    setTimeout(() => setIsAnimating(''), 300);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const toggleStar = (id: string) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, starred: !t.starred } : t
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = sortTodos(
    todos.filter(t => activeFilter === 'all' || t.category === activeFilter)
  );

  const categoryCounts = {
    all: todos.length,
    work: todos.filter(t => t.category === 'work').length,
    personal: todos.filter(t => t.category === 'personal').length,
    urgent: todos.filter(t => t.category === 'urgent').length,
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="todo-app">
      <style>{styles}</style>
      
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">Task Horizon</h1>
          <p className="app-subtitle">Premium task management</p>
        </header>

        {/* Input Card */}
        <div className="input-card">
          <div className="input-group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              className="text-input"
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={addTodo}
              className="add-btn"
            >
              <FiPlus size={20} />
            </button>
          </div>

          <div className="input-row">
            <div className="relative w-full">
              <FiCalendar className="calendar-icon" size={18} />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="date-input"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="category-select"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-buttons">
          {(['all', 'work', 'personal', 'urgent'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${
                activeFilter === filter ? 'active' : ''
              }`}
            >
              {filter === 'all' ? 'All' : 
               filter === 'work' ? 'Work' : 
               filter === 'personal' ? 'Personal' : 'Urgent'}
              <span> ({categoryCounts[filter]})</span>
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div>
            {completedCount} of {todos.length} completed
          </div>
          <div>
            {todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length} overdue
          </div>
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="text-lg mb-1">No tasks found</div>
              <div className="text-sm">Add your first task above</div>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item ${
                  isAnimating === todo.id ? 'animate-pulse' : ''
                }`}
                style={{
                  borderLeftColor: 
                    todo.category === 'work' ? '#3b82f6' :
                    todo.category === 'personal' ? '#10b981' : 
                    '#ef4444'
                }}
              >
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="checkbox"
                  />
                  <div className="flex-1">
                    <div className={`todo-text ${
                      todo.completed ? 'completed' : ''
                    }`}>
                      {todo.text}
                    </div>
                    {todo.dueDate && (
                      <div className="todo-meta">
                        <FiCalendar size={14} />
                        <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                        {!todo.completed && new Date(todo.dueDate) < new Date() && (
                          <span className="text-red-400 ml-2">Overdue</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="todo-actions">
                    <span className={`category-tag ${
                      todo.category === 'work' ? 'category-work' :
                      todo.category === 'personal' ? 'category-personal' : 'category-urgent'
                    }`}>
                      {todo.category}
                    </span>
                    <button
                      onClick={() => toggleStar(todo.id)}
                      className={`star-btn ${todo.starred ? 'starred' : ''}`}
                    >
                      <FiStar size={18} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-btn"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}