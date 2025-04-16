<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>MDL-ONLINE - 功能特性</title>
  <meta name="description" content="探索MDL-ONLINE的强大功能和特性。" />
</svelte:head>

<div class="container">
  <header class="page-header">
    <h1>功能特性</h1>
    <p class="subtitle">探索 MDL-ONLINE 的强大功能</p>
  </header>

  <section class="feature-showcase">
    <div class="feature-card">
      <div class="feature-icon">🚀</div>
      <h2>高性能</h2>
      <p>
        Svelte 的编译时优化让应用体积更小、加载更快、响应更灵敏。无需虚拟 DOM，直接操作 DOM，性能翻倍提升。
      </p>
      <Button variant="outline" size="sm">了解更多</Button>
    </div>

    <div class="feature-card">
      <div class="feature-icon">🎨</div>
      <h2>响应式设计</h2>
      <p>
        应用在任何设备上都能完美呈现，从手机到桌面电脑，自适应布局确保最佳用户体验。
      </p>
      <Button variant="outline" size="sm">了解更多</Button>
    </div>

    <div class="feature-card">
      <div class="feature-icon">🌙</div>
      <h2>暗色模式</h2>
      <p>
        支持明暗主题切换，减轻眼睛疲劳，提升用户体验，同时遵循系统主题设置。
      </p>
      <Button variant="outline" size="sm">了解更多</Button>
    </div>

    <div class="feature-card">
      <div class="feature-icon">📱</div>
      <h2>PWA 支持</h2>
      <p>
        Progressive Web App 技术支持，可安装到主屏幕，离线访问，推送通知，给用户原生应用般的体验。
      </p>
      <Button variant="outline" size="sm">了解更多</Button>
    </div>

    <div class="feature-card">
      <div class="feature-icon">🔒</div>
      <h2>安全性</h2>
      <p>
        内置安全防护，防御 XSS、CSRF 等常见攻击，保护用户数据安全，符合隐私法规要求。
      </p>
      <Button variant="outline" size="sm">了解更多</Button>
    </div>

    <div class="feature-card">
      <div class="feature-icon">⚡</div>
      <h2>快速开发</h2>
      <p>
        开发者友好的架构，热重载，开发体验优异，让开发者专注于业务逻辑而非框架本身。
      </p>
      <Button variant="outline" size="sm">了解更多</Button>
    </div>
  </section>

  <section class="cta-section">
    <div class="cta-content">
      <h2>准备好开始使用了吗？</h2>
      <p>加入 MDL-ONLINE，享受现代化 Web 开发体验。</p>
      <div class="cta-buttons">
        <Button variant="primary" size="lg">立即开始</Button>
        <Button variant="outline" size="lg">联系我们</Button>
      </div>
    </div>
  </section>
</div>

<style>
  .page-header {
    text-align: center;
    margin: 4rem 0 3rem;
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--secondary-color);
    margin-top: 0.5rem;
  }

  .feature-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .feature-card {
    background-color: var(--card-bg);
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .feature-card:hover {
    transform: translateY(-5px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .feature-card h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .feature-card p {
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  .cta-section {
    background-color: var(--card-bg);
    border-radius: 0.5rem;
    padding: 3rem 2rem;
    text-align: center;
    margin-bottom: 4rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .cta-content h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .cta-content p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: var(--secondary-color);
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }
  }
</style> 