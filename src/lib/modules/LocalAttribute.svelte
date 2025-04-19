<script lang="ts">
  import '../styles/modules.css';
  let { next, prev } = $props();

  // 语言选项
  const languageOptions = [
    'English',
    'Chinese',
    'Spanish',
    'French',
    'German',
    'Japanese',
    'Korean'
  ];

  // Mechanism Type选项
  const mechanismTypes = [
    'Input',
    'Output',
    'Parameter'
  ];

  // Spatiotemporal Scale选项
  const spatiotemporalScales = [
    'Global',
    'Regional',
    'Local',
    'Point'
  ];

  // 标签页数据结构
  interface TabData {
    id: number;
    language: string;
    localName: string;
    wiki: string;
    keywords: string;
    abstract: string;
    mechanism: {
      type: string;
      name: string;
      value: string;
    }[];
    application: {
      spatiotemporalScale: string;
      stepLength: {
        dimension: string;
        min: string;
        max: string;
        unit: string;
      }[];
      scope: {
        regionName: string;
        xMin: string;
        xMax: string;
        yMin: string;
        yMax: string;
        spatialRef: string;
      };
    };
  }

  // 初始化标签页数据
  let tabs = $state<TabData[]>([
    {
      id: 1,
      language: languageOptions[0],
      localName: '',
      wiki: '',
      keywords: '',
      abstract: '',
      mechanism: [],
      application: {
        spatiotemporalScale: spatiotemporalScales[0],
        stepLength: [
          { dimension: 'X', min: '', max: '', unit: '' },
          { dimension: 'Y', min: '', max: '', unit: '' },
          { dimension: 'Z', min: '', max: '', unit: '' },
          { dimension: 'T', min: '', max: '', unit: '' }
        ],
        scope: {
          regionName: '',
          xMin: '',
          xMax: '',
          yMin: '',
          yMax: '',
          spatialRef: ''
        }
      }
    }
  ]);

  let activeTabId = $state(1);
  let activeTab = $derived(tabs.find(t => t.id === activeTabId));

  // 添加新标签页
  function addTab() {
    const newId = tabs.length > 0 ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    tabs = [...tabs, {
      id: newId,
      language: languageOptions[0],
      localName: '',
      wiki: '',
      keywords: '',
      abstract: '',
      mechanism: [],
      application: {
        spatiotemporalScale: spatiotemporalScales[0],
        stepLength: [
          { dimension: 'X', min: '', max: '', unit: '' },
          { dimension: 'Y', min: '', max: '', unit: '' },
          { dimension: 'Z', min: '', max: '', unit: '' },
          { dimension: 'T', min: '', max: '', unit: '' }
        ],
        scope: {
          regionName: '',
          xMin: '',
          xMax: '',
          yMin: '',
          yMax: '',
          spatialRef: ''
        }
      }
    }];
    activeTabId = newId;
  }

  // 删除标签页
  function removeTab(id: number) {
    if (tabs.length <= 1) return; // 保持至少一个标签页
    tabs = tabs.filter(t => t.id !== id);
    if (activeTabId === id) {
      activeTabId = tabs[0].id;
    }
  }

  // 添加机制行
  function addMechanismRow(tabId: number) {
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) return;
    
    tabs[tabIndex].mechanism = [
      ...tabs[tabIndex].mechanism,
      { type: mechanismTypes[0], name: '', value: '' }
    ];
  }

  // 删除机制行
  function removeMechanismRow(tabId: number, index: number) {
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) return;
    
    tabs[tabIndex].mechanism = tabs[tabIndex].mechanism.filter((_, i) => i !== index);
  }
</script>

