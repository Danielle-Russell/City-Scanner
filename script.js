//fetch request template function 
function fetchRequest(url, options, successCallback) {
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        ;
        return response.json();
      }

      throw new Error("Something went wrong");
    })
    .then(responseJSON => successCallback(responseJSON))
    .catch(err => console.log("error"));

}

//fetch url for covid data
function covidURL(stateInput) {

  return `https://api.covidtracking.com/v1/states/${stateInput}/current.json`;

}

let covidOptions = {

  method: 'GET',
  redirect: 'follow'
}

function displayCovid(responseJson) {

  new Chart(document.getElementById("covidChart"), {

    type: 'horizontalBar',
    data: {
      labels: ["Positive Cases", "Number Hospitalized", "Number of Deaths"],
      datasets: [
        {
          label: "Number of COVID-19 Cases",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
          data: [responseJson.positive, responseJson.hospitalizedCurrently, responseJson.death]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: `Number of positive COVID-19 Cases in ${responseJson.state} as of ${responseJson.date}`
      }
    }
  });

}


//URL for fetch request, for state FBI data
function fbiURL(stateInput) {

  return `https://api.usa.gov/crime/fbi/sapi/api/summarized/estimates/states/${stateInput}/2018/2018?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv`;

}

//URL for fetch request, for national FBI data
function fbiNationalURL(stateInput) {

  return `https://api.usa.gov/crime/fbi/sapi/api/summarized/estimates/national/2018/2018?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv`;

}

//Headers for FBI fetch request
let fbiOptions = {
  method: 'GET',
  redirect: 'follow'
}

//Constructs pie chart
function displayGraph(responseJson) {

  $("#submit").on('click', function () {
    myPie.destroy();
  })

  var canvas = document.getElementById("pieChart");

  var ctx = canvas.getContext('2d');

  let crimes = responseJson.results[0]

  let violentCrime = crimes.violent_crime + crimes.rape_revised + crimes.aggravated_assault

  let percent = violentCrime + crimes.homicide + crimes.robbery + crimes.property_crime + crimes.burglary + crimes.larceny + crimes.motor_vehicle_theft + crimes.arson

  var data = {
    labels: ["Homicide", "Violent Crimes", "Robbery", "Property Crime", "Burglary", "Larceny", "Motor Vehicle Theft", "Arson"],
    datasets: [
      {
        fill: true,
        backgroundColor: [
          '#52D726',
          '#FFEC00',
          '#FF7300',
          '#FF0000',
          '#007ED6',
          'orange',
          '#5E548E',
          '#3F88C5'
        ],
        data: [crimes.homicide, violentCrime, crimes.robbery, crimes.property_crime, crimes.burglary, crimes.larceny, crimes.motor_vehicle_theft, crimes.arson],

        borderColor: ['white'],
        borderWidth: [2, 2]
      }
    ]
  };


  var options = {
    title: {
      display: true,
      text: `State Crime Rate: ${(percent / (crimes.population) * 100).toFixed(2)}%`,
      position: 'bottom'
    },
    rotation: -0.7 * Math.PI
  };

  var myPie = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
  });
}

//Constructs second pie chart
function displayFBI(responseJson) {

  var canvas = document.getElementById("secondPieChart");

  var ctx = canvas.getContext('2d');

  let crimes = responseJson.results[0];

  let violentCrime = crimes.violent_crime + crimes.rape_revised + crimes.aggravated_assault;

  let percent = violentCrime + crimes.homicide + crimes.robbery + crimes.property_crime + crimes.burglary + crimes.larceny + crimes.motor_vehicle_theft + crimes.arson;

  var data = {
    labels: ["Homicide", "Violent Crimes", "Robbery", "Property Crime", "Burglary", "Larceny", "Motor Vehicle Theft", "Arson"],
    datasets: [
      {
        fill: true,
        backgroundColor: [
          '#52D726',
          '#FFEC00',
          '#FF7300',
          '#FF0000',
          '#007ED6',
          'orange',
          '#5E548E',
          '#3F88C5'
        ],
        data: [crimes.homicide, violentCrime, crimes.robbery, crimes.property_crime, crimes.burglary, crimes.larceny, crimes.motor_vehicle_theft, crimes.arson],

        borderColor: ['white'],
        borderWidth: [2, 2]
      }
    ]
  };


  var options = {
    title: {
      display: true,
      text: `National Crime Rate: ${(percent / (crimes.population) * 100).toFixed(2)}%`,
      position: 'bottom'
    },
    rotation: -0.7 * Math.PI
  };



  var pie = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
  });
}

//Census variables 

//URL for fetch, for city census data 
function censusURL(input) {
  //city name, mean income, unemployment rate, high school enrollment % (public), %private school,bachelors degree,median age, male to female ratio,  median house price(occupied by owner ), median real estate tax responseJSON[9] city[10], average rental cost response[10]city[11], population

  let params = `NAME,S1901_C01_013E,S2301_C04_001E,S1401_C04_007E,S1401_C06_007E,S1501_C02_005E,S0101_C01_032E,S0101_C01_033E,S2506_C01_009E,S2507_C01_058E,S2503_C05_024E,S0101_C01_001E`;

  return `https://api.census.gov/data/2018/acs/acs1/subject?get=${params}&for=place:*&in=state:${input}&key=4877574e295661a3792cd99bcb3d358bbffaf039`;
}

