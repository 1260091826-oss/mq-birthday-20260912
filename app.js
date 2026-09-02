const birthdayConfig = {
  celebrant: '寿星', age: 'XX',
  birthdayDate: '2030-10-01T18:00:00+08:00', dateDot: '2030 · 10 · 01',
  dateCn: '2030年10月1日 · 星期二', calendarDay: '01', calendarYear: '2030', season: '秋',
  venue: '示例市幸福区星露谷派对小屋', venueShort: '星露谷派对小屋',
  navigationUrl: 'https://uri.amap.com/search?keyword=%E7%A4%BA%E4%BE%8B%E5%B8%82%E5%B9%B8%E7%A6%8F%E5%8C%BA%E6%98%9F%E9%9C%B2%E8%B0%B7%E6%B4%BE%E5%AF%B9%E5%B0%8F%E5%B1%8B&src=stardew-birthday&callnative=1',
  schedule: [
    { label: '抵达鹈鹕镇', time: '待确认', description: '在派对小屋集合，领取今日任务' },
    { label: '点亮生日蜡烛', time: '待确认', description: '唱生日歌，见证寿星许下新愿望' },
    { label: '星之果实宴会', time: '待确认', description: '分享蛋糕、游戏和当日限定菜单' },
    { label: '保存快乐存档', time: '待确认', description: '拍下全员合影，完成特别委托' },
  ],
}

const values = { ...birthdayConfig }
document.querySelectorAll('[data-content]').forEach((el) => {
  const key = el.dataset.content
  if (key in values && key !== 'schedule') el.textContent = values[key]
  if (key === 'navigationLink') el.href = birthdayConfig.navigationUrl
})

const target = new Date(birthdayConfig.birthdayDate)
document.querySelector('#days-count').textContent = Math.max(0, Math.ceil((target - Date.now()) / 86400000))

const grid = document.querySelector('#calendar-grid')
const year = target.getFullYear(), month = target.getMonth(), eventDay = target.getDate()
const offset = (new Date(year, month, 1).getDay() + 6) % 7
const total = new Date(year, month + 1, 0).getDate()
for (let i = 0; i < offset; i += 1) grid.append(document.createElement('i'))
for (let day = 1; day <= total; day += 1) {
  const cell = document.createElement(day === eventDay ? 'button' : 'span')
  cell.textContent = day
  if (day === eventDay) { cell.className = 'birthday-day'; cell.setAttribute('aria-label', `生日派对，${day}日`); cell.innerHTML += '<b>★</b>' }
  grid.append(cell)
}

const questList = document.querySelector('[data-content="schedule"]')
birthdayConfig.schedule.forEach((item, index) => {
  const row = document.createElement('button')
  row.type = 'button'; row.className = 'quest-row'
  row.innerHTML = `<i></i><span><b>${item.label}<small>${item.time}</small></b><em>${item.description}</em></span>`
  row.addEventListener('click', () => { row.classList.toggle('done'); updateQuest() })
  questList.append(row)
})
function updateQuest() {
  const done = document.querySelectorAll('.quest-row.done').length
  document.querySelector('#quest-count').textContent = `${done} / ${birthdayConfig.schedule.length}`
  document.querySelector('#quest-progress').style.width = `${done / birthdayConfig.schedule.length * 100}%`
}

let gifted = false
document.querySelectorAll('[data-gift]').forEach((button) => button.addEventListener('click', () => {
  gifted = true
  document.querySelectorAll('[data-gift]').forEach((item) => item.classList.remove('selected'))
  button.classList.add('selected')
  document.querySelector('#heart-meter').textContent = '♥ ♥ ♥ ♥ ♥'
  document.querySelector('#gift-reaction').textContent = `“哇！${button.dataset.gift}，这是我最喜欢的！” 友情 +640`
}))

document.querySelectorAll('[data-scroll]').forEach((button) => button.addEventListener('click', () => document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' })))
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const reveal = document.querySelectorAll('.reveal')
if (!reduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }), { threshold: .12 })
  reveal.forEach((el) => observer.observe(el))
} else reveal.forEach((el) => el.classList.add('visible'))

const music = document.querySelector('#birthday-music'), musicButton = document.querySelector('#music-toggle')
music.volume = .22
musicButton.addEventListener('click', async () => {
  if (music.paused) { try { await music.play(); musicButton.classList.add('playing'); musicButton.setAttribute('aria-pressed', 'true') } catch {} }
  else { music.pause(); musicButton.classList.remove('playing'); musicButton.setAttribute('aria-pressed', 'false') }
})
