// import './style.css'
import githubLogo from '../assets/logo-img/github.png'
import twitterLogo from '../assets/logo-img/twitter.png'

import { init } from './main.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <canvas id="canvas"></canvas>

  <section id="top">
    <h2>kagome</h2>
    <p>web developer in Japan</p>
    <div id="links">
      <a href="/">About</a>
      <a href="/">Products</a>
    </div>
    <div id="social-links">
      <a href="https://github.com/kagomen" title="GitHub" target="_blank" rel="noopener noreferrer">
        <img
          src="${githubLogo}" alt="github logo" />
      </a>
      <a href="https://twitter.com/kkagomme" title="Twitter" target="_blank" rel="noopener noreferrer">
        <img
          src="${twitterLogo}" alt="twitter logo" />
      </a>
    </div>
  </section>
</div>
`

window.addEventListener('load', () => {
  init();
});