//All census headers

let censusOptions = {
  method: 'GET',
  redirect: 'follow'
}

//URL for fetch, for state census data 
function censusStateURL(input) {

  let params = `NAME,S1901_C01_013E,S2301_C04_001E,S1401_C04_007E,S1401_C06_007E,S1501_C02_005E,S0101_C01_032E,S0101_C01_033E,S2506_C01_009E,S2507_C01_058E,S2503_C05_024E,S0101_C01_001E`;

  return `https://api.census.gov/data/2018/acs/acs1/subject?get=${params}&for=state:${input}&key=4877574e295661a3792cd99bcb3d358bbffaf039`;
}

//URL for fetch, for national census data 
function censusNationURL(input) {

  let params = `NAME,S1901_C01_013E,S2301_C04_001E,S1401_C04_007E,S1401_C06_007E,S1501_C02_005E,S0101_C01_032E,S0101_C01_033E,S2506_C01_009E,S2507_C01_058E,S2503_C05_024E,S0101_C01_001E`;

  return `https://api.census.gov/data/2018/acs/acs1/subject?get=${params}&for=us:1&key=4877574e295661a3792cd99bcb3d358bbffaf039`;
}

//Display crime stats
function displayCensus(responseJson) {

  //ensure city select is empty before submitting
  $("#select").empty();

  populateSelect(responseJson);


}
function displayFBIResults(responseJson) {

  displayGraph(responseJson);

}

function displayNational(responseJson) {

  populateNation(responseJson);
}
//Populates every result div with census info on national averages
function populateNation(responseJson) {
  let separator = parseFloat(responseJson[1][1]).toLocaleString('en');
  let secondSeparator = parseFloat(responseJson[1][8]).toLocaleString('en');
  let thirdSeparator = parseFloat(responseJson[1][10]).toLocaleString('en');
  let fourthSeparator = parseFloat(responseJson[1][9]).toLocaleString('en');
  let fifthSeparator = parseFloat(responseJson[1][11]).toLocaleString('en');

  let string = "<h3> Compare to the National Average: ";

  $(".item1 ol").append(`</h3>${string}${responseJson[1][3]}%`);
  $(".item2 ol").append(`</h3>${string}${responseJson[1][4]}%`);
  $(".item3 ol").append(`</h3>${string}${responseJson[1][5]}%`);
  $(".item4 ol").append(`</h3>${string}$${separator}`);
  $(".item5 ol").append(`</h3>${string}${responseJson[1][2]}%`);
  $(".demo1 ol").append(`</h3>${string}${responseJson[1][6]} years`);
  $(".demo2 ol").append(`</h3>${string}${responseJson[1][7]} Males : 100 Females`);
  $(".demo3 ol").append(`</h3>${string}${fifthSeparator}`);
  $(".house1 ol").append(`</h3>${string}$${secondSeparator}`);
  $(".house2 ol").append(`</h3>${string}$${thirdSeparator}`);
  $(".house3 ol").append(`</h3>${string}$${fourthSeparator}`);
}

//Populates dropdown menu with cities based on state selection
function populateSelect(responseJson) {
  //Removes the title array in the response, so "NAME" is not populated in dropdown menu
  responseJson.shift(responseJson[0]);
  //Alphabetizes menu
  responseJson.sort();

  for (let i = 0; i < responseJson.length; i++) {

    $('#select').append(

      $('<option></option>').val(responseJson[i]).text(responseJson[i][0]));
  }

  $("#selectForm").removeClass('hide');
  $('#submit').text("Submit")
}


//Listens for submit event on state selection    
function watchForm() {

  $('#states').on('submit', event => {

    event.preventDefault();

    $('#submit').text("Please wait...")
    //Defines input as the value of the state selection

    let input = $("#selectState option:selected").val();

    //Defines state input as the label value of the state selection


    let stateInput = $("#selectState option:selected").text();
    //if user makes no selection
    if (input === "") {

      alert("Please make a valid selection");

      $('#submit').text("Submit");

      $('#selectForm').hide();
    } else {
      $('#selectForm').show();
    }

    $(".empty").empty();

    //Calls on functions 
    callFetch(input, stateInput);

    $("#results-container").addClass('hide');

  })
}


//Initializes fetch request for every API
function callFetch(input, stateInput) {

  fetchRequest(censusURL(input), censusOptions, displayCensus);

  fetchRequest(fbiURL(stateInput), fbiOptions, displayFBIResults);

  fetchRequest(censusStateURL(input), censusOptions, displayState);

  fetchRequest(censusNationURL(input), censusOptions, displayNational);

  fetchRequest(fbiNationalURL(stateInput), fbiOptions, displayFBI);

  fetchRequest(covidURL(stateInput), covidOptions, displayCovid);

}

