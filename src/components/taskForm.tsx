import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';

type subData = {
  onSubmit: (data: string) => void
}

interface Task {
  id: number;
  name: string;
}

const TaskForm = ({ onSubmit }: subData) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string) => {
    const newTask: Task = {
      id: Date.now(),
      name,
    };
    setTasks([...tasks, newTask]);
  };

  const handleFormSubmit = (data: FieldValues) => {
    addTask(data.task);
    onSubmit(data.task);
    console.log(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={4}>
          <FormControl id="task" isInvalid={!!errors.task}>
            <FormLabel>Task</FormLabel>
            <Input type="text" {...register("task", { required: true })} />
            <FormErrorMessage textAlign='center'>
              {errors.task && "Task is required"}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit">Add Task</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TaskForm;
