const chartSeries = {
  gmv: [28, 35, 33, 42, 39, 48, 55],
  orders: [34, 30, 38, 44, 48, 46, 52],
  users: [24, 29, 31, 37, 45, 49, 58],
};

const tabs = document.querySelectorAll(".trend-tab");
const line = document.querySelector(".chart-line");
const area = document.querySelector(".chart-area");
const points = document.querySelector(".chart-points");

function createPath(values) {
  const width = 720;
  const height = 220;
  const max = 60;
  const step = width / (values.length - 1);
  const coordinates = values.map((value, index) => [
    Math.round(index * step),
    Math.round(height - (value / max) * height + 10),
  ]);

  const path = coordinates
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  return { path, coordinates };
}

function renderChart(series) {
  const { path, coordinates } = createPath(chartSeries[series]);
  line.setAttribute("d", path);
  area.setAttribute("d", `${path} L 720 230 L 0 230 Z`);
  points.innerHTML = coordinates
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"></circle>`)
    .join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderChart(tab.dataset.series);
  });
});

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".nav-item.active").classList.remove("active");
    item.classList.add("active");
  });
});

renderChart("gmv");