//Event listener form for city selection submit button
function watchSubmit(responseJson) {

  $('#selectForm').on('submit', event => {

    event.preventDefault();

    handleResponse(responseJson);

    $("#results-container").removeClass("hide");

    $("#selectForm").addClass('hide');

    let limiter = 768;
    //Adjusts scroll depending on device width
    if ($(window).width() >= limiter) {

      window.scroll({
        top: 800,
        behavior: 'smooth'
      });

    } else {

      window.scroll({
        top: 600,
        behavior: 'smooth'
      });
    }
  })
}

//
function handleResponse(responseJson) {

  let city = ''

  $.each($("#selectForm option:selected"), function () {

    city = $(this).val().split(',');
  })
  populateEducation(city);
}


//Populates education div with census info
function populateEducation(city) {

  //formats number
  let separator = parseFloat(city[2]).toLocaleString('en');

  $('.item1 ul').append(`

<h2>${city[4]}% of students were enrolled in a public high school</h2>

   `)

  $(".item2 ul").append(`

  <h2>${city[5]}% of students were enrolled in a private high school</h2>
  
  `)

  $('.item3 ul').append(`

  <h2>${city[6]}% of people (24yrs+) have a Bachelors degree, or higher</h2>
  
  `)

  $('.item4 ul').append(`

   <h2>The Mean Family Income: $${separator}</h2>

  `)

  //Turns unemployment rate string into float, so negative number glitches can be identified and taken out (replaced)

  let response = parseFloat(city[3])

  if (response < 0) {

    $(".item5 ul").append(`
    <h2 style="font-style: italic">Sorry, this information is unavailable.</h2>
    `)

  } else if (response >= 0) {

    $(".item5 ul").append(`
    
    <h2>The Unemployment Rate (16yrs+): ${response}%</h2>
    
    `)
  }

  populateDemo(city);
}

function displayState(responseJson) {

  stateAverage(responseJson);

}

//Populates every result div with census info on all states
function stateAverage(responseJson) {
  let separator = parseFloat(responseJson[1][1]).toLocaleString('en');
  let secondSeparator = parseFloat(responseJson[1][8]).toLocaleString('en');
  let thirdSeparator = parseFloat(responseJson[1][10]).toLocaleString('en');
  let fourthSeparator = parseFloat(responseJson[1][9]).toLocaleString('en');
  let fifthSeparator = parseFloat(responseJson[1][11]).toLocaleString('en');

  let string = "<h3>Compare to the state average: ";

  $('#heading').append(`COVID-19 in ${responseJson[1][0]}`);
  $(".item1 ol").append(`</h3>${string}${responseJson[1][3]}%`);
  $(".item2 ol").append(`</h3>${string}${responseJson[1][4]}%`);
  $(".item3 ol").append(`</h3>${string}${responseJson[1][5]}%`);
  $(".item4 ol").append(`</h3>${string}$${separator}`);
  $(".item5 ol").append(`</h3>${string}${responseJson[1][2]}%`);
  $(".demo1 ol").append(`</h3>${string}${responseJson[1][6]} years`);
  $(".demo2 ol").append(`</h3>${string}${responseJson[1][7]} Males : 100 Females`);
  $(".demo3 ol").append(`</h3>${string}${fifthSeparator}`);
  $(".house1 ol").append(`</h3>${string}$${secondSeparator}`);
  $(".house2 ol").append(`</h3>${string}$${thirdSeparator}`);
  $(".house3 ol").append(`</h3>${string}$${fourthSeparator}`);
}

//Populates demographics div with census info
function populateDemo(city) {

  let population = parseFloat(city[12]).toLocaleString('en');

  $('.demo1 ul').append(`
    <h2>The Median Age: ${city[7]} years</h2>
    `)

  $('.demo2 ul').append(`
    <h2>There are ${city[8]} Males: 100 Females</h2>
    `)

  $('.demo3 ul').append(`
    <h2>The Current Population: ${population}</h2>
    `)

  populateHousing(city);
}

//Populates housing div with census info
function populateHousing(city) {
  let separator = parseFloat(city[9]).toLocaleString('en');
  let secondSeparator = parseFloat(city[10]).toLocaleString('en');
  let thirdSeparator = parseFloat(city[11]).toLocaleString('en');
  $('#education').append(`Education in ${city[0]}`);
  $('#employ').append(`Income and Employment in ${city[0]}`);
  $('#demos').append(`Demographics in ${city[0]}`);
  $('#house').append(`Housing in ${city[0]}`);

  $('.house1 ul').append(
    `
    <h2>The Median House Price: $${separator}</h2>`)

  $('.house2 ul').append(
    `
    <h2>The Average Monthly Rental Cost: $${thirdSeparator}</h2>
    `)
  $('.house3 ul').append(
    `<h2> The Median Real Estate Tax: $${secondSeparator} anually</h2>
    `
  )
}


$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  watchSubmit();
});
