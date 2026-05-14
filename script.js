let data = [];

// grafico 1
fetch("data/annual-co2-emissions-per-country.csv")
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);

    data = rows.map(r => {
      const c = r.split(",");
      return {
        entity: c[0],
        year: c[2],
        value: parseFloat(c[3])
      };
    }).filter(d => d.year && !isNaN(d.value));

    initFilter();
    updateChart("World");
  });

function initFilter() {
  const select = document.getElementById("country");
  const countries = [...new Set(data.map(d => d.entity))];

  countries.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });

  select.addEventListener("change", (e) => {
    updateChart(e.target.value);
  });
}

function updateChart(country) {
  const filtered = data.filter(d => d.entity === country);

  const years = filtered.map(d => d.year);
  const values = filtered.map(d => d.value);

  const chart1 = echarts.init(document.getElementById("chart1"));

  chart1.setOption({
    backgroundColor: "#111",
    textStyle: { color: "#fff" },
    title: { text: "CO2 por país", textStyle: { color: "#fff" } },
    tooltip: {},
    xAxis: {
      type: "category",
      data: years,
      axisLabel: { color: "#fff" }
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#fff" }
    },
    series: [{
      data: values,
      type: "line",
      smooth: true,
      lineStyle: { color: "#00ffcc" }
    }]
  });
}

//grafico 2
fetch("data/temperature-anomaly.csv")
  .then(r => r.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);

    const years = [];
    const temps = [];

    rows.forEach(r => {
      const c = r.split(",");
      if (c[0] === "World") {
        years.push(c[2]);
        temps.push(parseFloat(c[3]));
      }
    });

    const chart2 = echarts.init(document.getElementById("chart2"));

    chart2.setOption({
      backgroundColor: "#111",
      textStyle: { color: "#fff" },
      title: { text: "Temperatura global", textStyle: { color: "#fff" } },
      tooltip: {},
      xAxis: {
        type: "category",
        data: years,
        axisLabel: { color: "#fff" }
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#fff" }
      },
      series: [{
        data: temps,
        type: "line",
        smooth: true,
        lineStyle: { color: "#ffcc00" }
      }]
    });
  });

// grafico 3
fetch("data/co2-emissions-by-fuel-line.csv")
  .then(r => r.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);

    const years = [];
    const oil = [];
    const coal = [];
    const gas = [];

    rows.forEach(r => {
      const c = r.split(",");
      if (c[0] === "World") {
        years.push(c[2]);
        oil.push(parseFloat(c[3]) || 0);
        coal.push(parseFloat(c[4]) || 0);
        gas.push(parseFloat(c[6]) || 0);
      }
    });

    const chart3 = echarts.init(document.getElementById("chart3"));

    chart3.setOption({
      backgroundColor: "#111",
      textStyle: { color: "#fff" },
      title: { text: "CO2 por fuente", textStyle: { color: "#fff" } },
      tooltip: { trigger: "axis" },
      legend: { data: ["Oil", "Coal", "Gas"], textStyle: { color: "#fff" } },
      xAxis: {
        type: "category",
        data: years,
        axisLabel: { color: "#fff" }
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#fff" }
      },
      series: [
        { name: "Oil", data: oil, type: "line" },
        { name: "Coal", data: coal, type: "line" },
        { name: "Gas", data: gas, type: "line" }
      ],
      color: ["#00ffcc", "#ff4444", "#3399ff"]
    });
  });