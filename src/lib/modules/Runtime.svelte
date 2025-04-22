<script lang="ts">
  import '../styles/modules.css';
  import { moduleData } from '../stores/moduleData';
  import { generateXML } from '../utils/xmlGenerator';
  import { downloadFile } from '../utils/download';
  let { next, prev } = $props();

  // 硬件配置选项
  const hardwareOptions = [
    'CPU core',
    'Memory',
    'CPU frequency',
    'disk avail size',
    'CPU model'
  ];

  // 软件环境选项
  const environmentOptions = [
    'Operation System',
    'Java SE Development Kit',
    'Python',
    'MATLAB',
    'MicroSoft Visual C++ Redistributable',
    'MongoDB',
    'Microsoft SQL Server Database Engine',
    'Node.js',
    'Microsoft Visual C++ Runtime',
    'Apache Tomact',
  ];

  // 文件信息接口
  interface FileInfo {
    name: string;
    size: number;
    type: string;
    lastModified: number;
  }

  // 使用 store 中的数据
  let runtimeInfo = $derived($moduleData.runtime.info);

  let hardwareConfigures = $derived($moduleData.runtime.hardware || [
    { configures: hardwareOptions[0], min: '', max: '' }
  ]);

  let softwareConfigures = $derived($moduleData.runtime.software || [
    { environment: environmentOptions[0], platform: '', value: '' }
  ]);

  let assemblies = $derived($moduleData.runtime.assemblies || [
    { name: '', path: '' }
  ]);

  let supportiveResources = $derived($moduleData.runtime.resources || [
    { type: '', name: '' }
  ]);

  // 验证函数
  function validateForm(): boolean {
    // 所有字段都是可选的，直接返回 true
    return true;
  }

  // 文件上传处理
  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      if (file.size > 500 * 1024 * 1024) { // 500MB
        alert('File size should not exceed 500MB');
        input.value = '';
        return;
      }

      // 创建文件信息对象
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      };

      moduleData.update(store => ({
        ...store,
        runtime: {
          ...store.runtime,
          info: {
            ...store.runtime.info,
            entryFile: fileInfo
          }
        }
      }));
    }
  }

  // 添加行函数
  function addRow(table: string) {
    switch (table) {
      case 'hardware': {
        const newHardware = [...hardwareConfigures, { configures: hardwareOptions[0], min: '', max: '' }];
        moduleData.update(store => ({
          ...store,
          runtime: {
            ...store.runtime,
            hardware: newHardware
          }
        }));
        break;
      }
      case 'software': {
        const newSoftware = [...softwareConfigures, { environment: environmentOptions[0], platform: '', value: '' }];
        moduleData.update(store => ({
          ...store,
          runtime: {
            ...store.runtime,
            software: newSoftware
          }
        }));
        break;
      }
      case 'assemblies': {
        const newAssemblies = [...assemblies, { name: '', path: '' }];
        moduleData.update(store => ({
          ...store,
          runtime: {
            ...store.runtime,
            assemblies: newAssemblies
          }
        }));
        break;
      }
      case 'resources': {
        const newResources = [...supportiveResources, { type: '', name: '' }];
        moduleData.update(store => ({
          ...store,
          runtime: {
            ...store.runtime,
            resources: newResources
          }
        }));
        break;
      }
    }
  }

  // 删除行函数
  function removeRow(table: string, index: number) {
    switch (table) {
      case 'hardware': {
        const newHardware = hardwareConfigures.filter((_, i) => i !== index);
        moduleData.update(store => ({
          ...store,
          runtime: {
            ...store.runtime,
            hardware: newHardware
          }
        }));
        break;
      }
      case 'software': {
        const newSoftware = softwareConfigures.filter((_, i) => i !== index);
        moduleData.update(store => ({
          ...store,
          runtime: {
            ...store.runtime,
            software: newSoftware
          }
        }));
        break;
      }
      case 'assemblies': {
        const newAssemblies = assemblies.filter((_, i) => i !== index);
        moduleData.update(store => ({
          ...store,
          runtime: {
            ...store.runtime,
            assemblies: newAssemblies
          }
        }));
        break;
      }
      case 'resources': {
        const newResources = supportiveResources.filter((_, i) => i !== index);
        moduleData.update(store => ({
          ...store,
          runtime: {
            ...store.runtime,
            resources: newResources
          }
        }));
        break;
      }
    }
  }

  // 更新 store 中的数据
  $effect(() => {
    moduleData.update(store => ({
      ...store,
      runtime: {
        ...store.runtime,
        info: runtimeInfo,
        hardware: hardwareConfigures,
        software: softwareConfigures,
        assemblies: assemblies,
        resources: supportiveResources
      }
    }));
  });

  // 处理完成按钮点击
  async function handleComplete() {
    // 验证 BasicInfo
    const basicInfo = $moduleData.basicInfo;
    if (!basicInfo.name?.trim() || !basicInfo.style?.trim()) {
      alert('请在 Basic Info 中填写必填项（Name 和 Style）');
      return;
    }

    // 验证 Behavior
    const states = $moduleData.behavior.states;
    if (states.length === 0) {
      alert('请在 Behavior 中至少创建一个状态');
      return;
    }

    // 检查每个状态是否都有名称和至少一个事件
    for (const state of states) {
      if (!state.name?.trim()) {
        alert('Behavior 中的状态名称不能为空');
        return;
      }

      if (!state.events || state.events.length === 0) {
        alert('Behavior 中的每个状态至少需要一个事件');
        return;
      }

      // 检查每个事件是否都有名称
      for (const event of state.events) {
        if (!event.name?.trim()) {
          alert('Behavior 中的事件名称不能为空');
          return;
        }
      }
    }

    try {
      // 生成XML
      const xml = await generateXML($moduleData);
      
      // 获取模块名称作为文件名
      const fileName = $moduleData.basicInfo.name || 'model';
      
      // 下载文件
      downloadFile(xml, `${fileName}.mdl`, 'application/xml');
      
      // 调用next
      next("next");
    } catch (error) {
      console.error('Error generating XML:', error);
      alert('Failed to generate XML file. Please try again.');
    }
  }
