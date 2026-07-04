export type TaskStatus = 'Design' | 'Queue/Processing' | 'Scheduled' | 'Completed';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  brandId: string;
  platforms: string[];
  assignees?: string[];
  startDate?: string;
  dueDate?: string;
  order: number;
};
