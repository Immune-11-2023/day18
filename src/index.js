// chartJs documentation: https://www.chartjs.org/docs/latest/

// Ejemplo de Grafico de barra

const initChartBar = () => {
  const ctx = document.getElementById('myChart');

  const labels = ['Red', 'Blue', 'Yellow', 'Orange', 'Purple', 'Orange'];
  const data = [100, 19, 3, 5, 2, 3];
  const label = 'Test';

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label,
          data,
        },
      ],
    },
  });
};

// initChartBar();

// Ejemplo de Grafico de linea

const initCharLinea = () => {
  const ctx = document.getElementById('myChart2');
  const companyName = companyData.companyName;

  companyData.financialData.dailyIncome.sort((a, b) => {
    return a.date.localeCompare(b.date);
  });

  const objData = {};

  companyData.financialData.dailyIncome.forEach(({ date, income }) => {
    // objData[date]
    if (objData[date]) {
      objData[date] += income;
    } else {
      objData[date] = income;
    }
  });

  console.log(objData);

  const labels = Object.keys(objData);
  const data = Object.values(objData);

  // Object.keys(objData).forEach((key) => {
  //   labels.push(key);
  //   data.push(objData[key]);
  // });

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: companyName,
          data: data,
        },
      ],
    },
  });
};

// initCharLinea();

// Uso de coindesk

// document.querySelector('#date-start')


const button = document.getElementById('click');

let chart;

button.addEventListener('click', (e) => {
  
  const date_start = document.getElementById('date-start').value;
  const date_end = document.getElementById('date-end').value;
  console.log(date_start);
  console.log(date_end);
  axios
  .get(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${date_start}&end=${date_end}&currency=EUR`
    )
    .then(({ data }) => {
      console.log(data);

      if (chart) {
        chart.destroy();
      }
      
      //Object.entries(obj) --> [key, value]
      
      // const [labels, data] = Object.entries(data.bpi).reduce((acc, e) => {
      //   const key = e[0];
      //   const value = e[1];

      //   acc[0].push(key);
      //   acc[1].push[value];
      //   return acc;
      // }, [[], []])

      const labels = Object.keys(data.bpi);
      const data2 = Object.values(data.bpi);

      const ctx = document.getElementById('myChart');

      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Chart',
              data: data2,
            },
          ],
        },
      });
    });
});
