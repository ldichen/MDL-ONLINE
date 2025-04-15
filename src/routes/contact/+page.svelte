<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  let formSubmitted = false;
  let formError = false;
  
  function handleSubmit() {
    // 模拟表单提交
    if (formData.name && formData.email && formData.message) {
      formSubmitted = true;
      formError = false;
      
      // 重置表单
      formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    } else {
      formError = true;
    }
  }
</script>

<div class="container">
  <div class="contact-header">
    <h1>联系我们</h1>
    <p class="lead">
      我们期待听到您的声音。无论是咨询、合作还是建议，请随时与我们联系。
    </p>
  </div>
  
  <div class="contact-content">
    <div class="contact-info">
      <div class="info-card">
        <div class="info-icon">📍</div>
        <h3>地址</h3>
        <p>北京市海淀区中关村南大街5号</p>
      </div>
      
      <div class="info-card">
        <div class="info-icon">✉️</div>
        <h3>邮箱</h3>
        <p>info@mdl-online.com</p>
      </div>
      
      <div class="info-card">
        <div class="info-icon">📞</div>
        <h3>电话</h3>
        <p>+86 123 4567 8900</p>
      </div>
      
      <div class="info-card">
        <div class="info-icon">⏰</div>
        <h3>工作时间</h3>
        <p>周一至周五: 9:00 - 18:00</p>
      </div>
    </div>
    
    <div class="contact-form-container">
      {#if formSubmitted}
        <div class="success-message">
          <div class="success-icon">✓</div>
          <h2>消息已发送!</h2>
          <p>感谢您的留言，我们会尽快回复您。</p>
          <Button variant="primary" on:click={() => formSubmitted = false}>发送新消息</Button>
        </div>
      {:else}
        <form class="contact-form" on:submit|preventDefault={handleSubmit}>
          <h2>给我们留言</h2>
          
          {#if formError}
            <div class="error-message">
              请填写所有必填字段 (*)
            </div>
          {/if}
          
          <div class="form-group">
            <label for="name">姓名 *</label>
            <input 
              type="text" 
              id="name" 
              bind:value={formData.name} 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">邮箱 *</label>
            <input 
              type="email" 
              id="email" 
              bind:value={formData.email} 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="subject">主题</label>
            <input 
              type="text" 
              id="subject" 
              bind:value={formData.subject}
            />
          </div>
          
          <div class="form-group">
            <label for="message">消息 *</label>
            <textarea 
              id="message" 
              rows="5" 
              bind:value={formData.message} 
              required
            ></textarea>
          </div>
          
          <Button type="submit" variant="primary" size="lg">发送消息</Button>
        </form>
      {/if}
    </div>
  </div>
</div>

<style>
  .contact-header {
    text-align: center;
    margin: 4rem 0 3rem;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .lead {
    font-size: 1.25rem;
    max-width: 700px;
    margin: 0 auto;
    color: var(--secondary-color);
  }
  
  .contact-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    margin-bottom: 4rem;
  }
  
  .contact-info {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .info-card {
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .info-icon {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  .info-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }
  
  .info-card p {
    margin: 0;
    color: var(--secondary-color);
  }
  
  .contact-form-container {
    background-color: var(--card-bg);
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .contact-form h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    background-color: var(--background-color);
    color: var(--text-color);
    font-size: 1rem;
    font-family: inherit;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 62, 0, 0.2);
  }
  
  .error-message {
    background-color: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    padding: 0.75rem;
    border-radius: 0.25rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .success-message {
    text-align: center;
    padding: 2rem;
  }
  
  .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: var(--success-color);
    color: white;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .success-message h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--success-color);
  }
  
  .success-message p {
    margin-bottom: 2rem;
    color: var(--secondary-color);
  }
  
  @media (max-width: 992px) {
    .contact-content {
      grid-template-columns: 1fr;
    }
    
    .contact-info {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 576px) {
    .contact-info {
      grid-template-columns: 1fr;
    }
  }
</style> 