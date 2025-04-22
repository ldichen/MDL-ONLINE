<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { formatDate } from '$lib/utils/formatters';
  import { EXTERNAL_LINKS } from '$lib/constants/config';
  import BasicInfo from '$lib/modules/BasicInfo.svelte';
  import LocalAttribute from '$lib/modules/LocalAttribute.svelte';
  import Authors from '$lib/modules/Authors.svelte';
  import Behavior from '$lib/modules/Behavior.svelte';
  import Runtime from '$lib/modules/Runtime.svelte';

  let currentModule = 0; // 0 表示首页，1-5 表示各个模块
  let isTransitioning = false;
  let direction = 1; // 1 表示向下，-1 表示向上

  const { OPENGMS } = EXTERNAL_LINKS;
  const currentDate = formatDate(new Date());
  const modules = [
    { id: 1, name: "基础信息", component: BasicInfo },
    { id: 2, name: '本地属性', component: LocalAttribute },
    { id: 3, name: '作者', component: Authors },
    { id: 4, name: '行为', component: Behavior },
    { id: 5, name: '运行时', component: Runtime }
  ];

  function handleWheel(event: WheelEvent) {
    if (isTransitioning) return;
    
    // 检查事件目标是否在 form-content 内
    const formContent = document.querySelector('.form-content');
    if (formContent?.contains(event.target as Node)) {
      // 如果在 form-content 内，不执行模块切换
      return;
    }
    
    const delta = Math.sign(event.deltaY);
    if (delta > 0 && currentModule < 5) {
      direction = 1;
      nextModule();
    } else if (delta < 0 && currentModule > 0) {
      direction = -1;
      previousModule();
    }
  }

  function startExplore() {
    direction = 1;
    currentModule = 1;
  }

  function nextModule() {
    if (currentModule < 5) {
      direction = 1;
      isTransitioning = true;
      currentModule++;
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  function previousModule() {
    if (currentModule > 0) {
      direction = -1;
      isTransitioning = true;
      currentModule--;
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }
  }

  function goToModule(index: number) {
    if (index === currentModule) return;
    direction = index > currentModule ? 1 : -1;
    currentModule = index;
  }

  function handleModuleNavigation(type: string) {
    if (type === 'next') {
      nextModule();
    } else if (type === 'prev') {
      previousModule();
    }
  }

  function goToMDLDocs() {
    window.open(EXTERNAL_LINKS.OPENGMS.MDL, '_blank');
  }

  onMount(() => {
    document.body.style.overflow = 'hidden'; // 禁用页面滚动
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  $: inAnimation = direction > 0 
    ? { y: 50, duration: 500 }
    : { y: -50, duration: 500 };
  
  $: outAnimation = direction > 0
    ? { y: -50, duration: 500 }
    : { y: 50, duration: 500 };

  // 监听模块变化
  $: {
    if (typeof window !== 'undefined' && currentModule !== undefined) {
      console.log('Current Module:', currentModule);
      window.dispatchEvent(new CustomEvent('moduleChange', {
        detail: { currentModule }
      }));
    }
  }

  // 初始化时触发一次
  onMount(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('moduleChange', {
        detail: { currentModule }
      }));
    }
  });
</script>

<svelte:head>
  <title>MDL-ONLINE - 构建你的MDL</title>
  <meta name="description" content="欢迎访问MDL-ONLINE，一个专业的Svelte应用开发框架。" />
</svelte:head>

<svelte:window on:wheel={handleWheel}/>

<main>
  <div class="content">
    {#key currentModule}
      <div class="module" 
           in:fly={inAnimation}
           out:fly={outAnimation}>
        {#if currentModule === 0}
          <h1>欢迎使用 MDL-ONLINE</h1>
          <p class="subtitle">一个专业在线构建MDL的工具</p>
          
          <div class="action-buttons">
            <Button variant="primary" size="lg" on:click={startExplore}>开始探索</Button>
            <a href={OPENGMS.MDL} target="_blank">
              <Button variant="outline" size="lg">了解更多</Button>
            </a>
          </div>

          <p class="info">今天是 {currentDate}</p>
        {:else}
          <svelte:component 
            this={modules[currentModule - 1].component}
            next={handleModuleNavigation}
            prev={handleModuleNavigation}
          />
        {/if}
      </div>
    {/key}
  </div>

  {#if currentModule > 0}
    <div class="nav-bar">
      {#each modules as module, index}
        <button 
          class="nav-item {currentModule === index + 1 ? 'active' : ''}"
          on:click={() => goToModule(index + 1)}
          aria-label="跳转到{module.name}模块"
          aria-current={currentModule === index + 1}
        >
          <div class="nav-dot"></div>
          <span class="nav-label">{module.name}</span>
        </button>
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    height: 100vh;
    overflow: hidden;
    display: flex;
    position: relative;
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .content {
    flex: 1;
    height: 100vh;
  }

  .nav-bar {
    position: absolute;
    right: 1vw;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    background-color: var(--card-bg);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    z-index: 10;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.3s;
    background: none;
    border: none;
    padding: 0.75rem 0.5rem;
    width: 100%;
    text-align: left;
    min-height: 48px;
  }

  .nav-item:hover, .nav-item:focus {
    opacity: 1;
    outline: none;
  }

  .nav-item:focus-visible {
    outline: 2px solid var(--primary-color);
    border-radius: 4px;
  }

  .nav-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--primary-color);
    transition: transform 0.3s;
    flex-shrink: 0;
    margin: auto 0;
  }

  .nav-item.active .nav-dot {
    transform: scale(1.6);
  }

  .nav-label {
    font-size: 1rem;
    color: var(--text-color);
    transition: color 0.3s;
    white-space: nowrap;
    margin: auto 0;
    line-height: 1;
  }

  .nav-item.active .nav-label {
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--primary-color);
  }
  
  .module {
    height: 95vh;
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: var(--background-color);
    text-align: center;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--text-color);
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }

  .info {
    font-style: italic;
    color: var(--text-color);
    opacity: 0.8;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .nav-bar {
      width: 60px;
      padding: 1.5rem 1rem;
    }

    .nav-item:not(:last-child)::after {
      left: 7px;
      height: calc(2.5rem + 1rem);
    }

    .nav-label {
      display: none;
    }

    .module {
      padding-right: calc(60px + 1rem);
    }

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
