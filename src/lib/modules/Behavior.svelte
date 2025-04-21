<script lang="ts">
  import '../styles/modules.css';
  import { moduleData } from '../stores/moduleData';
  let { next, prev } = $props();
  // 当前激活的主标签页
  let activeTab = $state('States');

  interface State {
    id: string;
    name: string;
    type: string;
    description: string;
    transitions: string[];
    events: {
      name: string;
      type: string;
      optional: string;
      description: string;
      dataset?: {
        name: string;
        type: string;
        description: string;
        schema: string;
      };
    }[];
  }

  // 使用 store 中的数据
  let states = $derived($moduleData.behavior.states);
  let currentStateIndex = $state(0);
  let currentEventIndex = $state(0);

  // Parameters 相关状态
  let processParameters = $state([
    { key: '', description: '', defaultValue: '' }
  ]);

  let controlParameters = $state([
    { key: '', description: '', defaultValue: '' }
  ]);

  // 事件类型和可选项选项
  const eventTypes = ['response(input)', 'noresponse(output)'];
  const optionalOptions = ['False', 'True'];

  // 状态类型选项
  const stateTypes = ['basic'];

  // 数据集类型选项
  const datasetTypes = ['internal', 'external'];

  // 对话框状态
  let showDatasetDialog = $state(false);
  let currentDataset = $state({
    name: '',
    type: datasetTypes[0],
    description: '',
    schema: ''
  });

  // 添加新状态
  function addState() {
    const newStateNumber = states.length + 1;
    const newStates = [...states, {
      id: crypto.randomUUID(),
      name: `state${newStateNumber}`,
      type: stateTypes[0],
      description: '',
      transitions: [],
      events: [{ name: 'Event1', type: eventTypes[0], optional: optionalOptions[0], description: '' }]
    }];
    moduleData.update(store => ({
      ...store,
      behavior: {
        ...store.behavior,
        states: newStates
      }
    }));
    currentStateIndex = newStates.length - 1;
  }

  // 删除状态
  function removeState(index: number) {
    const newStates = states.filter((_, i) => i !== index);
    moduleData.update(store => ({
      ...store,
      behavior: {
        ...store.behavior,
        states: newStates
      }
    }));
    if (currentStateIndex >= newStates.length) {
      currentStateIndex = Math.max(0, newStates.length - 1);
    }
  }

  // 添加事件
  function addEvent(stateIndex: number) {
    const newEventNumber = states[stateIndex].events.length + 1;
    const newStates = [...states];
    newStates[stateIndex].events = [...newStates[stateIndex].events, {
      name: `Event${newEventNumber}`,
      type: eventTypes[0],
      optional: optionalOptions[0],
      description: ''
    }];
    moduleData.update(store => ({
      ...store,
      behavior: {
        ...store.behavior,
        states: newStates
      }
    }));
  }

  // 删除事件
  function removeEvent(stateIndex: number, eventIndex: number) {
    const newStates = [...states];
    newStates[stateIndex].events = newStates[stateIndex].events.filter((_, i) => i !== eventIndex);
    moduleData.update(store => ({
      ...store,
      behavior: {
        ...store.behavior,
        states: newStates
      }
    }));
  }

  // 添加参数行
  function addParameter(type: 'process' | 'control') {
    if (type === 'process') {
      processParameters = [...processParameters, { key: '', description: '', defaultValue: '' }];
    } else {
      controlParameters = [...controlParameters, { key: '', description: '', defaultValue: '' }];
    }
  }

  // 删除参数行
  function removeParameter(type: 'process' | 'control', index: number) {
    if (type === 'process') {
      processParameters = processParameters.filter((_, i) => i !== index);
    } else {
      controlParameters = controlParameters.filter((_, i) => i !== index);
    }
  }

  // 更新状态数据
  $effect(() => {
    if (states) {
      moduleData.update(store => ({
        ...store,
        behavior: {
          ...store.behavior,
          states
        }
      }));
    }
  });
</script>

