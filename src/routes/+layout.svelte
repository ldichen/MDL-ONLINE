<script lang="ts">
  import { theme, toggleTheme } from '$lib/stores/theme';
  import ThemeIcon from '$lib/components/ThemeIcon.svelte';
  import { onMount } from 'svelte';
  import '../app.css';
  
  // 确保客户端渲染时应用主题
  onMount(() => {
    if ($theme) {
      document.documentElement.setAttribute('data-theme', $theme);
    }
  });
</script>

<div class="app" data-theme={$theme}>
  <header>
    <div class="container">
      <div class="logo">
        <a href="/">MDL-ONLINE</a>
      </div>
      
      <nav>
        <ul>
          <li><a href="/">首页</a></li>
          <li><a href="/features">功能</a></li>
          <li><a href="/about">关于</a></li>
          <li><a href="/contact">联系我们</a></li>
        </ul>
        <button class="theme-toggle" on:click={toggleTheme} aria-label="切换主题">
          <ThemeIcon theme={$theme} />
        </button>
      </nav>
    </div>
  </header>

  <div class="content">
    <slot />
  </div>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>MDL-ONLINE</h3>
          <p>一个专业的 Svelte 应用开发框架</p>
        </div>
        
        <div class="footer-section">
          <h3>链接</h3>
          <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/features">功能</a></li>
            <li><a href="/about">关于</a></li>
            <li><a href="/contact">联系我们</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>联系方式</h3>
          <p>邮箱: info@mdl-online.com</p>
          <p>电话: +86 123 4567 8900</p>
        </div>
      </div>
      
      <div class="copyright">
        Copyright &copy; 2011-2023 OpenGMS. All Rights Reserved.
      </div>
    </div>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
    background-color: var(--header-bg, #ffffff);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .logo a {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
    text-decoration: none;
  }
  
  nav {
    margin-left: 30px;
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
  
  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
    align-items: center;
  }
  
  nav a {
    text-decoration: none;
    color: var(--text-color, #333);
    font-weight: 500;
    transition: color 0.2s;
  }
  
  nav a:hover {
    color: var(--primary-color);
  }

  nav li:last-child {
    height: 30px;
    display: flex;
    align-items: center;
  }

  .theme-toggle {
    background: none;
    border: none;
    padding: 0.2rem;
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .theme-toggle:hover {
    background-color: var(--hover-bg);
  }
  
  .content {
    flex: 1;
  }
  
  footer {
    background-color: var(--footer-bg, #f5f5f5);
    padding: 3rem 0 1.5rem;
    margin-top: 4rem;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .footer-section h3 {
    margin-top: 0;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-section li {
    margin-bottom: 0.5rem;
  }
  
  .footer-section a {
    text-decoration: none;
    color: var(--text-color, #333);
    transition: color 0.2s;
  }
  
  .footer-section a:hover {
    color: var(--primary-color);
  }
  
  .copyright {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color, #ddd);
    font-size: 0.875rem;
  }
  
  @media (max-width: 768px) {
    header .container {
      flex-direction: column;
      height: auto;
      padding: 1rem;
    }
    
    .logo {
      margin-bottom: 1rem;
    }
    
    nav ul {
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .theme-toggle {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }
</style> 