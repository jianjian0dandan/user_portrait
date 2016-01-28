ajax_method = 'GET';
function call_sync_ajax_request(url, method, callback){
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      async: true,
      success:callback
    });
}
Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)){
        format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(format)){
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}

function sensing_sensors_table (head, data, div_name) {
	var html = '';
    $('#'+div_name).empty();
    if (data.length==0) {
    	html = '传感人群为全库用户';
    }else{
    	 $('#sensor_num').append('('+data.length+')');
	    if(data.length>7){
			$('#'+div_name).css("overflow-y", "auto");
		}
		html += '<table id="sensor_table" class="table table-bordered table-striped table-condensed datatable">';
		html += '<thead><tr>';
		for(var i=0; i<head.length; i++){
		html += '<th style="text-align:center">'+head[i]+'</th>';
		}
		html += '</tr></thead>';
		html += '<tbody>';

		for(var i=0; i<data.length; i++){
			html += '<tr>';
			html += '<td style="text-align:center;vertical-align:middle;">' + data[i][0] + '</td>';
			html += '<td style="text-align:center;vertical-align:middle;">' + data[i][1] + '</td>';
			html += '<td style="text-align:center;vertical-align:middle;">' + data[i][3] + '</td>';
			html += '<td class="sensing_topic" style="text-align:center;vertical-align:middle;">';
			html += ''+ data[i][4].join(', ');
			html += '</td><td style="text-align:center;vertical-align:middle;">' + data[i][5] + '</td>';
			html += '</td><td style="text-align:center;vertical-align:middle;">' + data[i][6] + '</td>';
			html += '</td><td style="text-align:center;vertical-align:middle;">' + data[i][7] + '</td>';
			html += '</tr>';
		}
		html += '</tbody></table>';
	}
	
	$('#'+div_name).append(html);

}

function sensing_participate_table (head, data, div_name) {
	$('#participate_num').append(data.length);
    $('#'+div_name).empty();
	if(data.length>6){
		$('#'+div_name).css("overflow-y", "auto");
	}
	var html = '';
	html += '<table id="participate_table" class="table table-bordered table-striped table-condensed datatable">';
	html += '<thead><tr>';
	for(var i=0; i<head.length; i++){
	html += '<th style="text-align:center">'+head[i]+'</th>';
	}
	html += '</tr></thead>';
	html += '<tbody>';

	for(var i=0; i<data.length; i++){
		//var s= i+1;
		html += '<tr>';
		html += '<td style="text-align:center;vertical-align:middle;">' + data[i][0] + '</td>';
		html += '<td style="text-align:center;vertical-align:middle;"><a href="/index/personal/?uid='+data[i][0]+'" target="_blank">' + data[i][1] + '</a></td>';
		html += '<td style="text-align:center;vertical-align:middle;">' + data[i][3] + '</td>';
		html += '<td class="sensing_topic" style="text-align:center;vertical-align:middle;">';
		html +=  data[i][4].join(',');
		html += '</td><td style="text-align:center;vertical-align:middle;">' + data[i][5] + '</td>';
		html += '<td style="text-align:center;vertical-align:middle;">' + data[i][6] + '</td>';
		html += '<td style="text-align:center;vertical-align:middle;">' + data[i][7] + '</td>';
		html += '<td style="text-align:center;vertical-align:middle;">' + data[i][8] + '</td>';
		html += '</tr>';
	}
	html += '</tbody></table>';

    $('#participate_table').dataTable({
    	responsive: true
       // "sDom": "<'row'<'col-md-6'l ><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
       // "sPaginationType": "bootstrap",
       // "oLanguage": {
       //     "sLengthMenu": "_MENU_ 每页"
       //}
    });

	$('#'+div_name).append(html);
}

function page_icon(page,count,eq, div_name){
	var ul_html = "";
	for(var i=page; i<=count; i++){
		ul_html += "<li>"+i+"</li>";
	}
	$("#"+div_name+" #pageGro ul").empty();
	$("#"+div_name+" #pageGro ul").append(ul_html);
	$("#"+div_name+" #pageGro ul li").eq(eq).addClass("on");
}