<div class="module-container">
  <h3>Behavior</h3>
  
  <div class="form-content">
    <div class="tabs">
      <button 
        class="tab-button {activeTab === 'States' ? 'active' : ''}" 
        onclick={() => activeTab = 'States'}
      >
        States
      </button>
      <button 
        class="tab-button {activeTab === 'Parameters' ? 'active' : ''}" 
        onclick={() => activeTab = 'Parameters'}
      >
        Parameters
      </button>
    </div>

    {#if activeTab === 'States'}
      <div class="form-group">
        <div class="states-container">
          <div class="states-tags">
            {#each states as state, index}
              <div 
                class="state-tag {currentStateIndex === index ? 'active' : ''}"
                onclick={() => currentStateIndex = index}
                onkeydown={(e) => e.key === 'Enter' && (currentStateIndex = index)}
                role="button"
                tabindex="0"
              >
                {state.name}
                <button class="remove-tag" onclick={() => removeState(index)}>×</button>
              </div>
            {/each}
            <button class="add-state" onclick={addState}>+ Add State</button>
          </div>

          {#if states.length > 0}
            <div class="state-details">
              <div class="state-header">
                <div class="state-left">
                  <div class="state-info">
                    <div class="input-group">
                      <label for="stateId">ID</label>
                      <input 
                        type="text" 
                        id="stateId" 
                        value={states[currentStateIndex].id}
                        readonly
                      />
                    </div>

                    <div class="input-group">
                      <label for="stateName">Name</label>
                      <input 
                        type="text" 
                        id="stateName" 
                        bind:value={states[currentStateIndex].name}
                      />
                    </div>

                    <div class="input-group">
                      <label for="stateType">Type</label>
                      <select 
                        id="stateType"
                        bind:value={states[currentStateIndex].type}
                      >
                        {#each stateTypes as type}
                          <option value={type}>{type}</option>
                        {/each}
                      </select>
                    </div>
                  </div>

                  <div class="input-group description">
                    <label for="stateDescription">Description</label>
                    <textarea 
                      id="stateDescription" 
                      bind:value={states[currentStateIndex].description}
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div class="state-transitions">
                  <div class="input-group">
                    <label for="stateTransitions">State Transitions</label>
                    <div class="select-container">
                      <div class="select-input">
                        <div class="selected-tags">
                          {#each states[currentStateIndex].transitions as transitionId}
                            {@const targetState = states.find(s => s.id === transitionId)}
                            {#if targetState}
                              <div class="tag">
                                {targetState.name}
                                <button 
                                  class="remove-tag" 
                                  onclick={() => {
                                    states[currentStateIndex].transitions = states[currentStateIndex].transitions.filter(id => id !== transitionId);
                                    states = [...states];
                                  }}
                                >×</button>
                              </div>
                            {/if}
                          {/each}
                        </div>
                        <select 
                          id="stateTransitions"
                          onchange={(e) => {
                            const select = e.target as HTMLSelectElement;
                            if (select.value && !states[currentStateIndex].transitions.includes(select.value)) {
                              states[currentStateIndex].transitions = [...states[currentStateIndex].transitions, select.value];
                              states = [...states];
                              select.value = '';
                            }
                          }}
                        >
                          <option value="">Select a state...</option>
                          {#each states as state}
                            {#if state.id !== states[currentStateIndex].id && !states[currentStateIndex].transitions.includes(state.id)}
                              <option value={state.id}>{state.name}</option>
                            {/if}
                          {/each}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="events-section">
                <div class="events-container">
                  <div class="event-tabs">
                    {#each states[currentStateIndex].events as _, eventIndex}
                      <button 
                        class="event-tab {currentEventIndex === eventIndex ? 'active' : ''}"
                        onclick={() => currentEventIndex = eventIndex}
                      >
                        Event {eventIndex + 1}
                        <span 
                          class="remove-event"
                          onclick={(e) => {
                            e.stopPropagation();
                            removeEvent(currentStateIndex, eventIndex);
                          }}
                          onkeydown={(e) => {
                            if (e.key === 'Enter') {
                              e.stopPropagation();
                              removeEvent(currentStateIndex, eventIndex);
                            }
                          }}
                          role="button"
                          tabindex="0"
                        >×</span>
                      </button>
                    {/each}
                    <button class="add-event-tab" onclick={() => addEvent(currentStateIndex)}>
                      <span>+</span>
                    </button>
                  </div>

                  {#if states[currentStateIndex].events.length > 0}
                    <div class="event-content">
                      <div class="event-form">
                        <div class="event-header">
                          <div class="event-info">
                            <div class="input-group">
                              <label for="eventName">Name</label>
                              <input 
                                type="text" 
                                bind:value={states[currentStateIndex].events[currentEventIndex].name} 
                              />
                            </div>

                            <div class="input-group">
                              <label for="eventType">Type</label>
                              <select 
                                bind:value={states[currentStateIndex].events[currentEventIndex].type}
                              >
                                {#each eventTypes as type}
                                  <option value={type}>{type}</option>
                                {/each}
                              </select>
                            </div>

                            <div class="input-group">
                              <label for="eventOptional">Optional</label>
                              <select 
                                bind:value={states[currentStateIndex].events[currentEventIndex].optional}
                              >
                                {#each optionalOptions as option}
                                  <option value={option}>{option}</option>
                                {/each}
                              </select>
                            </div>
                          </div>

                          <div class="input-group description">
                            <label for="eventDescription">Description</label>
                            <textarea 
                              bind:value={states[currentStateIndex].events[currentEventIndex].description} 
                              rows="3"
                            ></textarea>
                          </div>
                        </div>

                        <div class="dataset-reference">
                          <div class="dataset-info">
                            <span class="label">Dataset Reference:</span>
                            <span class="value {states[currentStateIndex].events[currentEventIndex].dataset ? 'configured' : ''}">
                              {states[currentStateIndex].events[currentEventIndex].dataset?.name || '未配置'}
                            </span>
                          </div>
                          <button 
                            class="btn-configure"
                            onclick={() => {
                              const dataset = states[currentStateIndex].events[currentEventIndex].dataset;
                              if (dataset) {
                                currentDataset = { ...dataset };
                              } else {
                                currentDataset = {
                                  name: '',
                                  type: datasetTypes[0],
                                  description: '',
                                  schema: ''
                                };
                              }
                              showDatasetDialog = true;
                            }}
                          >
                            配置
                          </button>
                        </div>
                      </div>
                    </div>

                    {#if showDatasetDialog}
                      <div class="dialog-overlay">
                        <div class="dialog">
                          <h3>配置数据集</h3>
                          <div class="dialog-content">
                            <div class="input-group">
                              <label for="datasetName">Name</label>
                              <input 
                                type="text" 
                                id="datasetName"
                                bind:value={currentDataset.name}
                              />
                            </div>

                            <div class="input-group">
                              <label for="datasetType">Type</label>
                              <select 
                                id="datasetType"
                                bind:value={currentDataset.type}
                              >
                                {#each datasetTypes as type}
                                  <option value={type}>{type}</option>
                                {/each}
                              </select>
                            </div>

                            <div class="input-group">
                              <label for="datasetDescription">Description</label>
                              <textarea 
                                id="datasetDescription"
                                bind:value={currentDataset.description}
                                rows="3"
                              ></textarea>
                            </div>

                            <div class="input-group">
                              <label for="datasetSchema">Schema</label>
                              <textarea 
                                id="datasetSchema"
                                bind:value={currentDataset.schema}
                                rows="3"
                              ></textarea>
                            </div>
                          </div>

                          <div class="dialog-actions">
                            <button 
                              class="btn outline" 
                              onclick={() => showDatasetDialog = false}
                            >
                              取消
                            </button>
                            <button 
                              class="btn primary"
                              onclick={() => {
                                states[currentStateIndex].events[currentEventIndex].dataset = { ...currentDataset };
                                states = [...states];
                                showDatasetDialog = false;
                              }}
                            >
                              保存
                            </button>
                          </div>
                        </div>
                      </div>
                    {/if}
                  {/if}
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="form-group">
        <div class="parameters-section">
          <div class="parameter-group">
            <h4>Process Parameters</h4>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Description</th>
                    <th>Default Value</th>
                    <th class="action-column">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {#each processParameters as param, index}
                    <tr>
                      <td><input type="text" bind:value={param.key} /></td>
                      <td><input type="text" bind:value={param.description} /></td>
                      <td><input type="text" bind:value={param.defaultValue} /></td>
                      <td class="action-column">
                        <button class="btn-remove" onclick={() => removeParameter('process', index)}>×</button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <div class="btn-add-container">
                <button class="btn-add" onclick={() => addParameter('process')}>Add Row</button>
              </div>
            </div>
          </div>

          <div class="parameter-group">
            <h4>Control Parameters</h4>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Description</th>
                    <th>Default Value</th>
                    <th class="action-column">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {#each controlParameters as param, index}
                    <tr>
                      <td><input type="text" bind:value={param.key} /></td>
                      <td><input type="text" bind:value={param.description} /></td>
                      <td><input type="text" bind:value={param.defaultValue} /></td>
                      <td class="action-column">
                        <button class="btn-remove" onclick={() => removeParameter('control', index)}>×</button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <div class="btn-add-container">
                <button class="btn-add" onclick={() => addParameter('control')}>Add Row</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div class="action-buttons">
    <button class="btn outline" onclick={() => prev("prev")}>返回上一步</button>
    <button class="btn primary" onclick={() => next("next")}>确认，下一步</button>
  </div>
</div>

<style>
  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
    background: var(--card-bg);
    border-radius: 8px 8px 0 0;
  }

  .tab-button {
    padding: 0.75rem 1.5rem;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--text-color);
    opacity: 0.7;
    position: relative;
    transition: all 0.3s ease;
    outline: none;
    font-weight: 600;
  }

  .tab-button:not(.active) {
    text-shadow: 0 0 0 transparent;
  }

  .tab-button.active {
    opacity: 1;
    text-shadow: 0 0 0 currentColor;
  }

  .tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary-color);
  }

  .form-group {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .states-container {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2rem;
  }

  .states-tags {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--background-color);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .state-tag {
    padding: 0.75rem 1rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
    font-size: 0.95rem;
    color: var(--text-color);
  }

  .state-tag:hover {
    border-color: var(--primary-color);
    transform: translateX(2px);
  }

  .state-tag.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    box-shadow: 0 2px 4px rgba(var(--primary-color-rgb), 0.2);
  }

  .remove-tag {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0.25rem;
    opacity: 0.7;
    border-radius: 4px;
    font-size: 1.1rem;
    line-height: 1;
    transition: all 0.2s ease;
  }

  .remove-tag:hover {
    opacity: 1;
    background: rgba(255, 68, 68, 0.1);
    color: #ff4444;
  }

  .add-state {
    padding: 0.75rem;
    background: none;
    border: 2px dashed var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    color: var(--primary-color);
    transition: all 0.2s ease;
    font-weight: 500;
    font-size: 0.95rem;
  }

  .add-state:hover {
    background: rgba(var(--primary-color-rgb), 0.05);
    border-color: var(--primary-color);
  }

  .state-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--background-color);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .state-left {
    display: grid;
    grid-template-columns: minmax(300px, 2fr) 3fr;
    gap: 1rem;
    align-items: center;
  }

  .state-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-group {
    margin-bottom: 0;
  }

  .input-group label {
    display: block;
    margin-left: 0.5rem;
    font-weight: 600;
    text-align: start;
    color: var(--text-color);
    font-size: 0.95rem;
  }

  .input-group input,
  .input-group select,
  .input-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 0.95rem;
    background: var(--card-bg);
    color: var(--text-color);
    transition: all 0.2s ease;
  }

  .input-group input:hover,
  .input-group select:hover,
  .input-group textarea:hover {
    border-color: var(--primary-color);
  }

  .input-group input:focus,
  .input-group select:focus,
  .input-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
  }

  .input-group input[readonly] {
    background: var(--background-color);
    border-style: dashed;
    cursor: not-allowed;
  }

  .input-group.description {
    height: 100%;
  }

  .input-group.description textarea {
    height: 88%;
    min-height: 133px;
    resize: vertical;
  }

  .state-transitions {
    display: flex;
    flex-direction: column;
  }

  .state-transitions .input-group {
    display: flex;
    flex-direction: column;
  }

  .state-transitions .select-container {
    position: relative;
  }

  .state-transitions .select-input {
    position: relative;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--card-bg);
    padding: 0.25rem;
    min-height: 38px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    align-items: center;
  }

  .state-transitions .select-input:hover {
    border-color: var(--primary-color);
  }

  .state-transitions .select-input:focus-within {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
  }

  .state-transitions .selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    align-items: center;
  }

  .state-transitions select {
    border: none;
    outline: none;
    background: transparent;
    color: var(--text-color);
    padding: 0.25rem;
    font-size: 0.9rem;
    cursor: pointer;
    min-width: 120px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.375rem;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.9rem;
    color: var(--text-color);
  }

  .tag .remove-tag {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    font-size: 1.1rem;
    line-height: 1;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tag .remove-tag:hover {
    opacity: 1;
    color: #ff4444;
  }

  .events-section {
    margin-top: 0.5rem;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
  }
  h4 {
    color: var(--text-color);
    margin-bottom: 0rem;
  } 

  .events-container {
    display: flex;
    flex-direction: column;
  }

  .event-tabs {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    background: var(--background-color);
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) transparent;
  }

  .event-tabs::-webkit-scrollbar {
    height: 4px;
  }

  .event-tabs::-webkit-scrollbar-track {
    background: transparent;
  }

  .event-tabs::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 2px;
  }

  .event-tab {
    padding: 0.25rem 0.3rem;
    background: none;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    color: var(--text-color);
    opacity: 0.7;
    cursor: pointer;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    white-space: nowrap;
    transition: all 0.2s ease;
  }
  .event-tab.active {
    background: var(--primary-color);
    opacity: 1;
    color: white;
  }

  .event-tab:hover {
    opacity: 1;
    border-color: var(--primary-color);
  }


  .event-tab .remove-event {
    opacity: 0.7;
    font-size: 1.2rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }


  .event-tab .remove-event:hover {
    opacity: 1;
    background: rgba(255, 68, 68, 0.1);
    color: #ff4444;
  }

  .add-event-tab {
    padding: 0rem 0.5rem;
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    opacity: 0.7;
    transition: all 0.2s ease;
    border-radius: 4px;
    line-height: 1;
  }

  .add-event-tab:hover {
    opacity: 1;
    background: rgba(var(--primary-color-rgb), 0.05);
  }

  .event-content {
    padding: 1rem;
    background: var(--card-bg);
  }

  .event-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .event-header {
    display: grid;
    grid-template-columns: minmax(300px, 2fr) 3fr;
    gap: 1rem;
    align-items: start;
    background: var(--background-color);
    border-radius: 8px;
  }

  .dataset-reference {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 0.5rem 0.5rem 0.5rem;
    background: var(--background-color);
    border-radius: 4px;
  }

  .parameters-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .parameter-group {
    background: var(--card-bg);
    border-radius: 8px;
    overflow: hidden;
  }

  .parameter-group h4 {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    font-size: 1.1rem;
    font-weight: 600;
  }

  .table-container {
    overflow-x: auto;
    margin-top: 1rem;
    background: var(--card-bg);
    border-radius: 6px;
    border: 1px solid var(--border-color);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  th {
    background: var(--background-color);
    font-weight: 600;
    color: var(--text-color);
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 2px solid var(--border-color);
  }

  td {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
  }

  tr:hover td {
    background: var(--background-color);
  }

  td input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.9rem;
    background: var(--card-bg);
    transition: all 0.2s ease;
  }

  td input[type="text"]:hover {
    border-color: var(--primary-color);
  }

  td input[type="text"]:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
  }

  .action-column {
    width: 80px;
    text-align: center;
  }

  .btn-remove {
    padding: 0.25rem 0.5rem;
    background: none;
    border: none;
    color: #ff4444;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    opacity: 0.7;
  }

  .btn-remove:hover {
    opacity: 1;
    background: rgba(255, 68, 68, 0.1);
  }

  .btn-add-container {
    padding: 0.5rem;
    text-align: right;
    background: var(--card-bg);
    border-top: 1px solid var(--border-color);
  }

  .btn-add {
    padding: 0.5rem 1rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .btn-add:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    .state-header {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .input-group.description textarea {
      min-height: 100px;
    }
  }

  @media (max-width: 768px) {
    .states-container {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .states-tags {
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0.75rem;
    }

    .state-tag {
      flex: 1;
      min-width: 150px;
    }

    .add-state {
      flex: 1;
      min-width: 150px;
    }

    .form-group {
      padding: 1rem;
    }

    .state-header {
      padding: 1rem;
    }
  }

  .event-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .event-form .input-group.description {
    height: 100%;
  }

  .event-form .input-group.description textarea {
    height: 88%;
    min-height: 133px;
    resize: vertical;
  }

  .dataset-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dataset-info .label {
    font-weight: 600;
    color: var(--text-color);
  }

  .dataset-info .value {
    color: var(--text-color);
    opacity: 0.8;
  }

  .dataset-info .value.configured {
    color: #22c55e;
    opacity: 1;
  }

  .btn-configure {
    padding: 0.25rem 0.75rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .btn-configure:hover {
    opacity: 0.9;
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .dialog {
    background: var(--card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .dialog h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.25rem;
    color: var(--text-color);
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
  }
</style> 