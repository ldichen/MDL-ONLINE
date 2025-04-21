<script lang="ts">
  import '../styles/modules.css';
  import { moduleData } from '../stores/moduleData';
  let { next, prev } = $props();     

  // 使用 store 中的数据
  let authors = $derived($moduleData.authors.list);

  // 确保初始化时至少有一行数据
  $effect(() => {
    if (authors.length === 0) {
      addAuthor();
    }
  });

  // 作者数据结构
  interface Author {
    type: string;
    account: string;
    name: string;
    insCountry: string;
    insCity: string;
    insAddress: string;
    email: string;
    fax: string;
    phone: string;
  }

  // 添加新作者
  function addAuthor() {
    const newAuthors = [...authors, {
      type: '',
      account: '',
      name: '',
      insCountry: '',
      insCity: '',
      insAddress: '',
      email: '',
      fax: '',
      phone: ''
    }];
    moduleData.update(store => ({
      ...store,
      authors: {
        ...store.authors,
        list: newAuthors
      }
    }));
  }

  // 删除作者
  function removeAuthor(index: number) {
    const newAuthors = authors.filter((_, i) => i !== index);
    moduleData.update(store => ({
      ...store,
      authors: {
        ...store.authors,
        list: newAuthors
      }
    }));
  }

  // 更新 store 中的数据
  $effect(() => {
    moduleData.update(store => ({
      ...store,
      authors: {
        ...store.authors,
        list: authors
      }
    }));
  });
</script>

<div class="module-container">
  <h3>Authors</h3>
  
  <div class="form-content">
    <div class="form-group">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Account</th>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th>Address</th>
              <th>Email</th>
              <th>Fax</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {#each authors as author, index}
              <tr>
                <td>
                  <input type="text" bind:value={author.type} />
                </td>
                <td><input type="text" bind:value={author.account} /></td>
                <td><input type="text" bind:value={author.name} /></td>
                <td><input type="text" bind:value={author.insCountry} /></td>
                <td><input type="text" bind:value={author.insCity} /></td>
                <td><input type="text" bind:value={author.insAddress} /></td>
                <td><input type="text" bind:value={author.email} /></td>
                <td><input type="text" bind:value={author.fax} /></td>
                <td><input type="text" bind:value={author.phone} /></td>
                <td>
                  <button class="btn-remove" onclick={() => removeAuthor(index)}>×</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        <div class="btn-add-container">
          <button class="btn-add" onclick={addAuthor}>Add Author</button>
        </div>
      </div>
    </div>
  </div>

  <div class="action-buttons">
    <button class="btn outline" onclick={() => prev("prev")}>返回上一步</button>
    <button class="btn primary" onclick={() => next("next")}>确认，下一步</button>
  </div>
</div>

<style>
  .module-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  .form-content {
    margin: 2rem 0;
    min-height: 300px;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn.primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
  }

  .btn.outline {
    background: none;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
  }

  .btn:hover {
    opacity: 0.9;
  }

  h3 {
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
    background: var(--card-bg, #ffffff);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .table-container {
    position: relative;
    overflow-x: auto;
    background: var(--card-bg);
    border-radius: 6px;
    border: 1px solid var(--border-color);
    max-width: 750px;
    margin: 0 auto;
  }

  table {
    width: auto;
    border-collapse: collapse;
    font-size: 0.9rem;
    table-layout: fixed;
  }

  th, td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }

  th:not(:last-child), 
  td:not(:last-child) {
    min-width: 90px;
  }

  th:last-child,
  td:last-child {
    position: sticky;
    right: 0;
    background: var(--card-bg);
    width: 60px;
    text-align: center;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  }

  th:last-child {
    background: var(--background-color);
  }

  td input[type="text"] {
    width: 90px;
    padding: 0.4rem 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: var(--input-bg);
    color: var(--text-color);
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

  .btn-add-container {
    position: sticky;
    left: 0;
    right: 0;
    padding: 0.5rem;
    text-align: center;
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
    transition: all 0.2s ease;
    font-size: 0.9rem;
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
    .table-container {
      margin: 0 -1rem;
      border-radius: 0;
    }
  }
</style> 