//上一页
function pageUp(pageNum,pageCount, div_name){
	switch(pageNum){
		case 1:
		break;
		case 2:
			page_icon(1,5,0, div_name);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,2, div_name);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,3, div_name);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,1, div_name);
		break;
	}
}

//下一页
function pageDown(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,1, div_name);
		break;
		case 2:
			page_icon(1,5,2);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,4, div_name);
		break;
		case pageCount:
		break;
		default:
			page_icon(pageNum-2,pageNum+2,3, div_name);
		break;
	}
}

//点击跳转页面
function pageGroup(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,0, div_name);
		break;
		case 2:
			page_icon(1,5,1);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,3, div_name);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,4, div_name);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,2, div_name);
		break;
	}
}



function Draw_group_weibo(data, div_name, sub_div_name){
    page_num = 5;
    if (data.length < page_num) {
          page_num = data.length
          page_group_weibo( 0, page_num, data, sub_div_name);
      }
      else {
          page_group_weibo( 0, page_num, data, sub_div_name);
          var total_pages = 0;
          if (data.length % page_num == 0) {
              total_pages = data.length / page_num;
          }
          else {
              total_pages = Math.round(data.length / page_num) + 1;
          }
        }
    var pageCount = total_pages;

    if(pageCount>10){
        page_icon(1,10,0, div_name);
    }else{
        page_icon(1,pageCount,0, div_name);
    }
    
    $("#"+div_name+" #pageGro li").bind("click", function(){
        if(pageCount > 5){
            var pageNum = parseInt($(this).html());
            pageGroup(pageNum,pageCount);
        }else{
            $(this).addClass("on");
            $(this).siblings("li").removeClass("on");
        }
      page = parseInt($("#"+div_name+" #pageGro li.on").html())  
      console.log(page);         
      start_row = (page - 1)* page_num;
      end_row = start_row + page_num;
      if (end_row > data.length)
          end_row = data.length;
      	console.log('start', start_row);
      	console.log('end', end_row);
      	console.log('data',data);
        page_group_weibo(start_row,end_row,data, sub_div_name);
    });

    $("#"+div_name+" #pageGro .pageUp").click(function(){
        if(pageCount > 5){
            var pageNum = parseInt($("#"+div_name+" #pageGro li.on").html());
            pageUp(pageNum,pageCount);
        }else{
            var index = $("#"+div_name+" #pageGro ul li.on").index();
            if(index > 0){
                $("#"+div_name+" #pageGro li").removeClass("on");
                $("#"+div_name+" #pageGro ul li").eq(index-1).addClass("on");
            }
        }
      page = parseInt($("#"+div_name+" #pageGro li.on").html())  
      console.log(page);
      start_row = (page-1)* page_num;
      end_row = start_row + page_num;
      if (end_row > data.length){
          end_row = data.length;
      }
        page_group_weibo(start_row,end_row,data,sub_div_name);
    });
    

    $("#" + div_name + " #pageGro .pageDown").click(function(){
        if(pageCount > 5){
            var pageNum = parseInt($("#"+div_name+" #pageGro li.on").html());

            pageDown(pageNum,pageCount);
        }else{
            var index = $("#"+div_name+" #pageGro ul li.on").index();
            if(index+1 < pageCount){
                $("#"+div_name+" #pageGro li").removeClass("on");
                $("#"+div_name+" #pageGro ul li").eq(index+1).addClass("on");
            }
        }
      page = parseInt($("#"+div_name+" #pageGro li.on").html()) 
      console.log(page);
      start_row = (page-1)* page_num;
      end_row = start_row + page_num;
      if (end_row > data.length){
          end_row = data.length;
      }
        page_group_weibo(start_row,end_row,data,sub_div_name);
    });
}
function page_group_weibo(start_row,end_row,data, sub_div_name){
	console.log('#'+ sub_div_name);
    weibo_num = end_row - start_row;
    $('#'+ sub_div_name).empty();
    var html = "";
	html += '<div id="weibo_list" class="weibo_list weibo_list_height scrolls tang-scrollpanel" style="margin:0;">';
	html += '<div id="content_control_height" class="tang-scrollpanel-wrapper" style="margin:0;">';
	html += '<div class="tang-scrollpanel-content" style="margin:0;">';
	html += '<ul>';
    for (var i = start_row; i < end_row; i += 1){
        var s = (i+1).toString();
        var weibo = data[i]
        var mid = weibo[0];
        var uid = weibo[9];
        var name = weibo[10];
        var date = weibo[5];
        var text = weibo[3];
        var geo = weibo[4];
        var reposts_count = weibo[1];
        var comments_count = weibo[2];
        var weibo_link = weibo[7];
        var user_link = weibo[8];
        var profile_image_url = 'http://tp2.sinaimg.cn/1878376757/50/0/1';
        var repost_tree_link = 'http://219.224.135.60:8080/show_graph/' + mid;
        if (geo==''){
           geo = '未知';
        }
        var user_link = 'http://weibo.com/u/' + uid;
        html += '<li class="item">';
        html += '<div class="weibo_detail" >';
        html += '<p style="text-align:left;margin-bottom:0;">' +s +'、情绪: 积极'+ '&nbsp;-&nbsp;昵称:<a class="undlin" target="_blank" href="' + user_link  + '">' + name + '</a>(' + geo + ')&nbsp;&nbsp;发布内容:&nbsp;&nbsp;' + text + '</p>';
        html += '<div class="weibo_info"style="width:100%">';
        html += '<div class="weibo_pz">';
        html += '<div id="topweibo_mid" class="hidden">'+mid+'</div>';
        html += '<div class="m">';
        html += '<u>' + date + '</u>&nbsp;-&nbsp;';
        html += '<a target="_blank" href="' + weibo_link + '">微博</a>&nbsp;-&nbsp;';
        html += '<a target="_blank" href="' + user_link + '">用户</a>&nbsp;&nbsp;';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</li>';
    }
    html += '<div id="TANGRAM_54__slider" class="tang-ui tang-slider tang-slider-vtl" style="height: 100%;">';
    html += '<div id="TANGRAM_56__view" class="tang-view" style="width: 6px;">';
    html += '<div class="tang-content"><div id="TANGRAM_56__inner" class="tang-inner"><div id="TANGRAM_56__process" class="tang-process tang-process-undefined" style="height: 0px;"></div></div></div>';
    html += '<a id="TANGRAM_56__knob" href="javascript:;" class="tang-knob" style="top: 0%; left: 0px;"></a></div>';
    html += '<div class="tang-corner tang-start" id="TANGRAM_54__arrowTop"></div><div class="tang-corner tang-last" id="TANGRAM_54__arrowBottom"></div></div>';

    html += '</ul>';
    html += '</div>';
    html += '</div>';
    html += '</div>';   
    html += '</div>'; 
    $('#'+sub_div_name).append(html);
    //$('#'+div_name+ ' .related_weibo').append('html');

}


