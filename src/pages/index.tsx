import TaskForm from '@/components/taskForm';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  name: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleAddTask = (name: string) => {
    const newTask: Task = {
      id: Date.now(),
      name,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>To-Do List</Heading>
      <TaskForm onSubmit={handleAddTask} />
      {tasks.length === 0 ? (
        <Text textAlign="center" fontWeight="bold" mt={4}>
          No tasks added yet.
        </Text>
      ) : (
        <VStack align="stretch" mt={4}>
          {tasks.map((task) => (
            <Box
              key={task.id}
              p={2}
              borderWidth={1}
              borderRadius={8}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>{task.name}</Text>
              <button onClick={() => handleDeleteTask(task.id)}>X</button>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