</script>

<div class="module-container">
  <h3>Runtime</h3>
  
  <div class="form-content">
    <div class="form-group basic-info-group">
      <h4>Basic Information</h4>
      <div class="basic-info">
        <div class="input-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            bind:value={runtimeInfo.name}
          />
        </div>

        <div class="input-group">
          <label for="version">Version</label>
          <input 
            type="text" 
            id="version" 
            bind:value={runtimeInfo.version}
          />
        </div>

        <div class="input-group">
          <label for="baseDir">BaseDir</label>
          <input 
            type="text" 
            id="baseDir" 
            bind:value={runtimeInfo.baseDir}
          />
        </div>

        <div class="input-group">
          <label for="entry">Entry</label>
          <div class="file-input-container">
            <div class="file-input-wrapper">
              {#if runtimeInfo.entryFile}
                <div class="file-display">
                  <span>{runtimeInfo.entryFile.name}</span>
                  <button class="btn-remove" onclick={() => {
                    moduleData.update(store => ({
                      ...store,
                      runtime: {
                        ...store.runtime,
                        info: {
                          ...store.runtime.info,
                          entryFile: null
                        }
                      }
                    }));
                  }}>×</button>
                </div>
              {:else}
                <input 
                  type="file" 
                  id="entry" 
                  onchange={handleFileChange}
                  accept="*/*"
                />
              {/if}
            </div>
            <small>Max file size: 500MB</small>
          </div>
        </div>
      </div>
    </div>

    <div class="tables-section">
      <div class="form-group">
        <h4>Hardware Configures</h4>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Configures</th>
                <th>Min</th>
                <th>Max</th>
                <th class="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {#each hardwareConfigures as config, index}
                <tr>
                  <td>
                    <select 
                      bind:value={config.configures}
                    >
                      {#each hardwareOptions as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text" 
                      bind:value={config.min}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      bind:value={config.max}
                    />
                  </td>
                  <td class="action-column">
                    <button class="btn-remove" onclick={() => removeRow('hardware', index)}>×</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          <div class="btn-add-container">
            <button class="btn-add" onclick={() => addRow('hardware')}>Add Row</button>
          </div>
        </div>
      </div>

      <div class="form-group">
        <h4>Software Configures</h4>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Environment</th>
                <th>Platform</th>
                <th>Value</th>
                <th class="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {#each softwareConfigures as config, index}
                <tr>
                  <td>
                    <select 
                      bind:value={config.environment}
                    >
                      {#each environmentOptions as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  </td>
                  <td>
                    <input 
                      type="text" 
                      bind:value={config.platform}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      bind:value={config.value}
                    />
                  </td>
                  <td class="action-column">
                    <button class="btn-remove" onclick={() => removeRow('software', index)}>×</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          <div class="btn-add-container">
            <button class="btn-add" onclick={() => addRow('software')}>Add Row</button>
          </div>
        </div>
      </div>

      <div class="form-group">
        <h4>Assemblies</h4>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Path</th>
                <th class="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {#each assemblies as assembly, index}
                <tr>
                  <td>
                    <input 
                      type="text" 
                      bind:value={assembly.name}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      bind:value={assembly.path}
                    />
                  </td>
                  <td class="action-column">
                    <button class="btn-remove" onclick={() => removeRow('assemblies', index)}>×</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          <div class="btn-add-container">
            <button class="btn-add" onclick={() => addRow('assemblies')}>Add Row</button>
          </div>
        </div>
      </div>

      <div class="form-group">
        <h4>Supportive Resources</h4>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th class="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {#each supportiveResources as resource, index}
                <tr>
                  <td>
                    <input 
                      type="text" 
                      bind:value={resource.type}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      bind:value={resource.name}
                    />
                  </td>
                  <td class="action-column">
                    <button class="btn-remove" onclick={() => removeRow('resources', index)}>×</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          <div class="btn-add-container">
            <button class="btn-add" onclick={() => addRow('resources')}>Add Row</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="action-buttons">
    <button class="btn outline" onclick={() => prev("prev")}>返回上一步</button>
    <button class="btn primary" onclick={handleComplete}>完成</button>
  </div>
</div>

<style>
  .module-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .form-content {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    margin-bottom: 0;
    background: var(--card-bg, #ffffff);
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .form-group:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .basic-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .tables-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1rem;
  }

  .input-group {
    margin-bottom: 0;
  }

  .input-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-color);
    font-size: 0.95rem;
    letter-spacing: 0.3px;
  }

  .input-group input[type="text"] {
    width: 100%;
    padding: 0.6rem 0.8rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 0.95rem;
    background-color: var(--input-bg);
    color: var(--text-color);
    transition: all 0.2s ease;
  }

  .input-group input[type="file"] {
    width: 100%;
    padding: 0.3rem;
    border: 2px dashed var(--border-color);
    border-radius: 6px;
    font-size: 0.8rem;
    background-color: var(--input-bg);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .input-group small {
    display: block;
    color: var(--text-color);
    opacity: 0.7;
    font-size: 0.8rem;
  }

  h4 {
    margin-bottom: 1.25rem;
    font-size: 1.1rem;
    color: var(--text-color);
    font-weight: 600;
    letter-spacing: 0.3px;
    position: relative;
    padding-left: 1rem;
  }

  h4::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 18px;
    background: var(--primary-color);
    border-radius: 2px;
  }

  .table-container {
    overflow-x: auto;
    background: var(--card-bg);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
  }

  .table-container:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 1px var(--primary-color);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }

  th {
    background: var(--background-color);
    font-weight: 600;
    color: var(--text-color);
    letter-spacing: 0.3px;
  }

  .action-column {
    width: 80px;
    text-align: center;
  }

  td input[type="text"],
  td select {
    width: 100%;
    min-width: 120px;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: var(--input-bg);
    color: var(--text-color);
    transition: all 0.2s ease;
  }

  .btn-add-container {
    padding: 0.5rem;
    text-align: center;
    background: var(--card-bg);
    border-top: 1px solid var(--border-color);
  }

  .btn-add {
    padding: 0.6rem 1.2rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  .btn-remove {
    padding: 0.35rem 0.6rem;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.8;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }

  @media (max-width: 1024px) {
    .tables-section {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .form-group {
      padding: 1rem;
    }

    .basic-info {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .table-container {
      margin: 0;
      border-radius: 8px;
    }

    h4 {
      font-size: 1rem;
    }

    td input[type="text"],
    td select {
      min-width: 100px;
    }
  }

  .file-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .file-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .file-display {
    width: 100%;
    padding: 0.3rem;
    border: 2px dashed var(--border-color);
    border-radius: 6px;
    font-size: 0.8rem;
    background-color: var(--input-bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .file-display span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-display .btn-remove {
    padding: 0.15rem 0.3rem;
    font-size: 0.8rem;
    background: #ff4444;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .input-group input[type="file"] {
    width: 100%;
    padding: 0.3rem;
    border: 2px dashed var(--border-color);
    border-radius: 6px;
    font-size: 0.8rem;
    background-color: var(--input-bg);
    cursor: pointer;
  }

</style> 