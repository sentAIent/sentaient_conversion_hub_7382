'use client';
import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types/task';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useWorkspace } from '../providers/WorkspaceProvider';

const COLUMNS: TaskStatus[] = ['Design', 'Queue/Processing', 'Scheduled', 'Completed'];

export function KanbanBoard() {
  const { activeWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Sync with Firestore
  useEffect(() => {
    if (!activeWorkspace) return;
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const fetchedTasks: Task[] = [];
      snapshot.forEach(doc => {
        fetchedTasks.push({ id: doc.id, ...doc.data() } as Task);
      });
      // Filter by active workspace
      const workspaceTasks = fetchedTasks.filter(t => t.brandId === activeWorkspace);
      // Sort by order
      workspaceTasks.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      // Fallback mock data if none exists
      if (workspaceTasks.length === 0) {
        setTasks([
          { id: '1', title: 'Design Summer Promo Header', status: 'Design', brandId: activeWorkspace, platforms: ['twitter', 'instagram'], order: 1 },
          { id: '2', title: 'Edit Video Hook Variations', status: 'Queue/Processing', brandId: activeWorkspace, platforms: ['youtube'], order: 2 },
          { id: '3', title: 'Schedule B2B LinkedIn Post', status: 'Scheduled', brandId: activeWorkspace, platforms: ['linkedin'], order: 3 },
        ]);
      } else {
        setTasks(workspaceTasks);
      }
    });
    return () => unsubscribe();
  }, [activeWorkspace]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(tasks.find(t => t.id === active.id) || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      setTasks(prev => {
        const activeIndex = prev.findIndex(t => t.id === activeId);
        const overIndex = prev.findIndex(t => t.id === overId);
        
        if (prev[activeIndex].status !== prev[overIndex].status) {
          // Cross-column movement
          const newTasks = [...prev];
          newTasks[activeIndex].status = newTasks[overIndex].status;
          return arrayMove(newTasks, activeIndex, overIndex);
        }
        
        // Same-column movement
        return arrayMove(prev, activeIndex, overIndex);
      });
    }

    // Dropping a task over an empty column
    if (isActiveTask && isOverColumn) {
      setTasks(prev => {
        const activeIndex = prev.findIndex(t => t.id === activeId);
        const newTasks = [...prev];
        newTasks[activeIndex].status = overId as TaskStatus;
        return arrayMove(newTasks, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    // Here we would typically persist the new order to Firestore
    // For now we assume local state handles it instantly for UI responsiveness
    const activeTask = tasks.find(t => t.id === active.id);
    if (activeTask && activeTask.id && activeTask.id.length > 5) {
      // It's a real firestore doc
      try {
        await updateDoc(doc(db, 'tasks', activeTask.id), {
          status: activeTask.status
        });
      } catch (err) {
        console.error('Failed to update task status in DB', err);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 h-full">
        {COLUMNS.map(col => (
          <KanbanColumn
            key={col}
            id={col}
            title={col}
            tasks={tasks.filter(t => t.status === col)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <KanbanCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
