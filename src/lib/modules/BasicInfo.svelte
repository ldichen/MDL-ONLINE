<script lang="ts">
    import '../styles/modules.css';
    let { next } = $props();
  
    let name = $state('');
    let selectedStyle = $state('SimpleCalculation');
    
    const styles = [
      { value: 'SimpleCalculation', label: 'SimpleCalculation' },
      { value: 'TimeSeries', label: 'TimeSeries' },
      { value: 'StateSimulation', label: 'StateSimulation' }
    ];
  
    interface TreeNode {
      id: string;
      label: string;
      selected: boolean;
      expanded: boolean;
      children?: TreeNode[];
    }
  
    let treeData = $state([
      {
        id: '1',
        label: 'Earth System Classification',
        selected: false,
        expanded: true,
        children: [
          {
            id: '1-1',
            label: 'Water System Models',
            selected: false,
            expanded: false,
            children: [
              { id: '1-1-1', label: 'Water System Synthetic Models', selected: false, expanded: false },
              { id: '1-1-2', label: 'Atmosphere Water System Models', selected: false, expanded: false },
              { id: '1-1-3', label: 'Ocean Water System Models', selected: false, expanded: false },
              { id: '1-1-4', label: 'Surface Water System Models', selected: false, expanded: false },
              { id: '1-1-5', label: 'Undergroud Water System Models', selected: false, expanded: false },
              { id: '1-1-6', label: 'Ice-Snow Water System Models', selected: false, expanded: false }
            ]
          },
          {
            id: '1-2',
            label: 'Solid System Models',
            selected: false,
            expanded: false,
            children: [
              { id: '1-2-1', label: 'Soil Synthetic Models', selected: false, expanded: false },
              { id: '1-2-2', label: 'Soil System Physical Models', selected: false, expanded: false },
              { id: '1-2-3', label: 'Soil System Chemical Models', selected: false, expanded: false },
              { id: '1-2-4', label: 'Soil System Ecological Models', selected: false, expanded: false },
              { id: '1-2-5', label: 'Soil System Statistical Models', selected: false, expanded: false }
            ]
          },
          {
            id: '1-3',
            label: 'Atmosphere System Models',
            selected: false,
            expanded: false,
            children: [
              { id: '1-3-1', label: 'Atmosphere Models', selected: false, expanded: false },
              { id: '1-3-2', label: 'Atmosphere System Physical Models', selected: false, expanded: false },
              { id: '1-3-3', label: 'Atmosphere System Chemical Models', selected: false, expanded: false },
              { id: '1-3-4', label: 'Atmosphere System Ecological Models', selected: false, expanded: false },
              { id: '1-3-5', label: 'Atmosphere System Statistical Models', selected: false, expanded: false }
            ]
          },
          {
            id: '1-4',
            label: 'Ecology System Models',
            selected: false,
            expanded: false,
            children: [
              { id: '1-4-1', label: 'Ecology System Synthetic Models', selected: false, expanded: false },
              { id: '1-4-2', label: 'Forest Ecology System Models', selected: false, expanded: false },
              { id: '1-4-3', label: 'Agriculture Ecology System Models', selected: false, expanded: false },
              { id: '1-4-4', label: 'Grassland Ecology System Models', selected: false, expanded: false },
              { id: '1-4-5', label: 'Wetland Ecology System Models', selected: false, expanded: false },
              { id: '1-4-6', label: 'Freshwater Ecology System Models', selected: false, expanded: false },
              { id: '1-4-7', label: 'Seawater Ecology System Models', selected: false, expanded: false },
              { id: '1-4-8', label: 'City Ecology System Models', selected: false, expanded: false }
            ]
          },
          {
            id: '1-5',
            label: 'Human/Society/Economy System Models',
            selected: false,
            expanded: false,
            children: [
              { id: '1-5-1', label: 'Human/Society/Economy System Synthetic Models', selected: false, expanded: false },
              { id: '1-5-2', label: 'Human/Society/Economy Physical Models', selected: false, expanded: false },
              { id: '1-5-3', label: 'Human/Society/Economy Chemical Models', selected: false, expanded: false },
              { id: '1-5-4', label: 'Human/Society/Economy Ecological Models', selected: false, expanded: false },
              { id: '1-5-5', label: 'Human/Society/Economy Statistical Models', selected: false, expanded: false }
            ]
          },
          {
            id: '1-6',
            label: 'Global Models',
            selected: false,
            expanded: false,
            children: [
              { id: '1-6-1', label: 'Atomosphere System Models', selected: false, expanded: false },
              { id: '1-6-2', label: 'Land Surface Models', selected: false, expanded: false },
              { id: '1-6-3', label: 'Ocean Models', selected: false, expanded: false },
              { id: '1-6-4', label: 'Ice-Snow Models', selected: false, expanded: false },
              { id: '1-6-5', label: 'Soild Earth Models', selected: false, expanded: false }
            ]
          },
          {
            id: '1-7',
            label: 'GIS Analysis Models',
            selected: false,
            expanded: false,
            children: [
              { id: '1-7-1', label: 'Data Management Models', selected: false, expanded: false },
              { id: '1-7-2', label: 'Geostatistical Analysis Models', selected: false, expanded: false },
              { id: '1-7-3', label: 'Spatial Analysis Models', selected: false, expanded: false },
              { id: '1-7-4', label: '3D Analysis Models', selected: false, expanded: false },
            ]
          }
        ]
      }
    ]);
  
    function toggleExpand(node: TreeNode) {
      node.expanded = !node.expanded;
    }
  
    function toggleSelect(node: TreeNode, event: Event) {
      event.stopPropagation();
      node.selected = !node.selected;
      updateChildrenSelection(node, node.selected);
      updateParentSelection(treeData, node);
    }
  
    function updateChildrenSelection(node: TreeNode, selected: boolean) {
      node.selected = selected;
      if (node.children) {
        node.children.forEach(child => updateChildrenSelection(child, selected));
      }
    }
  
    function updateParentSelection(nodes: TreeNode[], targetNode: TreeNode): boolean {
      for (const node of nodes) {
        if (node.children) {
          if (node.children.some(child => child === targetNode) || 
              updateParentSelection(node.children, targetNode)) {
            node.selected = node.children.every(child => child.selected);
            return true;
          }
        }
      }
      return false;
    }
  </script>
  
  <div class="module-container">
    <h3>Basic Info</h3>
    
    <div class="form-content">
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          type="text" 
          id="name" 
          bind:value={name} 
          placeholder="请输入名称"
          required
        />
      </div>
  
      <div class="form-group">
        <label for="style">Style</label>
        <select id="style" bind:value={selectedStyle}>
          {#each styles as style}
            <option value={style.value}>{style.label}</option>
          {/each}
        </select>
      </div>
  
      <div class="form-group">
        <label for="tree-select">Tree Select</label>
        <div id="tree-select" class="tree-container" role="group" aria-label="Tree Select">
          {#each treeData as node}
            <div class="tree-node">
              <div 
                class="node-content" 
                role="button"
                tabindex="0"
                onclick={() => toggleExpand(node)}
                onkeydown={(e) => e.key === 'Enter' && toggleExpand(node)}
              >
                {#if node.children && node.children.length > 0}
                  <span class="expand-icon">{node.expanded ? '▼' : '▶'}</span>
                {:else}
                  <span class="expand-icon-placeholder"></span>
                {/if}
                <label class="node-label">
                  <input
                    type="checkbox"
                    id={`tree-${node.id}`}
                    checked={node.selected}
                    onclick={(e) => toggleSelect(node, e)}
                  />
                  <span>{node.label}</span>
                </label>
              </div>
              {#if node.children && node.children.length > 0 && node.expanded}
                <div class="node-children">
                  {#each node.children as childNode}
                    <div class="tree-node">
                      <div 
                        class="node-content" 
                        role="button"
                        tabindex="0"
                        onclick={() => toggleExpand(childNode)}
                        onkeydown={(e) => e.key === 'Enter' && toggleExpand(childNode)}
                      >
                        {#if childNode.children && childNode.children.length > 0}
                          <span class="expand-icon">{childNode.expanded ? '▼' : '▶'}</span>
                        {:else}
                          <span class="expand-icon-placeholder"></span>
                        {/if}
                        <label class="node-label">
                          <input
                            type="checkbox"
                            id={`tree-${childNode.id}`}
                            checked={childNode.selected}
                            onclick={(e) => toggleSelect(childNode, e)}
                          />
                          <span>{childNode.label}</span>
                        </label>
                      </div>
                      {#if childNode.children && childNode.children.length > 0 && childNode.expanded}
                        <div class="node-children">
                          {#each childNode.children as grandChild}
                            <div class="tree-node">
                              <div class="node-content">
                                <span class="expand-icon-placeholder"></span>
                                <label class="node-label">
                                  <input
                                    type="checkbox"
                                    id={`tree-${grandChild.id}`}
                                    checked={grandChild.selected}
                                    onclick={(e) => toggleSelect(grandChild, e)}
                                  />
                                  <span>{grandChild.label}</span>
                                </label>
                              </div>
                            </div>
                          {/each}
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  
    <div class="action-buttons">
      <button class="btn primary" onclick={() => next("next")}>确认，下一步</button>
    </div>
  </div>
  
  <style>
    .form-group {
      margin-bottom: 1rem;
      background: var(--card-bg, #ffffff);
      padding: 0.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
  
    .form-group:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  
    .form-group label {
      display: block;
      margin-bottom: 0.75rem;
      font-weight: 600;
      color: var(--text-color);
      text-align: start;
      font-size: 1.1rem;
    }
  
    input[type="text"],
    select {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 6px;
      font-size: 1rem;
      background-color: var(--input-bg);
      color: var(--text-color);
      transition: all 0.3s ease;
    }
  
    input[type="text"]:hover,
    select:hover {
      border-color: var(--primary-color);
    }
  
    input[type="text"]:focus,
    select:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
    }
  
    .tree-container {
      border: 2px solid var(--border-color);
      border-radius: 8px;
      padding: 1.5rem;
      max-height: 500px;
      overflow-y: auto;
      background: var(--card-bg);
      scrollbar-width: thin;
      scrollbar-color: var(--primary-color) transparent;
    }
  
    .tree-container::-webkit-scrollbar {
      width: 6px;
    }
  
    .tree-container::-webkit-scrollbar-track {
      background: transparent;
    }
  
    .tree-container::-webkit-scrollbar-thumb {
      background-color: var(--primary-color);
      border-radius: 3px;
    }
  
    .node-content {
      display: flex;
      align-items: center;
      padding: 0.2rem;
      cursor: pointer;
      user-select: none;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
  
    .node-content:hover {
      background-color: var(--hover-bg);
    }
  
    .expand-icon,
    .expand-icon-placeholder {
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      color: var(--primary-color);
      transition: transform 0.2s ease;
    }
  
    .expand-icon {
      cursor: pointer;
    }
  
    .node-content:hover .expand-icon {
      transform: scale(1.2);
    }
  
    label.node-label {
      display: flex !important;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0 !important;
      cursor: pointer;
      height: 100%;
      font-weight: normal !important;
      font-size: 1rem !important;
    }
  
    .node-label input[type="checkbox"] {
      margin: 0;
      width: 1.125rem;
      height: 1.125rem;
      border: 2px solid var(--border-color);
      border-radius: 4px;
      transition: all 0.2s ease;
      cursor: pointer;
      position: relative;
    }
  
    .node-label input[type="checkbox"]:checked {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }
  
    .node-label > span {
      display: inline-block;
      vertical-align: middle;
      transition: color 0.2s ease;
    }
  
    .node-children {
      margin-left: 1.25rem;
      border-left: 2px dashed var(--border-color);
      padding-left: 1rem;
    }
  
    @media (max-width: 768px) {
      .form-group {
        padding: 1rem;
      }
  
      .tree-container {
        padding: 1rem;
        max-height: 400px;
      }
  
      .node-children {
        margin-left: 0.75rem;
        padding-left: 0.75rem;
      }
    }
  </style>