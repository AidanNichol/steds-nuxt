/* jscs: disable */
/* eslint-disable */

let yxml;
let wxml;
let xhReq;
let checkForOutputID;
let finishedOutput;
let outputProgress;
// let form_changed;
let changes;
$(document).ready(function() {

  // Open the DataYears.xml file

	$.getJSON("/genmap/getYears",{},function(years){
        $('#years').empty();
        $(years).each(function(i,yr) {
            if (i==0)yr1=yr;
            $('#years').get(0).add( new Option(yr, yr), document.all ? 0 : null);
        });
        $('#years').change(function(){GetYearsWalks($(this).val());});
        $('#walks').change(function(){GetWalkData($(this).val());});
        $('#next').click(function(){nextWalk(); });
        $('#prev').click(function(){prevWalk(); });
        $('#first').click(function(){firstWalk(); });
        $('#last').click(function(){lastWalk(); });
        $('#details input').change(function(){
            changes[$(this).attr('name')]=$(this).val();
        });
        $('#updatemap').click(function(){updateMap(); });
        $('#uploadwalk').click(function(){uploadWalk(); });
        $('#savedata').click(function(){saveData(); });
        $('#copyfinish').click(function(){
                v = $('input[name=area]').val();
                $('input[name=finish]').val(v);
                changes['finish'] = v;
        });
		// Build an HTML string
        $(".col input").wrap('<div class="width-1of1 field"></div>');
        $(".col input").each(function(i, v){
          x = v.getAttribute("name");
          //v.setAttribute("type", "text");
          $(v).before('<span>'+v.getAttribute("name")+'</span>');
        });
        tr = $("#W1");
        txt = tr[0].innerHTML;
        $("#tbody").append('<tr id="W2" class="route">'+txt+'</tr>');
        $("#tbody").append('<tr id="W3" class="route">'+txt+'</tr>');
        $("#tbody").append('<tr id="W4" class="route">'+txt+'</tr>');
        $("#tbody").append('<tr id="W5" class="route">'+txt+'</tr>');
        $('#tbody .route').change(function(){
            //updateLeader($(this, "input.no").val(), $(this, "input.leader").val());
            updateLeader(this);
        });
        yr = yr1;
        GetYearsWalks(yr);

	});
});
function updateLeader(tr){
    no = $(tr).find(".no").val();
    leader = $(tr).find(".leader").val();
  dt = $("#walks").val();
  setupOutput();
  xhReq = $.get("/genmap/updateWalkLeader/"+dt+"/"+no+"/",{'leader':leader},function(out){
      finishedOutput = true;
    $('#output').html( out);
  });
}
function uploadWalk(){
  dt = $("#walks").val();
  setupOutput();
  xhReq = $.post("/genmap/uploadWalkToWeb/"+dt+"/",{},function(out){
      finishedOutput = true;
    $('#output').html( out);
  });
  checkForOutputID = setInterval("checkForOutput()", 100);
}
function setupOutput()
{
    finishedOutput = false;
    $('#output').empty();
    // $('#update').html('<img src="/images/gears.svg" />');
    $('#update').html('<img src="/images/gears.svg" /><img src="/images/infinity.gif" /><img src="/images/dashinfinity.gif" /><img src="/images/reload.svg" /><img src="/images/spin.svg" />');
    // $('#update').empty();
    outputProgress = ".";
}
function checkForOutput()
{
    outputProgress += ".";

    if (finishedOutput)
    {
        clearInterval(checkForOutputID);
        outputProgress = "";
        $('#update').html("Done");
    }
    else
    {
        $('#output').html(xhReq.responseText.replace(/[\r\n]+/g, "<br/>"));
        // $('#update').html(outputProgress);
    }
}


