import { useState } from 'react';

const tasks = [
  'Check emails and respond',
  'Review and merge pull requests',
  'Write or update documentation',
  'Fix bugs or address issues',
  'Attend team standup meeting',
  'Plan and prioritize tasks for the day',
  'Refactor code or improve performance'
];

const DailyGrowthChecklist = () => {
  const [completedTasks, setCompletedTasks] = useState(new Array(tasks.length).fill(false));

  const handleTaskToggle = (index) => {
    setCompletedTasks(prev => {
      const newCompletedTasks = [...prev];
      newCompletedTasks[index] = !newCompletedTasks[index];
      return newCompletedTasks;
    });
  };

  const allTasksCompleted = completedTasks.every(status => status);

  return (
    <div className="p-6 rounded-lg shadow-md">
      {allTasksCompleted ? (
        <div className="text-center text-3xl font-bold text-green-400">
          Well, that was your day  done well :&#41;
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-white">Daily Growth Checklist</h2>
          <ul className="space-y-2 text-base text-white">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center cursor-pointer"
                onClick={() => handleTaskToggle(index)}
              >
                <input
                  type="checkbox"
                  checked={completedTasks[index]}
                  onChange={() => handleTaskToggle(index)}
                  className="mr-5"
                />
                <span className={`flex-1 ${completedTasks[index] ? 'line-through font-medium text-green-400 text-xl' : 'font-medium text-xl'}`}>
                  {task}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DailyGrowthChecklist;
