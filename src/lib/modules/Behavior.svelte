<script lang="ts">
  import '../styles/modules.css';
  let { next, prev } = $props();
</script>

<div class="module-container">
  <h3>Behavior</h3>
  
  <div class="form-content">
    <!-- 行为配置表单内容将在这里添加 -->
  </div>

  <div class="action-buttons">
    <button class="btn outline" onclick={() => prev("prev")}>返回上一步</button>
    <button class="btn primary" onclick={() => next("next")}>确认，下一步</button>
  </div>
</div>

<style>
</style> 