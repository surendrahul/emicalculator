function changecolor(i){
	console.log(i);
	var elements = document.getElementsByClassName('loan_type');
		for(var j=0; j<elements.length; j++) { 
		  elements[j].style.backgroundColor='#0099C6';
		}
	document.getElementById(i).style.backgroundColor='#16D620';
	changerangeOfSlider(i);
	/*if(i=="personal_loans"){
		console.log("true")
	}*/
}
function changerangeOfSlider(v){
	if(v=='home_loan'){
		document.getElementById('input_range_intrest').max=20;
		document.getElementById('input_range_amount').max=20000000;
		document.getElementById('input_range_amount').step=100000;
		if(document.getElementById("rad1").checked){
			document.getElementById('input_range_time').max=30;
			document.getElementById('input_range_time').step=0.5;
		}
		else{
			document.getElementById('input_range_time').max=360;
			document.getElementById('input_range_time').step=1;
		}
		
	}
	else if(v=='car_loan'){
		document.getElementById('input_range_intrest').max=20;
		document.getElementById('input_range_amount').max=2000000;
		document.getElementById('input_range_amount').step=10000;
		if(document.getElementById("rad1").checked){
			document.getElementById('input_range_time').max=7;
			document.getElementById('input_range_time').step=0.5;
		}
		else{
			document.getElementById('input_range_time').max=84;
			document.getElementById('input_range_time').step=1;
		}
	}
	else{
		document.getElementById('input_range_intrest').max=25;
		document.getElementById('input_range_amount').max=1500000;
		document.getElementById('input_range_amount').step=10000;
		if(document.getElementById("rad1").checked){
			document.getElementById('input_range_time').max=5;
			document.getElementById('input_range_time').step=0.5;
		}
		else{
			document.getElementById('input_range_time').max=60;
			document.getElementById('input_range_time').step=1;
		}
	}
}

function calc_a(v) {
	document.getElementById('input_amount').value=v;
	document.getElementById('input_range_amount').value=v;
	calculate_emi();
}

function calc_i(v) {
	document.getElementById('input_intrest').value=v;
	document.getElementById('input_range_intrest').value=v;
	calculate_emi();
}
var m_count=0;
function loan_tenure_m(){
	if(y_count==1){
		y_count=0;
	}
	if (m_count==0){
		document.getElementById('input_range_time').max=60;
		document.getElementById('input_range_time').step=1;
		var val = document.getElementById('input_time').value;
		document.getElementById('input_time').value=val*12;
		document.getElementById('input_range_time').value=val*12;
	}
	m_count=1;
}
var y_count=0;
function loan_tenure_y(){

	if(m_count==1){
		m_count=0;
	
	}

	if (y_count==0) {
		console.log(y_count);
		document.getElementById('input_range_time').max=5;
		document.getElementById('input_range_time').step=0.5;
		var val = document.getElementById('input_time').value;
		document.getElementById('input_time').value=Math.ceil(val/12);
		document.getElementById('input_range_time').value=Math.ceil(val/12);
	}
	y_count=1;

}

function calc_t(v){
	document.getElementById('input_time').value=v;
	document.getElementById('input_range_time').value=v;
	calculate_emi();
}

function dd(){
	//var p = document.getElementById('input_amount').value;
	ddd =[[],[],[]];
	ddd[0][0]="amount split";
	ddd[0][1]="in rupees";
	ddd[1][0]="Principal";
	ddd[1][1]=principal*1;
	ddd[2][0]="Intrest";
	ddd[2][1]=intrest;
	//console.log(ddd);
}

//function defining to calculate EMI;

function calculate_emi(){
	
	p = document.getElementById('input_amount').value;
	r = (document.getElementById('input_intrest').value)/1200;
	if(document.getElementById("rad1").checked){
		var n = document.getElementById('input_time').value*12;
	}
	else{
		var n = document.getElementById('input_time').value;
	}
	e = Math.round(p*r*((Math.pow((1+r),n))/((Math.pow((1+r),n))-1)));

	principal=p;
	intrest=((n*e)-p);
	totalpay=n*e;
	document.getElementById("emi").innerHTML="₹ "+e;
	document.getElementById("total_int").innerHTML="₹ "+intrest;
	document.getElementById("total_pay").innerHTML="₹ "+totalpay;


	// Load google charts
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);


		create_table();
}

