(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`.context-menu`),t=document.querySelector(`#title`),n=document.querySelector(`#category`),r=document.querySelector(`#amount`),i=document.querySelector(`tbody`),a=document.querySelector(`form`),o=document.getElementById(`edit`),s=document.getElementById(`delete`);document.getElementById(`no-value`);var c=document.querySelector(`thead`),l=document.querySelector(`table`),u=null,d=null,f=`All`,p=[];function m(){return JSON.parse(localStorage.getItem(`expenses`))||[]}function h(e){return localStorage.setItem(`expenses`,JSON.stringify(e))}function g(e){let t=document.createElement(`tr`);t.innerHTML=`<th>Total</th>
                     <th></th>
                     <th>${e}</th>`,i.appendChild(t)}function _(){return p.length===0&&f!==`All`}function v(){return p.length>0&&f!==`All`}function y(e){i.innerHTML=``;let t=m(),n=0;t.length&&(l.style.backgroundColor=`#32e6e2`,c.innerHTML=`<tr>
              <th class='t'>Title</th>
              <th>
                <div class="dropdown">
                 <button class="dropdown-btn">
                  <span id="selectedText">${f}</span>
                  <span class="arrow">▼</span>
                </button>

             <div class="dropdown-menu">
               <div class="value">All</div>
               <div class="value">Grocery</div>
               <div class="value">Clothes</div>
               <div class="value">Bills</div>
               <div class="value">Education</div>
               <div class="value">Medicine</div>
             </ul>
            </div>
              </th>
              <th class="amount-column">
                <div>
                  <span>Amount</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    fill="white"
                    class="arrow up-arrow"
                  >
                    <title>Ascending</title>
                    <path
                      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    fill="white"
                    class="arrow down-arrow"
                  >
                    <title>Descending</title>
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </div>
              </th>
            </tr>`),p.length===0&&f!==`All`&&(i.innerHTML=`<tr>
    <td colspan="3" class="empty-message">
    <h3> There is no expenses! </h3>
    </td>
  </tr>`),e?e.forEach(e=>{n+=Number(e.amount),b(e)}):t.forEach(e=>{n+=Number(e.amount),b(e)}),n&&g(n)}y();function b(e){let t=document.createElement(`tr`);t.dataset.id=e.id,t.innerHTML=`<td>${e.title}</td>
                   <td>${e.category}</td>
                   <td>${e.amount}  <svg class="three-dots" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
</svg>

</td>`,i.append(t)}i.addEventListener(`contextmenu`,t=>{t.preventDefault(),d=t.target.closest(`tr`),d&&(d.querySelector(`th`)||d.querySelector(`h3`)||(e.style.top=`${t.pageY}px`,e.style.left=`${t.pageX}px`,e.classList.toggle(`show`)))}),document.addEventListener(`click`,()=>{e.classList.remove(`show`)}),o.addEventListener(`click`,e=>{d&&=(u=d.dataset.id,t.value=d.children[0].innerText,n.value=d.children[1].innerText,r.value=d.children[2].innerText,null)}),s.addEventListener(`click`,()=>{if(!d)return;let e=d.dataset.id;h(m().filter(t=>t.id!=e)),f!==`All`&&p.length?(p=p.filter(t=>t.id!=e),y(p)):y(),d=null}),a.addEventListener(`submit`,e=>{if(e.preventDefault(),!t.value.trim()||!n.value.trim()||!r.value.trim())return;r.value<=0&&alert(`Amount must be greater than 0`);let i={id:Number(new Date),title:t.value.trim(),category:n.value.trim(),amount:Number(r.value.trim())},o=m();if(u!==null){let e=o.findIndex(e=>e.id==u);if(o[e]=i,h(o),f!==`All`&&p.length){let e=p.findIndex(e=>e.id==u);p[e]=i,y(p)}else y();u=null,a.reset();return}else{o.push(i),h(o),y(),a.reset();return}}),document.addEventListener(`click`,t=>{let n=document.querySelector(`.dropdown`),r=t.target;if(n.contains(t.target)||n.classList.remove(`active`),r.matches(`.value`)){if(f=r.innerText,r.innerText===`All`){n.classList.remove(`active`),y();return}n.classList.remove(`active`);let e=m().filter(e=>e.category.toLowerCase()==f.toLowerCase());p=e,y(e);return}if(r.matches(`.dropdown-btn`)){n.classList.toggle(`active`);return}if(r.matches(`.three-dots`)){if(t.preventDefault(),d=r.closest(`tr`),!d||d.querySelector(`th`)||d.querySelector(`h3`))return;e.style.top=`${t.pageY-10}px`,e.style.left=`${t.pageX-15}px`,e.classList.toggle(`show`);return}if(r.matches(`.up-arrow`)){if(console.log(`upa`),_())return;if(v()){p=p.sort((e,t)=>e.amount-t.amount),y(p);return}h(m().sort((e,t)=>e.amount-t.amount)),y()}if(r.matches(`.down-arrow`)){if(console.log(`sdjah`),_())return;if(v()){p=p.sort((e,t)=>t.amount-e.amount),y(p);return}h(m().sort((e,t)=>t.amount-e.amount)),y()}});