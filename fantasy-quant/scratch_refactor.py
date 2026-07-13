import re

with open('src/components/dfs/DFSDashboard.tsx', 'r') as f:
    content = f.read()

# 1. State hooks
drag_state = """
  // Column Drag and Drop State
  const [draggedCol, setDraggedCol] = useState<ColumnId | null>(null);

  const handleDragStart = (e: React.DragEvent, id: ColumnId) => {
    setDraggedCol(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: ColumnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: ColumnId) => {
    e.preventDefault();
    if (!draggedCol || draggedCol === targetId) return;
    
    setVisibleCols(prev => {
      const newCols = [...prev];
      const fromIndex = newCols.indexOf(draggedCol);
      const toIndex = newCols.indexOf(targetId);
      newCols.splice(fromIndex, 1);
      newCols.splice(toIndex, 0, draggedCol);
      
      // Also update custom view immediately if standard
      // setCustomViews(cv => ({ ...cv, 'Standard': newCols }));
      return newCols;
    });
    setDraggedCol(null);
  };
"""

content = re.sub(r'(  const toggleExpand = \(id: string\) => \{)', drag_state + r'\n\1', content)

# 2. Header Map replacement
header_old = r'\{ALL_COLUMNS\.filter\(c => visibleCols\.includes\(c\.id\)\)\.map\(col => \([\s\S]*?\}\)\)\}'
header_new = r"""{visibleCols.map(colId => {
              const col = ALL_COLUMNS.find(c => c.id === colId);
              if (!col) return null;
              return (
                <div 
                  key={col.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, col.id)}
                  onDragOver={(e) => handleDragOver(e, col.id)}
                  onDrop={(e) => handleDrop(e, col.id)}
                  className={`col-span-1 flex items-center gap-1 cursor-move hover:text-white transition-colors ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : ''} ${draggedCol === col.id ? 'opacity-50' : ''}`}
                  onClick={() => sortToggle(col.id)}
                  title="Drag to reorder"
                >
                  {col.label} <SortIcon col={col.id} />
                </div>
              );
            })}"""
content = re.sub(header_old, header_new, content)

# 3. PlayerRow columns extraction and switch case generation
player_row_pattern = r"\{/\* Dynamic Columns \*/\}([\s\S]*?)        \{!\(isAlt \&\& !isExpanded\) \&\& \("
match = re.search(player_row_pattern, content)
if match:
    dynamic_cols_block = match.group(1)
    
    # We find all {visibleCols.includes('xxx') && ( ... )}
    col_pattern = r"\{visibleCols\.includes\('([^']+)'\)\s*&&\s*\(\s*(<div[\s\S]*?</div>)\s*\)\}"
    cols = re.findall(col_pattern, dynamic_cols_block)
    
    switch_body = "{visibleCols.map(colId => {\n          switch (colId) {\n"
    for col_id, html_content in cols:
        # Add key to the outermost div
        html_content = re.sub(r'^<div ', f'<div key={{colId}} ', html_content)
        switch_body += f"            case '{col_id}': return (\n              {html_content}\n            );\n"
    switch_body += "            default: return null;\n          }\n        })}\n"
    
    new_cols_block = "{/* Dynamic Columns */}\n        " + switch_body
    
    content = content.replace(match.group(0), new_cols_block + "        {!(isAlt && !isExpanded) && (")

with open('src/components/dfs/DFSDashboard.tsx', 'w') as f:
    f.write(content)

print("Refactor complete")
