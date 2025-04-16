<script lang="ts">
  // 团队成员数据
  const teamMembers = [
    {
      name: '张三',
      role: '创始人 & CEO',
      bio: '10年前端开发经验，曾在多家科技公司担任技术领导职位。热爱开源，积极参与 Svelte 社区贡献。',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: '李四',
      role: 'CTO',
      bio: '全栈工程师，专注于性能优化和架构设计。曾主导多个大型Web应用的开发，热爱解决复杂技术挑战。',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: '王五',
      role: '产品经理',
      bio: '专注用户体验和产品设计，具有敏锐的市场洞察力。擅长将用户需求转化为有效的产品功能。',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: '赵六',
      role: 'UI/UX 设计师',
      bio: '拥有优秀的设计感和审美能力，致力于创造简洁而富有吸引力的用户界面，提升用户体验。',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ];
</script>

<svelte:head>
  <title>MDL-ONLINE - 关于我们</title>
  <meta name="description" content="了解MDL-ONLINE团队和我们的故事。" />
</svelte:head>

<div class="container">
  <section class="about-section">
    <h1>关于我们</h1>
    <p class="lead">
      MDL-ONLINE 是一家致力于用现代化技术创造卓越用户体验的公司。我们的核心技术栈是 Svelte，我们相信它代表了 Web 开发的未来。
    </p>
    
    <div class="about-content">
      <div class="about-text">
        <h2>我们的故事</h2>
        <p>
          MDL-ONLINE 成立于2022年，由一群热爱 Web 技术的开发者组建。我们注意到 Svelte 框架独特的编译时方法为 Web 应用带来了显著的性能提升，并决定专注于此技术，打造性能卓越的现代 Web 应用。
        </p>
        <p>
          短短两年内，我们已经为众多企业提供了基于 Svelte 的解决方案，帮助他们提升用户体验、加快加载速度、并简化开发流程。我们的愿景是让 Svelte 技术更加普及，让更多企业和开发者受益于这一革命性技术。
        </p>
        
        <h2>我们的价值观</h2>
        <ul class="values-list">
          <li><strong>创新</strong> - 我们不断探索前沿技术和最佳实践</li>
          <li><strong>质量</strong> - 我们坚持高标准，注重细节与用户体验</li>
          <li><strong>效率</strong> - 我们相信技术应该提高效率，而非制造复杂性</li>
          <li><strong>开放</strong> - 我们支持开源社区，积极分享知识和经验</li>
        </ul>
      </div>
      
      <div class="about-image">
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="MDL-ONLINE 团队合作场景" />
      </div>
    </div>
  </section>
  
  <section class="team-section">
    <h2>我们的团队</h2>
    <p class="team-intro">
      由充满激情的专业人士组成的团队，致力于为客户提供最佳解决方案。
    </p>
    
    <div class="team-grid">
      {#each teamMembers as member}
        <div class="team-member">
          <img src={member.avatar} alt={member.name} class="member-avatar" />
          <h3>{member.name}</h3>
          <p class="member-role">{member.role}</p>
          <p class="member-bio">{member.bio}</p>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .about-section {
    margin: 4rem 0;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .lead {
    font-size: 1.25rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 3rem;
    color: var(--secondary-color);
  }
  
  .about-content {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    align-items: center;
  }
  
  .about-text h2 {
    font-size: 1.75rem;
    margin: 2rem 0 1rem;
  }
  
  .about-text p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
  
  .values-list {
    padding-left: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .values-list li {
    margin-bottom: 0.75rem;
  }
  
  .about-image img {
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .team-section {
    margin: 5rem 0;
  }
  
  .team-section h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .team-intro {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 3rem;
    color: var(--secondary-color);
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .team-member {
    text-align: center;
    background-color: var(--card-bg);
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .team-member:hover {
    transform: translateY(-5px);
  }
  
  .member-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.5rem;
    border: 3px solid var(--primary-color);
  }
  
  .team-member h3 {
    margin: 0;
    font-size: 1.25rem;
  }
  
  .member-role {
    color: var(--primary-color);
    font-weight: 500;
    margin: 0.5rem 0 1rem;
  }
  
  .member-bio {
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
    }
    
    .about-image {
      order: -1;
    }
  }
</style> 