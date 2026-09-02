# Stardew Birthday H5 Template

一个以“生日特别委托”为主线的星露谷像素风手机邀请函。页面包含镇长来信、动态季节日历、可勾选任务日志、星之果实餐吧菜单、互动送礼背包、巴士票与地图导航。只需修改一份配置，就能替换寿星、年龄、日期、地点和日程；仓库中的个人信息均为占位示例。

不想自己改代码？可直接使用 [交给 AI 的一键定制提示词](AI_SETUP_PROMPT.md)。

## 快速开始

需要 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

## 配置邀请函

打开 `app.js`，修改文件开头的 `birthdayConfig`：

```js
const birthdayConfig = {
  celebrant: '寿星姓名',
  age: 'XX',
  birthdayDate: '2030-10-01T18:00:00+08:00',
  dateDot: '2030 · 10 · 01',
  dateCn: '2030年10月1日 · 星期二',
  calendarDay: '01',
  calendarYear: '2030',
  season: '秋',
  venue: '示例市幸福区星露谷派对小屋',
  venueShort: '星露谷派对小屋',
  navigationUrl: 'https://uri.amap.com/search?keyword=...',
  schedule: [
    { label: '抵达鹈鹕镇', time: '待确认', description: '在派对小屋集合，领取今日任务' },
    { label: '点亮生日蜡烛', time: '待确认', description: '唱生日歌，见证寿星许下新愿望' },
    { label: '星之果实宴会', time: '待确认', description: '分享蛋糕、游戏和当日限定菜单' },
    { label: '保存快乐存档', time: '待确认', description: '拍下全员合影，完成特别委托' },
  ],
}
```

`birthdayDate` 请保留 `+08:00` 以使用中国时区。地图链接推荐使用：

```text
https://uri.amap.com/search?keyword=<地点>&src=stardew-birthday&callnative=1
```

## 分享信息与背景音乐

发布前同步修改 `index.html` 中的标题和分享描述，以及 `assets/share-cover.svg` 中的寿星、年龄和日期。

如有已授权音乐，可替换 `assets/birthday-bgm.mp3`。手机及微信通常禁止自动播放，访客需点击右下角音乐按钮。

## 构建与发布

```bash
npm run build
```

构建结果位于 `dist/`，可部署到 GitHub Pages、Vercel、Cloudflare Pages 或任意静态网站服务。发布前请检查姓名、年龄、日期、地点、日程、地图链接及分享信息，并在 375px 至 430px 宽的手机视口预览。

## 授权与素材

- HTML、CSS 和 JavaScript 代码使用 MIT 许可证，见 `LICENSE`。
- Fusion Pixel Font 使用 OFL-1.1，见 `assets/fonts/OFL-Fusion-Pixel.txt`。
- 星露谷相关素材不属于 MIT 授权范围，相关权利归 ConcernedApe 及各自权利人所有。本项目为非官方粉丝创作，请自行确认公开发布、再分发和商业使用的授权边界。