function updateMap()
{
    if (changes!=null) saveData();
    setupOutput();
    //$('#showmap').attr("src", "/images/updatingmap.jpg");
    $('#embedmap').attr("data", "/images/updatingmap.pdf");
    dt = $("#walks").val();
    yr = dt.substr(0,4);
    fil = '/genmap/UpdateMap/'+dt+'/';
    //$('#showmap').load(fil);
    finishedOutput = false;
    dt = $("#walks").val();
    xhReq = $.post(fil,{},function(out){
        finishedOutput = true;
        tim = new Date();
        //wxml.walkDetails.img = wxml.walkDetails.img.replace(/[\.]...$/, ".pdf");
        img = wxml.walkDetails.img;
        $('#embedmap').attr("data", img+'?time='+tim.getTime());
        //$('#showmap').attr("src", wxml.walkDetails.img+'?time='+tim.getTime());
        $('#output').html( out.replace(/[\r\n]+/g, "<br/>"));
        $('#update').html("Done");
    });
    checkForOutputID = setInterval("checkForOutput()", 100);
}
function checkForUpdateOutput()
{
    $('#output').html(xhReq.responseText);
    if (finishedOutput) clearInterval(checkForOutputID);
}
function GetYearsWalks(yr)
{
  let dt1;
  fil = "/genmap/GetYearsDataIndex/"+yr+"/"
  $.getJSON(fil,{},function(xmlw){
      yxml = xmlw;
      $('#walks').empty();
      $(xmlw).each(function(ii,xx) {
           dt = xx.date;
           if (ii == 0) GetWalkData(dt);
           nm = dt+" "+xx.area;
           $('#walks').append('<option value="'+dt+'">'+nm+'</option>');
           //$('#walks').get(0).add( new Option(nm, dt),document.all ? 0 : null);
      });

  });
}
function nextWalk()
{
    s =  $('#walks').get(0);
    i = s.selectedIndex;
    if (i+1 < s.length)
    {
        s.selectedIndex = i+1;
        GetWalkData(s.value);
    }
}
function prevWalk()
{
    s =  $('#walks').get(0);
    i = s.selectedIndex;
    if (i > 0)
    {
        s.selectedIndex = i-1;
        GetWalkData(s.value);
    }
}
function firstWalk()
{
    s =  $('#walks').get(0);
    s.selectedIndex = 0;
    GetWalkData(s.value);
}
function lastWalk()
{
    s =  $('#walks').get(0);
    s.selectedIndex = s.length-1;
    GetWalkData(s.value);
}

function saveData(){
    $('#output').empty();
    for(let e in changes)
    {
        if(changes.hasOwnProperty(e))
        {
            $('#output').empty();
            dt = $("input[name=date]").val();
            let datastring = $.toJSON(changes);
            //$.post('/genmap/putWalkDetails/'+dt, {data: datastring}, function(out){
            //      $('#output').html( out);
            //      changes = new Object();
            //});
            let out = $.ajax({type:'POST', url:'/genmap/putWalkDetails/'+dt, data:{data: datastring}, async:false}).responseText;
                //success:function(out){
                  $('#output').html( out);
                  changes = new Object();
            //}});
            break;
        }
    }
}
function GetWalkData(dt)
{
    $('#output').empty();
    if (changes!=null) saveData();
    $('#update').empty();
    changes = new Object();
    $.getJSON("/genmap/getWalkData/"+dt, function(xmld){
        wxml = xmld;
        $('#walkdata').clearForm();
        $.each(xmld.walkDetails, function(nm,val)
        {
            //$('#'+nm).val(val);
            $('input[name='+nm+']').val(val);
        });
        j=1;
        $.each(xmld.routes, function(i,node){
            $('#W'+j).show();
            $.each(node, function(nm,val){
                $('#W'+j+" ."+nm).val(val);
            });
            j++;
        });
        while(j<6){$('#W'+j++).hide();}
        if (xmld.walkDetails.orientation == null)xmld.walkDetails.orientation="portrait";
        let O = xmld.walkDetails.orientation.substr(0,1).toUpperCase();
        tim = new Date();
        let w = $(window).width()-550;
        $('#embedmap').attr("data", wxml.walkDetails.img+'?time='+tim.getTime()).
                        attr('height', O=='P'? w*1.35:w*0.75).
                       attr('width', w);
     });
}
function SetInputValue(nm,val)
{
    $('#'+nm).val(val);
}
