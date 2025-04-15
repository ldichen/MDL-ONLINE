<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { toggleTheme, theme } from '$lib/stores/theme';
  import { formatDate } from '$lib/utils/formatters';
  
  const currentDate = formatDate(new Date());
</script>

<main>
  <div class="hero">
    <h1>欢迎使用 MDL-ONLINE</h1>
    <p class="subtitle">一个专业的 Svelte 应用</p>
    
    <div class="action-buttons">
      <Button variant="primary" size="lg">开始探索</Button>
      <Button variant="outline" size="lg">了解更多</Button>
    </div>
    
    <p class="info">今天是 {currentDate}</p>
  </div>
  
  <section class="features">
    <h2>特色功能</h2>
    
    <div class="feature-grid">
      <div class="feature-card">
        <h3>响应式设计</h3>
        <p>完美适配各种设备尺寸的布局</p>
      </div>
      
      <div class="feature-card">
        <h3>深色模式</h3>
        <p>支持深色模式和浅色模式切换</p>
        <div class="theme-toggle">
          <Button size="sm" on:click={toggleTheme}>
            {$theme === 'dark' ? '切换到浅色' : '切换到深色'}
          </Button>
        </div>
      </div>
      
      <div class="feature-card">
        <h3>高性能</h3>
        <p>利用 Svelte 的优势，实现极速的用户体验</p>
      </div>
    </div>
  </section>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .hero {
    text-align: center;
    padding: 4rem 0;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #ff3e00;
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #676778;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .info {
    font-style: italic;
    color: #888;
  }
  
  .features {
    margin-top: 4rem;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: var(--card-bg, white);
    transition: transform 0.2s;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    margin-top: 0;
    color: #ff3e00;
  }
  
  .theme-toggle {
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1.2rem;
    }
    
    .action-buttons {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