// Draw the chart and set the chart values
function drawChart() {
	dd();
  var data = google.visualization.arrayToDataTable(ddd);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Principal Intrest Slice', 'width':'100%', 'height':'100%', 'backgroundColor':'#EEEEEE'};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

function create_table(){
	document.getElementById('main_table').innerHTML="";

	if(document.getElementById("rad1").checked){
		var n = document.getElementById('input_time').value*12;
	}
	else{
		var n = document.getElementById('input_time').value;
	}

	var mon=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",]

	var dt = new Date();
	startyear=dt.getFullYear();
	startmonth=dt.getMonth();
		var c_year = document.createElement("tr");
			c_year.setAttribute("id","table_head");
			var adiv = document.createElement("td");
			adiv.setAttribute("id","table_head_y");
			adiv.innerText="Year";
			var bdiv = document.createElement("td");
			bdiv.setAttribute("id","table_head_p");
			bdiv.innerText="Principal";
			var cdiv = document.createElement("td");
			cdiv.setAttribute("id","table_head_i");
			cdiv.innerText="Intrest";
			var ddiv = document.createElement("td");
			ddiv.setAttribute("id","table_head_t");
			ddiv.innerHTML="Total Emi"
			var ediv = document.createElement("td");
			ediv.setAttribute("id","table_head_r");
			ediv.innerText="Remaining";
			c_year.appendChild(adiv);
			c_year.appendChild(bdiv);
			c_year.appendChild(cdiv);
			c_year.appendChild(ddiv);
			c_year.appendChild(ediv);
			document.querySelector('#main_table').appendChild(c_year);

		var c_year = document.createElement("tr");
			c_year.setAttribute("class","year_head");
			c_year.setAttribute("onclick","showmonth("+startyear+")");
			var adiv = document.createElement("td");
			adiv.innerHTML="<span class='plus'>  +  </span>"+startyear;
			var bdiv = document.createElement("td");
			bdiv.setAttribute("id","principal"+startyear);
			var cdiv = document.createElement("td");
			cdiv.setAttribute("id","intrest"+startyear);
			var ddiv = document.createElement("td");
			ddiv.setAttribute("id","totalemi"+startyear);
			var ediv = document.createElement("td");
			ediv.setAttribute("id","remaining"+startyear);
			c_year.appendChild(adiv);
			c_year.appendChild(bdiv);
			c_year.appendChild(cdiv);
			c_year.appendChild(ddiv);
			c_year.appendChild(ediv);
			document.querySelector('#main_table').appendChild(c_year);
		Remaining_p=p;
		var startingyear=startyear
		var year_wise_principal=0;
		var year_wise_intrest=0;
		var year_wise_emi=0;
	while (n>0){

		mon_pri=Math.ceil(e-(Remaining_p*r));
		var mdiv = document.createElement("tr");
			mdiv.setAttribute("class","tohide "+startingyear);
			var adiv = document.createElement("td");
			adiv.innerText=mon[startmonth];
			var bdiv = document.createElement("td");
			bdiv.innerText=mon_pri;
			var cdiv = document.createElement("td");
			cdiv.innerText=Math.ceil(Remaining_p*r);
			var ddiv = document.createElement("td");
			ddiv.innerText=e;
			var ediv = document.createElement("td");
			ediv.innerText=Remaining_p-mon_pri;

			mdiv.appendChild(adiv);
			mdiv.appendChild(bdiv);
			mdiv.appendChild(cdiv);
			mdiv.appendChild(ddiv);
			mdiv.appendChild(ediv);
			document.querySelector('#main_table').appendChild(mdiv);
			year_wise_principal+=mon_pri;
			year_wise_intrest+=Math.ceil(Remaining_p*r);
			year_wise_emi+=e;

			document.getElementById("principal"+startingyear).innerText=year_wise_principal;
			document.getElementById("intrest"+startingyear).innerText=year_wise_intrest;
			document.getElementById("totalemi"+startingyear).innerText=year_wise_emi;
			document.getElementById("remaining"+startingyear).innerText=Remaining_p-mon_pri;


			if(startmonth==11 && n!=1){
				var start=(startyear++)+1;
				var c_year = document.createElement("tr");
				c_year.setAttribute("class","year_head");
				c_year.setAttribute("onclick","showmonth("+start+")");
				var adiv = document.createElement("td");
				adiv.innerHTML="<span class='plus'>  +  </span>"+start;
				var bdiv = document.createElement("td");
				bdiv.setAttribute("id","principal"+start);
				var cdiv = document.createElement("td");
				cdiv.setAttribute("id","intrest"+start);
				var ddiv = document.createElement("td");
				ddiv.setAttribute("id","totalemi"+start);
				var ediv = document.createElement("td");
				ediv.setAttribute("id","remaining"+start);
				c_year.appendChild(adiv);
				c_year.appendChild(bdiv);
				c_year.appendChild(cdiv);
				c_year.appendChild(ddiv);
				c_year.appendChild(ediv);
				document.querySelector('#main_table').appendChild(c_year);
				
				year_wise_principal=0;
				year_wise_intrest=0;
				year_wise_emi=0;
				startmonth=0;
				startingyear++;
			}else{
				startmonth++;
			}
			
			Remaining_p=Remaining_p-mon_pri;

		n--;
	}
	drawstakedchart();
}
function showmonth(v){
	var show = document.getElementsByClassName(v);
	var item = show[0];
	if(item.style.display =='' || item.style.display=='none'){
		for (var i = 0; i < show.length; ++i) {
		    var item = show[i];  
		    item.style.display = 'table-row';
		}
	}
	else{
		for (var i = 0; i < show.length; ++i) {
		    var item = show[i];  
		    item.style.display = 'none';
		}
	}

}

function drawstakedchart(){
	var dat= new Date();
	var thisyear=dat.getFullYear();
	var dataforstack=[['Genre', 'Remaining Loan Amount','Intrest Paid']];
	for (var i = thisyear; i <= startyear; i++) {
		dataforstack.push([i.toString(),(document.getElementById('remaining'+i).innerText)*1,(document.getElementById('intrest'+i).innerText)*1]);
		//data.push(['k','i','j'])
	}
	//console.log(dataforstack);
	google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawStacked);

function drawStacked() {
      
      var data = google.visualization.arrayToDataTable(dataforstack);

      var options = {
        //width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
      };

      

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
}