<div class="module-container">
  <h3>Local Attributes</h3>
  
  <div class="form-content">
    <div class="tabs">
      <div class="tab-headers">
        {#each tabs as tab}
          <button 
            class="tab-header {activeTabId === tab.id ? 'active' : ''}"
            onclick={() => activeTabId = tab.id}
          >
            Tab {tab.id}
            {#if tabs.length > 1}
              <span 
                class="remove-tab" 
                onclick={(e) => { e.stopPropagation(); removeTab(tab.id); }}
                onkeydown={(e) => e.key === 'Enter' && removeTab(tab.id)}
                role="button"
                tabindex="0"
              >×</span>
            {/if}
          </button>
        {/each}
        <button class="add-tab" onclick={addTab}>+</button>
      </div>

      {#if activeTab}
        <div class="tab-content">
          <div class="form-group">
            <div class="form-row">
              <div class="form-col">
                <div class="input-group">
                  <label for="language">Language</label>
                  <select id="language" bind:value={activeTab.language}>
                    {#each languageOptions as option}
                      <option value={option}>{option}</option>
                    {/each}
                  </select>
                </div>

                <div class="input-group">
                  <label for="localName">Local Name</label>
                  <input type="text" id="localName" bind:value={activeTab.localName} />
                </div>

                <div class="input-group">
                  <label for="wiki">Wiki</label>
                  <input type="text" id="wiki" bind:value={activeTab.wiki} />
                </div>

                <div class="input-group">
                  <label for="keywords">Keywords</label>
                  <input type="text" id="keywords" bind:value={activeTab.keywords} />
                </div>
              </div>

              <div class="form-col">
                <div class="input-group">
                  <label for="abstract">Abstract</label>
                  <textarea id="abstract" bind:value={activeTab.abstract} rows="12"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="mechanism">Mechanism</label>
            <div class="table-container">
              <table class="mechanism-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {#each activeTab.mechanism as row, index}
                    <tr>
                      <td>
                        <select bind:value={row.type}>
                          {#each mechanismTypes as type}
                            <option value={type}>{type}</option>
                          {/each}
                        </select>
                      </td>
                      <td><input type="text" bind:value={row.name} /></td>
                      <td><input type="text" bind:value={row.value} /></td>
                      <td>
                        <button class="btn-remove" onclick={() => removeMechanismRow(activeTab.id, index)}>×</button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <button class="btn-add" onclick={() => addMechanismRow(activeTab.id)}>Add Row</button>
            </div>
          </div>

          <div class="form-group">
            <h4>Application</h4>
            <div class="sub-form">
              <div class="form-group">
                <label for="spatiotemporalScale">Spatiotemporal Scale</label>
                <select id="spatiotemporalScale" bind:value={activeTab.application.spatiotemporalScale}>
                  {#each spatiotemporalScales as scale}
                    <option value={scale}>{scale}</option>
                  {/each}
                </select>
              </div>

              <div class="form-group">
                <label for="stepLength">Spatiotemporal Step Length</label>
                <div class="table-container">
                  <table class="step-length-table">
                    <thead>
                      <tr>
                        <th>Dimension</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each activeTab.application.stepLength as row}
                        <tr>
                          <td>{row.dimension}</td>
                          <td><input type="text" bind:value={row.min} /></td>
                          <td><input type="text" bind:value={row.max} /></td>
                          <td><input type="text" bind:value={row.unit} /></td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="form-group">
                <label for="scope">Scope</label>
                <div class="table-container">
                  <table class="scope-table">
                    <thead>
                      <tr>
                        <th>Region Name</th>
                        <th>xMin</th>
                        <th>xMax</th>
                        <th>yMin</th>
                        <th>yMax</th>
                        <th>Spatial Ref</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" bind:value={activeTab.application.scope.regionName} /></td>
                        <td><input type="text" bind:value={activeTab.application.scope.xMin} /></td>
                        <td><input type="text" bind:value={activeTab.application.scope.xMax} /></td>
                        <td><input type="text" bind:value={activeTab.application.scope.yMin} /></td>
                        <td><input type="text" bind:value={activeTab.application.scope.yMax} /></td>
                        <td><input type="text" bind:value={activeTab.application.scope.spatialRef} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="action-buttons">
    <button class="btn outline" onclick={() => prev("prev")}>返回上一步</button>
    <button class="btn primary" onclick={() => next("next")}>确认，下一步</button>
  </div>
</div>

<style>
  .tabs {
    background: var(--card-bg);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .tab-headers {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--background-color);
    border-bottom: 2px solid var(--border-color);
  }

  .tab-header {
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
    transition: all 0.2s ease;
  }

  .tab-header.active {
    background: var(--primary-color);
    color: white;
  }

  .tab-header:hover:not(.active) {
    background: var(--hover-bg);
  }

  .add-tab {
    padding: 0.5rem 1rem;
    border: 1px dashed var(--border-color);
    background: none;
    cursor: pointer;
    border-radius: 4px;
    color: var(--text-color);
    transition: all 0.2s ease;
  }

  .add-tab:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  .remove-tab {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .remove-tab:hover {
    background: #ff4444;
    color: white;
  }

  .tab-content {
    padding: 1rem;
  }

  .form-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .form-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-group {
    margin-bottom: 1rem;
    background: var(--card-bg, #ffffff);
    padding: 1rem;
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
    margin-bottom: 0.4rem;
    font-weight: 600;
    color: var(--text-color);
    text-align: start;
    font-size: 0.9rem;
  }

  input[type="text"],
  select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.9rem;
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

  textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: var(--input-bg);
    color: var(--text-color);
    resize: vertical;
    height: 100%;
    min-height: 100%;
    transition: all 0.3s ease;
  }

  textarea:hover {
    border-color: var(--primary-color);
  }

  textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
  }

  .table-container {
    overflow-x: auto;
    margin-top: 1rem;
    background: var(--card-bg);
    border-radius: 6px;
    border: 2px solid var(--border-color);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    background: var(--background-color);
    font-weight: 600;
  }

  td input[type="text"],
  td select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .btn-add {
    margin: 1rem;
    padding: 0.5rem 1rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-add:hover {
    opacity: 0.9;
  }

  .btn-remove {
    padding: 0.25rem 0.5rem;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-remove:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
      gap: 1rem;
    }

    .tab-content {
      padding: 0.5rem;
    }

    .table-container {
      margin: 0 -1rem;
      border-radius: 0;
    }
  }

  .input-group {
    margin-bottom: 0.75rem;
  }

  .input-group:last-child {
    margin-bottom: 0;
  }

  .input-group label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 600;
    color: var(--text-color);
    text-align: start;
    font-size: 0.9rem;
  }
  h4 {
    color: var(--text-color);
    margin-bottom: 0rem;
    text-align: start;
  } 
</style> 