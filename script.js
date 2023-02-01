/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
const datetimePicker = document.getElementById("endtime")
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 100 },
  { minDegree: 31, maxDegree: 60, value: 200 },
  { minDegree: 0, maxDegree: 30, value: 300 },
  { minDegree: 331, maxDegree: 360, value: 400 },
  { minDegree: 301, maxDegree: 330, value: 500 },
  { minDegree: 271, maxDegree: 300, value: 600 },
  { minDegree: 241, maxDegree: 270, value: 700 },
  { minDegree: 211, maxDegree: 240, value: 800 },
  { minDegree: 181, maxDegree: 210, value: 900 },
  { minDegree: 151, maxDegree: 180, value: 1000 },
  { minDegree: 121, maxDegree: 150, value: 1100 },
  { minDegree: 91, maxDegree: 120, value: 1200 },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You Have Won $${i.value} ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/*---------------- Get date and time -----------------*/
var endtime = 0;
datetimePicker.addEventListener("change", ()=>{
  endtime = datetimePicker.value
  text.innerHTML = `<p>Your spin will be end on ${endtime}</p>`;
})
/* --------------- Spinning Code --------------------- */
let rotationInterval;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  if(endtime == 0){
    text.innerHTML = `<p>Pick Date and Time please</p>`;
    spinBtn.disabled = false;
  }
  else{
    rotationInterval = window.setInterval(() => {
      spinChart.options.rotation = spinChart.options.rotation + Math.floor(Math.random() * 20);
      spinChart.update();
    }, 10);
  }
});
/* --------------- End Spin Wheel  --------------------- */

function checkEndtime(){
  currnetDate = new Date();
  endDate = new Date(endtime);
  setTimeout(checkEndtime, 1000);
  if(endtime != 0 && spinBtn.disabled == true && currnetDate.getTime() > endDate.getTime()){
    clearInterval(rotationInterval);
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    generateValue(randomDegree);
    spinChart.options.rotation = randomDegree;
    spinChart.update();
  }
}
checkEndtime()