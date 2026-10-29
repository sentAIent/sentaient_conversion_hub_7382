import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const COLUMNS = ['To Do', 'In Progress', 'Under Review', 'Done'];

export default function KanbanBoard({ tasks, setTasks }) {
  const { role } = useAuth();
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    const task = tasks.find(t => t.id === draggedTaskId);
    if (!task) return;

    // Role-based gating
    if (task.required_role && role !== task.required_role && role !== 'admin') {
      alert(`You need ${task.required_role} role to move this task.`);
      setDraggedTaskId(null);
      return;
    }

    if (task.status === targetStatus) {
      setDraggedTaskId(null);
      return;
    }

    // Optimistic UI update
    const updatedTasks = tasks.map(t => 
      t.id === draggedTaskId ? { ...t, status: targetStatus } : t
    );
    setTasks(updatedTasks);

    // Update in Supabase
    const { error } = await supabase
      .from('compliance_tasks')
      .update({ status: targetStatus, updated_at: new Date().toISOString() })
      .eq('id', draggedTaskId);

    if (error) {
      console.error("Failed to update task status:", error);
      // Revert if error
      setTasks(tasks);
      alert("Failed to save changes to server.");
    }
    
    setDraggedTaskId(null);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', height: '100%', minHeight: '600px' }}>
      {COLUMNS.map(column => (
        <div 
          key={column}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column)}
          style={{
            flex: '0 0 300px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '12px',
            padding: '1rem',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>{column}</h3>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
              {tasks.filter(t => t.status === column).length}
            </span>
          </div>

          {tasks.filter(t => t.status === column).map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              style={{
                background: 'rgba(25, 25, 35, 0.8)',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'grab',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                position: 'relative'
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{task.title}</h4>
              <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {task.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                <span style={{ 
                  background: task.jurisdiction === 'Federal' ? 'rgba(255, 100, 100, 0.2)' : 
                              task.jurisdiction === 'International' ? 'rgba(100, 200, 255, 0.2)' : 'rgba(100, 255, 100, 0.2)',
                  color: task.jurisdiction === 'Federal' ? '#ff8888' : 
                         task.jurisdiction === 'International' ? '#88ccff' : '#88ff88',
                  padding: '2px 6px', 
                  borderRadius: '4px' 
                }}>
                  {task.jurisdiction}
                </span>
                
                {task.required_role && (
                  <span style={{ color: 'var(--text-muted)' }}>
                    Role: <span style={{ color: 'white' }}>{task.required_role}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
