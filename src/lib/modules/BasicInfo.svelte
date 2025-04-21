<script lang="ts">
    import '../styles/modules.css';
    import { moduleData } from '../stores/moduleData';
    let { next } = $props();
  
    // 使用 store 中的数据
    let name = $derived($moduleData.basicInfo.name);
    let selectedStyle = $derived($moduleData.basicInfo.type);
    let treeData = $derived($moduleData.basicInfo.classification);
    
    const styles = [
      { value: 'SimpleCalculation', label: 'SimpleCalculation' },
      { value: 'TimeSeries', label: 'TimeSeries' },
      { value: 'StateSimulation', label: 'StateSimulation' }
    ];
  
    // 更新 store 中的数据
    $effect(() => {
      moduleData.update(store => ({
        ...store,
        basicInfo: {
          ...store.basicInfo,
          name,
          type: selectedStyle
        }
      }));
    });
    
    interface TreeNode {
      id: string;
      label: string;
      selected: boolean;
      expanded: boolean;
      children?: TreeNode[];
    }
  
    function toggleExpand(node: TreeNode) {
      const updatedTree = JSON.parse(JSON.stringify(treeData));
      const targetNode = findNode(updatedTree, node.id);
      if (targetNode) {
        targetNode.expanded = !targetNode.expanded;
        moduleData.update(store => ({
          ...store,
          basicInfo: {
            ...store.basicInfo,
            classification: updatedTree
          }
        }));
      }
    }
  
    function toggleSelect(node: TreeNode, event: Event) {
      event.stopPropagation();
      const updatedTree = JSON.parse(JSON.stringify(treeData));
      const targetNode = findNode(updatedTree, node.id);
      if (targetNode) {
        targetNode.selected = !targetNode.selected;
        updateChildrenSelection(targetNode, targetNode.selected);
        updateParentSelection(updatedTree, targetNode);
        moduleData.update(store => ({
          ...store,
          basicInfo: {
            ...store.basicInfo,
            classification: updatedTree
          }
        }));
      }
    }
  
    function findNode(nodes: TreeNode[], id: string): TreeNode | null {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
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
  
    function updateTreeData() {
      moduleData.update(store => ({
        ...store,
        basicInfo: {
          ...store.basicInfo,
          classification: treeData
        }
      }));
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