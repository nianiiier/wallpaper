document.addEventListener("DOMContentLoaded", function () {
    // 获取显示时间的元素
    const currentTimeElement = document.getElementById("currentTime");

    // 更新时间函数
    function updateClock() {
        const now = new Date(); // 获取当前时间
        const hours = now.getHours().toString().padStart(2, '0'); // 小时
        const minutes = now.getMinutes().toString().padStart(2, '0'); // 分钟
        const seconds = now.getSeconds().toString().padStart(2, '0'); // 秒钟

        // 构建时间字符串
        const timeString = `${hours}:${minutes}:${seconds}`;

        // 更新显示时间的元素内容
        currentTimeElement.textContent = timeString;
    }

    // 每秒更新一次时间
    setInterval(updateClock, 1000);

    // 页面加载时立即更新一次时间
    updateClock();
});

class Calendar {
  constructor() {
    const d = new Date();
    this.currentMonth = d.getMonth();
    this.currentYear = d.getFullYear();
    this.today = d.getDate();

    // 每小时更新一次日历
    setInterval(() => this.showCurrent(), 3600000);
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