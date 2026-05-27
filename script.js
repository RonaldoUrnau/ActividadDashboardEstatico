const latitude = -27.37;
const longitude = -55.90;

let weatherData;


fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_days=3&timezone=auto`)
  .then(res => res.json())
  .then(data => {

    weatherData = data;

    updateCharts(0);

    document.getElementById("daySelector")
      .addEventListener("change", (e) => {

        updateCharts(parseInt(e.target.value));

      });
  });



// update charts


function updateCharts(dayIndex) {

  const times = weatherData.hourly.time;
  const temps = weatherData.hourly.temperature_2m;
  const humidity = weatherData.hourly.relative_humidity_2m;
  const wind = weatherData.hourly.wind_speed_10m;

  const start = dayIndex * 24;
  const end = start + 24;

  const dayHours = times.slice(start, end)
    .map(t => t.split("T")[1]);

  const dayTemps = temps.slice(start, end);
  const dayHumidity = humidity.slice(start, end);
  const dayWind = wind.slice(start, end);

  createTemperatureChart(dayHours, dayTemps);
  createHumidityChart(dayHours, dayHumidity);
  createWindChart(dayHours, dayWind);
}



// temperatura


function createTemperatureChart(hours, temps) {

  const chart = echarts.init(document.getElementById("chart1"));

  chart.setOption({

    backgroundColor: "#111",

    textStyle: {
      color: "#fff"
    },

    title: {
      text: "Temperatura",
      textStyle: {
        color: "#fff"
      }
    },

    tooltip: {
      trigger: "axis"
    },

    xAxis: {
      type: "category",
      data: hours,
      axisLabel: {
        color: "#fff"
      }
    },

    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fff"
      }
    },

    series: [{
      data: temps,
      type: "line",
      smooth: true,
      lineStyle: {
        width: 3
      }
    }]
  });
}



// humedad


function createHumidityChart(hours, humidity) {

  const chart = echarts.init(document.getElementById("chart2"));

  chart.setOption({

    backgroundColor: "#111",

    textStyle: {
      color: "#fff"
    },

    title: {
      text: "Humedad",
      textStyle: {
        color: "#fff"
      }
    },

    tooltip: {
      trigger: "axis"
    },

    xAxis: {
      type: "category",
      data: hours,
      axisLabel: {
        color: "#fff"
      }
    },

    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fff"
      }
    },

    series: [{
      data: humidity,
      type: "bar"
    }]
  });
}



// viento


function createWindChart(hours, wind) {

  const chart = echarts.init(document.getElementById("chart3"));

  chart.setOption({

    backgroundColor: "#111",

    textStyle: {
      color: "#fff"
    },

    title: {
      text: "Velocidad del viento",
      textStyle: {
        color: "#fff"
      }
    },

    tooltip: {
      trigger: "axis"
    },

    xAxis: {
      type: "category",
      data: hours,
      axisLabel: {
        color: "#fff"
      }
    },

    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fff"
      }
    },

    series: [{
      data: wind,
      type: "line",
      smooth: true
    }]
  });
}