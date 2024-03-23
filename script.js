document.addEventListener("DOMContentLoaded", function () {
  //时间显示
  let clock = new Clock();
  setInterval(() => {
    clock.updateClock()
  }, 1000);

  // 日历
  let calendar = new Calendar();
  setInterval(() => {
    calendar.update();
    calendar.showCurrent();
  }, 3600000); // 1小时

  // 进度条
  let progressBar = new CuteProgressBar();
  setInterval(() => {
    progressBar.updateProgress()
    progressBar.init()
  }, 1000);

});

// 日历
class Calendar {
  constructor() {
    this.update();
    this.showCurrent();
  }
  update() {
    const d = new Date();
    this.currentMonth = d.getMonth();
    this.currentYear = d.getFullYear();
    this.today = d.getDate();
  }

  showCurrent() {
    const calendarDiv = document.getElementById('calendar');
    const date = new Date(this.currentYear, this.currentMonth, 1);
    let html = '<table>';

    // 添加星期标题
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    html += '<tr>';
    for (let day of days) {
      html += `<th>${day}</th>`;
    }
    html += '</tr>';

    // 添加日期
    while (date.getMonth() === this.currentMonth) {
      html += '<tr>';
      for (let i = 0; i < 7; i++) {
        if (date.getDay() === i && date.getMonth() === this.currentMonth) {
          html += date.getDate() === this.today ? `<td class="current-day"><b>${date.getDate()}<b></td>` : `<td>${date.getDate()}</td>`;
          date.setDate(date.getDate() + 1);
        } else {
          html += '<td></td>';
        }
      }
      html += '</tr>';
    }

    html += '</table>';
    calendarDiv.innerHTML = html;
  }
}

// 进度条
class CuteProgressBar {
  constructor() {
    //获取进度条和进度文本元素
    this.progressBar = document.getElementById("progressBar");
    this.progressLabel = document.getElementById("progressLabel");
    // 更新进度
    this.updateProgress();
  }

  init() {
    // 监听鼠标移入事件
    this.progressBar.addEventListener('mouseenter', () => {
      this.resetProgress();

    });

    // 监听鼠标移动事件
    this.progressBar.addEventListener('mousemove', () => {
    this.updateProgress();
  });
  }

  // 这个函数由于updateProgress调用
  getTodayProgress() {
    const now = new Date();
    // 获取今天开始的时间
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const progress = (now - startOfDay) / millisecondsInDay * 100;

    // 返回进度，最大为100%
    return Math.min(progress, 100);
  }

  updateProgress() {
    // 获取今天已经过去的时间的百分比
    const progress = this.getTodayProgress();

    //更新进度条和进度文本
    this.progressBar.style.width = progress + "%";
    this.progressLabel.textContent = progress.toFixed(2) + "%";
  }

  // 重置进度条
  resetProgress() {
    this.progressBar.style.width = '0%';
  }
}

// 时间显示
class Clock {
  constructor() {
      // 获取显示时间的元素
      this.currentTimeElement = document.getElementById("currentTime");
      this.updateClock();
  }

  // 更新时间函数
  updateClock() {
      const now = new Date(); // 获取当前时间
      const hours = now.getHours().toString().padStart(2, '0'); // 小时
      const minutes = now.getMinutes().toString().padStart(2, '0'); // 分钟
      const seconds = now.getSeconds().toString().padStart(2, '0'); // 秒钟

      // 构建时间字符串
      const timeString = `${hours}:${minutes}:${seconds}`;

      // 更新显示时间的元素内容
      this.currentTimeElement.textContent = timeString;
  }
}