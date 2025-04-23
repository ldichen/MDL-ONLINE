<script lang="ts">
  import { theme, toggleTheme } from '$lib/stores/theme';
  import ThemeIcon from '$lib/components/ThemeIcon.svelte';
  import { onMount } from 'svelte';
  import '../app.css';
  import { EXTERNAL_LINKS } from '$lib/constants/config';
  
  // 确保客户端渲染时应用主题
  onMount(() => {
    if ($theme) {
      document.documentElement.setAttribute('data-theme', $theme);
    }
  });

  // 添加一个变量来追踪当前是否在欢迎模块
  let isWelcomeModule = true;

  // 监听自定义事件来更新状态
  onMount(() => {
    const handleModuleChange = (event: Event) => {
      const moduleEvent = event as CustomEvent;
      console.log('Module Change Event:', moduleEvent.detail); // 添加调试日志
      isWelcomeModule = moduleEvent.detail.currentModule === 0;
      console.log('Is Welcome Module:', isWelcomeModule); // 添加调试日志
    };

    window.addEventListener('moduleChange', handleModuleChange as EventListener);

    return () => {
      window.removeEventListener('moduleChange', handleModuleChange as EventListener);
    };
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
          <!-- <li><a href="/">首页</a></li>
          <li><a href="/features">功能</a></li>
          <li><a href="/about">关于</a></li>
          <li><a href="/contact">联系我们</a></li> -->
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

  {#if isWelcomeModule}
    <footer class="floating-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>OpenGMS系统</h3>
            <ul>
              <li><a href={EXTERNAL_LINKS.OPENGMS.HOME}>OpenGMS</a></li>
              <li><a href={EXTERNAL_LINKS.OPENGMS.OpenGMP}>开放式建模平台</a></li>
              <li><a href={EXTERNAL_LINKS.OPENGMS.PExploration}>地理问题求解平台</a></li>
              <li><a href={EXTERNAL_LINKS.OPENGMS.YangtzeVGLab}>长三角虚拟地理实验平台</a></li>
            </ul>

          </div>
          
          <div class="footer-section">
            <h3>在线工具</h3>
            <ul>
              <li><a href="/">数据服务容器</a></li>
              <li><a href="/">模型服务容器</a></li>
              <li><a href={EXTERNAL_LINKS.OPENGMS.MDL_ONLINE}>MDL-ONLINE</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>联系方式</h3>
            <p>邮箱: opengms@njnu.edu.cn</p>
          </div>
        </div>
        
        <div class="copyright">
          Copyright &copy; 2011-2023 OpenGMS. All Rights Reserved.
        </div>
      </div>
    </footer>
  {/if}
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

  }
  
  .footer-section {
    text-align: center;
  }

  .footer-section h3 {
    margin-top: 0;
    color: var(--primary-color);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .floating-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: var(--footer-bg);
    padding: 1rem 0 1rem;
    margin-top: 0;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  }

  .floating-footer .container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .floating-footer .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .floating-footer .footer-section {
    text-align: center;
  }

  .floating-footer .footer-section h3 {
    margin-top: 0;
    color: var(--primary-color);
    margin-bottom: 1rem;
    text-align: center;
  }

  .floating-footer .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .floating-footer .footer-section li {
    margin-bottom: 0.5rem;
  }

  .floating-footer .footer-section a {
    text-decoration: none;
    color: var(--text-color);
    transition: color 0.2s;
  }

  .floating-footer .footer-section a:hover {
    color: var(--primary-color);
  }

  .floating-footer .copyright {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .floating-footer {
      padding: 1.5rem 0 1rem;
    }

    .floating-footer .footer-content {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style> 