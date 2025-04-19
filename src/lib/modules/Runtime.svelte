<script lang="ts">
  import '../styles/modules.css';
  let { next, prev } = $props();

  // 硬件配置选项
  const hardwareOptions = [
    'CPU',
    'Memory',
    'GPU',
    'Storage',
    'Network'
  ];

  // 软件环境选项
  const environmentOptions = [
    'Windows',
    'Linux',
    'MacOS',
    'Ubuntu',
    'CentOS',
    'Debian',
    'RedHat',
    'Android',
    'iOS',
    'Docker'
  ];

  // 基本信息
  let runtimeInfo = $state({
    name: '',
    version: '',
    baseDir: '',
    entryFile: null as File | null
  });

  // 表格数据
  let hardwareConfigures = $state([
    { configures: hardwareOptions[0], min: '', max: '' }
  ]);

  let softwareConfigures = $state([
    { environment: environmentOptions[0], platform: '', value: '' }
  ]);

  let assemblies = $state([
    { name: '', path: '' }
  ]);

  let supportiveResources = $state([
    { type: '', name: '' }
  ]);

  // 文件上传处理
  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      if (file.size > 500 * 1024 * 1024) { // 500MB
        alert('File size should not exceed 500MB');
        input.value = '';
        return;
      }
      runtimeInfo.entryFile = file;
    }
  }

  // 添加行函数
  function addRow(table: string) {
    switch (table) {
      case 'hardware':
        hardwareConfigures = [...hardwareConfigures, { configures: hardwareOptions[0], min: '', max: '' }];
        break;
      case 'software':
        softwareConfigures = [...softwareConfigures, { environment: environmentOptions[0], platform: '', value: '' }];
        break;
      case 'assemblies':
        assemblies = [...assemblies, { name: '', path: '' }];
        break;
      case 'resources':
        supportiveResources = [...supportiveResources, { type: '', name: '' }];
        break;
    }
  }

  // 删除行函数
  function removeRow(table: string, index: number) {
    switch (table) {
      case 'hardware':
        hardwareConfigures = hardwareConfigures.filter((_, i) => i !== index);
        break;
      case 'software':
        softwareConfigures = softwareConfigures.filter((_, i) => i !== index);
        break;
      case 'assemblies':
        assemblies = assemblies.filter((_, i) => i !== index);
        break;
      case 'resources':
        supportiveResources = supportiveResources.filter((_, i) => i !== index);
        break;
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
          <input type="text" id="name" bind:value={runtimeInfo.name} />
        </div>

        <div class="input-group">
          <label for="version">Version</label>
          <input type="text" id="version" bind:value={runtimeInfo.version} />
        </div>

        <div class="input-group">
          <label for="baseDir">BaseDir</label>
          <input type="text" id="baseDir" bind:value={runtimeInfo.baseDir} />
        </div>

        <div class="input-group">
          <label for="entry">Entry</label>
          <input 
            type="file" 
            id="entry" 
            onchange={handleFileChange}
            accept="*/*"
          />
          <small>Max file size: 500MB</small>
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
                    <select bind:value={config.configures}>
                      {#each hardwareOptions as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  </td>
                  <td><input type="text" bind:value={config.min} /></td>
                  <td><input type="text" bind:value={config.max} /></td>
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
                    <select bind:value={config.environment}>
                      {#each environmentOptions as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  </td>
                  <td><input type="text" bind:value={config.platform} /></td>
                  <td><input type="text" bind:value={config.value} /></td>
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
                  <td><input type="text" bind:value={assembly.name} /></td>
                  <td><input type="text" bind:value={assembly.path} /></td>
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
                  <td><input type="text" bind:value={resource.type} /></td>
                  <td><input type="text" bind:value={resource.name} /></td>
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
    <button class="btn primary" onclick={() => next("next")}>完成</button>
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
    gap: 2rem;
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

  .basic-info-group {
    margin-bottom: 1rem;
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
    padding: 0.75rem;
    border: 2px dashed var(--border-color);
    border-radius: 6px;
    font-size: 0.95rem;
    background-color: var(--input-bg);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .input-group small {
    display: block;
    color: var(--text-color);
    opacity: 0.7;
    font-size: 0.85rem;
    margin-top: 0.5rem;
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
    padding: 1rem;
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
</style> 