const audio=document.getElementById('audio'),music=document.getElementById('music');audio.volume=.38;
function setMusic(){music.classList.toggle('playing',!audio.paused);music.setAttribute('aria-label',audio.paused?'播放背景音乐':'暂停背景音乐');music.querySelector('span').textContent=audio.paused?'音乐':'暂停'}
function toast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
async function play(){try{await audio.play();setMusic()}catch{toast('轻触右上角音乐按钮，即可播放')}}
music.onclick=()=>{if(audio.paused)play();else{audio.pause();setMusic()}};
document.getElementById('open').onclick=()=>{play();document.getElementById('invitation').scrollIntoView({behavior:'smooth'})};
const box=document.getElementById('lightbox');document.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>{document.getElementById('full').src=''+b.dataset.photo+'.jpg';box.showModal()});document.getElementById('close').onclick=()=>box.close();
const address='君心喜悦彭城盛宴宴会酒店 · 鎏金岁月厅\n泉山区湖北路与纺织东路交叉口南40米';
async function copy(text){try{await navigator.clipboard.writeText(text);toast('已复制，粘贴即可分享')}catch{const e=document.createElement('textarea');e.value=text;document.body.append(e);e.select();const ok=document.execCommand('copy');e.remove();toast(ok?'已复制':'请长按地址或浏览器链接复制')}}
document.getElementById('copy').onclick=()=>copy(address);
document.getElementById('share').onclick=async()=>{const data={title:'王海 & 李彤 · 婚礼邀请函',text:'2026年10月25日 11:58，诚邀您共同见证我们的幸福时刻。',url:location.href.split('#')[0]};if(navigator.share){try{await navigator.share(data)}catch(e){if(e.name!=='AbortError')copy(data.url)}}else copy(data.url)};
document.getElementById('calendar').onclick=()=>{const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//WangHaiLiTong//Wedding//CN','BEGIN:VEVENT','UID:wanghai-litong-20261025@wedding','DTSTAMP:20261005T000000Z','DTSTART:20261025T035800Z','DTEND:20261025T063000Z','SUMMARY:王海与李彤的婚礼','LOCATION:'+address.replace('\n',' · '),'DESCRIPTION:农历九月十六，诚邀您共同见证我们的幸福时刻。','END:VEVENT','END:VCALENDAR'].join('\r\n');const url=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='王海与李彤的婚礼.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('日历文件已生成，请打开添加；微信内可用浏览器打开')};
const days=Math.ceil((new Date('2026-10-25T11:58:00+08:00')-Date.now())/86400000);document.getElementById('countdown').textContent=days>0?'距离我们的婚礼，还有 '+days+' 天':'幸福的约定 · 2026.10.25';
