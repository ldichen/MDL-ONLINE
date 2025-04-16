<script lang="ts">
  import '../styles/modules.css';
  let { next } = $props();
</script>

<div class="module-container">
  <h3>Basic Info</h3>
  
  <div class="form-content">
    <!-- 基础信息表单内容将在这里添加 -->
  </div>

  <div class="action-buttons">
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

  .btn:hover {
    opacity: 0.9;
  }
</style> 