// function sensing_keywords_table (head, data, div_name) {
//     $('#'+div_name).empty();
// 	if(data.length>10){
// 		$('#'+div_name).css("overflow-y", "auto");
// 	}
// 	var html = '';
// 	html += '<table id="keywords_table" class="table table-bordered table-striped table-condensed datatable">';
// 	html += '<thead><tr>';
// 	for(var i=0; i<head.length; i++){
// 	html += '<th style="text-align:center">'+head[i]+'</th>';
// 	}
// 	//html += '<th style="text-align:center"> <input name="participate_select_all" id="participate_select_all" type="checkbox" value="" onclick="participate_select_all()" /></th>';
// 	html += '</tr></thead>';
// 	html += '<tbody>';

// 	for(var i=0; i<data.length; i++){
// 		var s= i+1;
// 		html += '<tr>';
// 		html += '<td style="text-align:center;vertical-align:middle;">' + s + '</td>';
// 		html += '<td style="text-align:center;vertical-align:middle;">' + data[i][0] + '</td>';
// 		html += '<td style="text-align:center;vertical-align:middle;">' + data[i][1] + '</td>';
// 	}
// 	html += '</tbody></table>';
// 	$('#'+div_name).append(html);
// }

function draw_sensi_line_charts(data, div_name, legend_data){
	var line1 = data[1];
	var line2 = data[2];
	var line3 = data[3];
	var markpoint = data[4];
	var col_markpoint = data[5];
	var myChart = echarts.init(document.getElementById(div_name)); 
	option = {  
	    tooltip : {
	        trigger: 'axis',
	        show : true,
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom: {
	        show: true,
	        start : 80
	    },
	    legend : {
	        data : legend_data,
	        x:'center'
	    },
	    grid: {
	        y2: 70
	    },
	    xAxis : [
	        {
	            data :data[0],
	            type : 'category',
	            splitNumber:10
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name: legend_data[0],
	            type: 'line',
	            showAllSymbol : true,
               	symbolSize:1,
               	symbol: 'circle',
	           	markPoint : {
    		    	data :markpoint,
    		    	clickable: true,
    		    	symbolSize:5,
    		    	symbol: 'arrow',
    		    	itemStyle:{
    		    		normal: {
    		                color: 'blue'
    		            }
    		    	},
    		    	tooltip:{
    		    		show : false
    		    	}
            	},
	            clickable: true,	          
	            data: line1
	        },
	        {
	            name: legend_data[1],
	            type: 'line',
	            showAllSymbol : true,
	            symbolSize:1,
               	symbol: 'circle',
	            data: line2
	        },
	        {
	            name: legend_data[2],
	            type: 'line',
	            showAllSymbol : true,
	            symbolSize:1,
               	symbol: 'circle',
	            data: line3
	        }
	    ]
	};
	 require([
            'echarts'
        ],
        function(ec){
			var ecConfig = require('echarts/config');
			function eConsole(param) {
			    if (typeof param.seriesIndex != 'undefined') {			    
				    var timestamp2 = Date.parse(new Date(param.name));
					timestamp2 = timestamp2 / 1000;
				    sensi_click_time = timestamp2;
				    sensi_index = param.seriesIndex+7
				    var data=[['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['0',1,2,'3neirong',4,44,6,7,8,9,0],['0',1,2,'3neirong',4,5,6,7,8,9,0],['0',1,2,'3neirong',4,5,6,7,8,9,0]]
				    var num_line_url = '传递的'+(param.seriesIndex+7) +',时间是'+sensi_click_time;
				    $('#sensi_weibo').css("display", 'block');
					Draw_group_weibo(data, 'sensi_weibo', 'sensi_related_weibo');
				    //console.log(num_line_url);
				}
			}

		myChart.on(ecConfig.EVENT.CLICK, eConsole);
	});

	// myChart.addMarkPoint(
 //    	[0, {
 //    		    	data :markpoint,
 //    		    	clickable: true,
 //    		    	symbolSize:5,
 //    		    	symbol: 'arrow',
 //    		    	itemStyle:{
 //    		    		normal: {
 //    		                color: 'blue'
 //    		            }
 //    		    	},
 //    		    	tooltip:{
 //    		    		show : false
 //    		    	}
 //    		    }]);

	// 为echarts对象加载数据 
    myChart.setOption(option);                  
}

function draw_mood_line_charts(data, div_name, legend_data){
	var line1 = data[1];
	var line2 = data[2];
	var line3 = data[3];
	var markpoint = data[4];
	var myChart = echarts.init(document.getElementById(div_name)); 
	option = {  
	    tooltip : {
	        trigger: 'axis',
	        show : true,
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom: {
	        show: true,
	        start : 90
	    },
	    legend : {
	        data : legend_data,
	        x:'center'
	    },
	    grid: {
	        y2: 70
	    },
	    xAxis : [
	        {
	            data :data[0],
	            type : 'category',
	            splitNumber:10
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name: legend_data[0],
	            type: 'line',
	            showAllSymbol : true,
	            symbolSize:1,
               	symbol: 'circle',
	            markPoint : {
    		    	data :markpoint,
    		    	clickable: true,
    		    	symbolSize:5,
    		    	symbol: 'arrow',
    		    	itemStyle:{
    		    		normal: {
    		                color: 'blue'
    		            }
    		    	},
    		    	tooltip:{
    		    		show : false
    		    	}
            	},
	            clickable: true,	          
	            data: line1
	        },
	        {
	            name: legend_data[1],
	            type: 'line',
	            showAllSymbol : true,
	            symbolSize:1,
               	symbol: 'circle',
	            data: line2
	        },
	        {
	            name: legend_data[2],
	            type: 'line',
	            showAllSymbol : true,
	            symbolSize:1,
               	symbol: 'circle',
	            data: line3
	        }
	    ]
	};
	 require([
            'echarts'
        ],
        function(ec){
			var ecConfig = require('echarts/config');
			function eConsole(param) {
			    if (typeof param.seriesIndex != 'undefined') {			    
				    var timestamp2 = Date.parse(new Date(param.name));
					timestamp2 = timestamp2 / 1000;
				    mood_click_time = timestamp2;
				    mood_index = param.seriesIndex+4
				    var data=[['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['0',1,2,'3neirong',4,44,6,7,8,9,0],['0',1,2,'3neirong',4,5,6,7,8,9,0],['0',1,2,'3neirong',4,5,6,7,8,9,0]]
				    var num_line_url = '传递的'+(param.seriesIndex+4) +',时间是'+mood_click_time;
	   			    $('#mood_weibo').css("display", 'block');
					Draw_group_weibo(data, 'mood_weibo', 'mood_related_weibo');
				}
			}
		
		myChart.on(ecConfig.EVENT.CLICK, eConsole);
	});

	// 为echarts对象加载数据 
    myChart.setOption(option);                  
}

function draw_num_line_charts(data, div_name, legend_data){
	var line1 = data[1];
	var line2 = data[2];
	var line3 = data[3];
	var line4 = data[4];
	var markpoint  = data[5];
	console.log(markpoint[1])
	var myChart = echarts.init(document.getElementById(div_name)); 
	option = {  
	    tooltip : {
	        trigger: 'axis',
	        show : true,
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom: {
	        show: true,
	        start : 90
	    },
	    legend : {
	        data : legend_data,
	        x:'center'
	    },
	    grid: {
	        y2: 70
	    },
	    xAxis : [
	        {
	            data :data[0],
	            type : 'category',
	            splitNumber:10
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name: legend_data[0],
	            type: 'line',	            
	            showAllSymbol : true,
	            symbolSize:1,
               	symbol: 'circle',
	           	markPoint : {
    		    	data :markpoint,
    		    	clickable: true,
    		    	symbolSize:5,
    		    	symbol: 'arrow',
    		    	itemStyle:{
    		    		normal: {
    		                color: 'blue'
    		            }
    		    	},
    		    	tooltip:{
    		    		show : false
    		    	}
            	},
	            clickable: true,	          
	            data: line1
	        },
	        {
	            name: legend_data[1],
	            type: 'line',
	            showAllSymbol : true,
	            symbolSize:1,
               	symbol: 'circle',
	            data: line2
	        },
	        {
	            name: legend_data[2],
	            type: 'line',
	            symbolSize:1,
               	symbol: 'circle',
	            showAllSymbol : true,
	            data: line3
	        },
	        {
	            name: legend_data[3],
	            type: 'line',
	            symbolSize:1,
               	symbol: 'circle',
	            showAllSymbol : true,
	            data: line4
	        }
	    ]
	};
	 require([
            'echarts'
        ],
        function(ec){
			var ecConfig = require('echarts/config');
			function eConsole(param) {
				//alert('param', param);
			    // var mes = '【' + param.type + '】';
			    // if (typeof param.seriesIndex != 'undefined') {
			    //     mes += '  seriesIndex : ' + param.seriesIndex;
			    //     mes += '  dataIndex : ' + param.dataIndex;
			    //     mes += '  dataValue : ' + param.value;
			    //     mes += '  dataname : ' + param.name;
			    // }
			    var timestamp2 = Date.parse(new Date(param.name));
				timestamp2 = timestamp2 / 1000;
			    num_click_time = timestamp2;
			    num_index = param.seriesIndex
			    var data=[['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京',param.name],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['0',1,2,'3neirong',4,44,6,7,8,9,0],['0',1,2,'3neirong',4,5,6,7,8,9,0],['0',1,2,'3neirong',4,5,6,7,8,9,0]]
			    var num_line_url = '传递的'+ param.seriesIndex + ',时间是'+num_click_time;
			    
   			    $('#num_weibo').css("display", 'block');
				Draw_group_weibo(data, 'num_weibo', 'num_related_weibo');
				console.log(num_line_url);
			}
		
		myChart.on(ecConfig.EVENT.CLICK, eConsole);
	});

	// 为echarts对象加载数据 
    myChart.setOption(option);                  
}

// function Draw_get_weibo(data,div_name){
// 	if(data.length>4){
// 		$('#weibo_list').css("overflow-y","scroll");
// 	}
//   var html = '';
//   $('#'+div_name).empty();
//     if(data[0][3]==''){
//         html += "<div style='width:100%;height:100px;'>用户在未发布任何微博</div>";
//     }else{
//       html += '<div id="weibo_list" class="weibo_list weibo_list_height scrolls tang-scrollpanel" style="margin:0;">';
//       html += '<div id="content_control_height" class="tang-scrollpanel-wrapper" style="margin:0;">';
//       html += '<div class="tang-scrollpanel-content" style="margin:0;">';
//       html += '<ul>';
//       for(var i=0;i<data.length;i++){
//         s = (i+1).toString();
//         var weibo = data[i]
//         var mid = weibo[0];
//         var uid = weibo[9];
//         var name = weibo[10];
//         var date = weibo[5];
//         var text = weibo[3];
//         var geo = weibo[4];
//         var reposts_count = weibo[1];
//         var comments_count = weibo[2];
//         var weibo_link = weibo[7];
//         var user_link = weibo[8];
//         var profile_image_url = 'http://tp2.sinaimg.cn/1878376757/50/0/1';
//         var repost_tree_link = 'http://219.224.135.60:8080/show_graph/' + mid;
//         if (geo==''){
//            geo = '未知';
//         }
//         var user_link = 'http://weibo.com/u/' + uid;
//         html += '<li class="item">';
//         html += '<div class="weibo_detail" >';
//         html += '<p style="text-align:left;margin-bottom:0;">' +s +'、情绪: 积极'+ '&nbsp;-&nbsp;昵称:<a class="undlin" target="_blank" href="' + user_link  + '">' + name + '</a>(' + geo + ')&nbsp;&nbsp;发布内容:&nbsp;&nbsp;' + text + '</p>';
//         html += '<div class="weibo_info"style="width:100%">';
//         html += '<div class="weibo_pz">';
//         html += '<div id="topweibo_mid" class="hidden">'+mid+'</div>';
//         html += '<span class="retweet_count" href="javascript:;" target="_blank">转发数(' + reposts_count + ')</span>&nbsp;&nbsp;|&nbsp;&nbsp;';
//         html += '<span class="comment_count" href="javascript:;" target="_blank">评论数(' + comments_count + ')</span></div>';
//         html += '<div class="m">';
//         html += '<u>' + date + '</u>&nbsp;-&nbsp;';
//         html += '<a target="_blank" href="' + weibo_link + '">微博</a>&nbsp;-&nbsp;';
//         html += '<a target="_blank" href="' + user_link + '">用户</a>&nbsp;&nbsp;';
//         // html += '<a target="_blank" href="' + repost_tree_link + '">转发树</a>';
//         html += '</div>';
//         html += '</div>';
//         html += '</div>';
//         html += '</li>';
//       }
                                    
//     html += '<div id="TANGRAM_54__slider" class="tang-ui tang-slider tang-slider-vtl" style="height: 100%;">';
//     html += '<div id="TANGRAM_56__view" class="tang-view" style="width: 6px;">';
//     html += '<div class="tang-content"><div id="TANGRAM_56__inner" class="tang-inner"><div id="TANGRAM_56__process" class="tang-process tang-process-undefined" style="height: 0px;"></div></div></div>';
//     html += '<a id="TANGRAM_56__knob" href="javascript:;" class="tang-knob" style="top: 0%; left: 0px;"></a></div>';
//     html += '<div class="tang-corner tang-start" id="TANGRAM_54__arrowTop"></div><div class="tang-corner tang-last" id="TANGRAM_54__arrowBottom"></div></div>';

//     html += '</ul>';
//     html += '</div>';
//     html += '</div>';
//     html += '</div>';   
//     }
//       $('#'+div_name).append(html);
// }

//暂时不用
// function participate_select_all(){
// 	  $('input[name="participate_select"]:not(:disabled)').prop('checked', $("#participate_select_all").prop('checked'));
// }
// function submit_participate(){
// 	var user_choose = [];
// 	var user_url = '';
// 	$('#participate_table .inline-checkbox').each(function(){
//         if($(this).is(':checked')){
//           user_choose.push($(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().text());
//         }
//       });
// 	console.log('user_choose', user_choose);
// 	var user_url =

// }

function show_warning_time(div_name, data){

	$('#' + div_name).empty();	
	var html = '';
	for(var i=0;i<data.length;i++){
		html += '<span style="width:150px;margin:10px;font-size:14px;">' + data[i][0] + '</span>';
		if(i%3 == 2){
			html += '<br>';
		}
	}
		$('#' + div_name).append(html);	
}

function deal_point(data){
	var data_list = new Array();
	for(var i=0;i<data.length; i++){
		var data_dict = {};
		data_dict.name = data[i][0];
		data_dict.xAxis=data[i][0];
		data_dict.yAxis= data[i][1];
		data_list.push(data_dict);
	}
	return data_list;

}

function show_warning_time_all(div_name, data){

	$('#' + div_name).empty();	
	var html = '';
	for(var i=0;i<data.length;i++){
		html += '<span style="width:150px;margin:10px;font-size:14px;">' + data[i] + '</span>';
		if(i%3 == 2){
			html += '<br>';
		}
	}
		$('#' + div_name).append(html);	
}

var num_legend = ['总数','原创', '转发', '评论'];
var mood_legend = ['消极','积极', '中性'];
function social_sensing_all(data){

	//异常点信息
	var weibo_warning_num = data.variation_distribution[0].length;
	var mood_abnormal_num = data.variation_distribution[1].length;
	var total_abnormal_num = data.variation_distribution[2].length;
	$('#weibo_warning_num').empty();
	$('#weibo_warning_num').append(weibo_warning_num);
	$('#mood_abnormal_num').empty();
	$('#mood_abnormal_num').append(mood_abnormal_num);
	$('#total_abnormal_num').empty();
	$('#total_abnormal_num').append(total_abnormal_num);
	show_warning_time('modal_warning_weibo_content', data.variation_distribution[0]);
	show_warning_time('modal_warning_mood_content', data.variation_distribution[1]);
	show_warning_time_all('modal_warning_total_content', data.variation_distribution[2]);

	//微博数量走势图
	var num_line_data = new Array();
	num_line_data[0]= data.time_series;
	num_line_data[1] = data.total_number_list;
	num_line_data[2] = data.origin_weibo_list;
	num_line_data[3] = data.retweeted_weibo_list;
	num_line_data[4] = data.comment_weibo_list;
	num_line_data[5] = deal_point(data.variation_distribution[0]);
	draw_num_line_charts(num_line_data, 'num_line_charts', num_legend);

	//情绪走势图
	var mood_line_data = new Array();
	mood_line_data[0] = data.time_series;
	mood_line_data[1] = data.negetive_sentiment_list;
	mood_line_data[2] = data.neutral_sentiment_list;
	mood_line_data[3] = data.positive_sentiment_list;
	mood_line_data[4] = deal_point(data.variation_distribution[1]);
	mood_line_data[5] = deal_point(data.variation_distribution[2]);
	draw_mood_line_charts(mood_line_data, 'mood_line_charts', mood_legend);

	//敏感微博走势图
	// var mood_line_data = new Array();
	// mood_line_data[0] = data.time_series;
	// mood_line_data[1] = data.negetive_sentiment_list;
	// mood_line_data[2] = data.neutral_sentiment_list;
	// mood_line_data[3] = data.positive_sentiment_list;
	// mood_line_data[4] = deal_point(data.variation_distribution[1]);
	draw_sensi_line_charts(mood_line_data, 'sensi_line_charts', mood_legend);

    var data0=[['人民日报1111',1,2,'1111这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','param.name'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','param.name'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','param.name'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['0',1,2,'3neirong',4,44,6,7,8,9,0],['0',1,2,'3neirong',4,5,6,7,8,9,0],['0',1,2,'333333333neirong',4,5,6,7,8,9,0]]
    var data1=[['人民日报2222',1,2,'2222这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','param.name'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','param.name'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','param.name'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['人民日报',1,2,'这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论这里是一条结论','中国 北京 北京','2013-09-07 20:00'],['0',1,2,'3neirong',4,44,6,7,8,9,0],['0',1,2,'3neirong',4,5,6,7,8,9,0],['0',1,2,'333333333neirong',4,5,6,7,8,9,0]]
	//微博排序方式	
	$('input[name="num_select"]').click(function(){
		if($('input[name="num_select"]:checked').val()=='1'){		
			Draw_group_weibo(data1, 'num_weibo', 'num_related_weibo');
		}else{
			Draw_group_weibo(data0, 'num_weibo', 'num_related_weibo');

		}
	});	
	$('input[name="mood_select"]').click(function(){
		if($('input[name="mood_select"]:checked').val()=='1'){		
			Draw_group_weibo(data1, 'mood_weibo', 'mood_related_weibo');
		}else{
			Draw_group_weibo(data0, 'mood_weibo', 'mood_related_weibo');

		}
	});	
	$('input[name="sensi_select"]').click(function(){
		if($('input[name="sensi_select"]:checked').val()=='1'){		
			Draw_group_weibo(data1, 'sensi_weibo', 'sensi_related_weibo');
		}else{
			Draw_group_weibo(data0, 'sensi_weibo', 'sensi_related_weibo');

		}
	});	


	//参与人表格
	var participate_head=['uid','昵称','领域','话题','热度','重要度','影响力','活跃度']
	var user_detail = new Array();
	user_detail = data.important_user_detail;
	sensing_participate_table(participate_head,user_detail,"sensing_participate_table");

	//传感器模态框数据
	var sensor_head=['uid','昵称','领域','话题','重要度','影响力','活跃度']
	var sensor_data = new Array();
	sensor_data = data.social_sensors_detail;
	sensing_sensors_table(sensor_head,sensor_data,"modal_sensor_table");

	//备注信息---数据未加
	var remark_info = data.warning_conclusion;
	//warning_conclusion = data.warning_conclusion.split('：');
	$('#remark_info').empty();
	$('#remark_info').append(remark_info);

	//事件关键词
	var keywords_list = ''
	keywords_list = data.keywords.join('&nbsp;&nbsp;');
	$('#sensing_keywords').empty();
	$('#sensing_keywords').append(keywords_list);

}

function sensing_keywords_table_all(data){
	var keywords_head=['序号','关键词','频数'];
	sensing_keywords_table(keywords_head, data.slice(0, 10),"sensing_keywords_table");
	sensing_keywords_table(keywords_head,data,"modal_keywords_table");
}

var num_click_time;
var num_index;
var mood_click_time;
var mood_index;
var sensi_click_time;
var sensi_index;

$('#sensing_task_name').append(task_name);
var sensing_url = '';
sensing_url += '/social_sensing/get_warning_detail/?task_name='+task_name+'&keywords='+keywords+'&ts='+ts;
call_sync_ajax_request(sensing_url, ajax_method, social_sensing_all);

// window.onload = function(){
// 	var keywords_url = '/social_sensing/get_keywords_list/?task_name='+task_name+'&keywords='+keywords+'&ts='+ts+'&start_time=1377964800';
// 	call_sync_ajax_request(keywords_url, ajax_method, sensing_keywords_table_all);

// }


