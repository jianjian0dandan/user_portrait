function Influence(){
  this.ajax_method = 'GET';
}
Influence.prototype = {   //获取数据，重新画表
  call_sync_ajax_request:function(url, method, callback){
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      async: false,
      success:callback
    });
  },
  Draw_influence:function(data){
	//console.log(data);
	var item = data[0];
	var conclusion = data[1];
	//console.log(conclusion);
	document.getElementById('saysth').innerHTML = conclusion[0];
	document.getElementById('sayimportant').innerHTML = conclusion[1];
	var dataFixed = [];
	for(i=0;i<item.length;i++){
		dataFixed.push(parseFloat(item[i].toFixed(2)));
	}
	var line_chart_dates = [];
	var line_chart_tomorrow = new Date();
    for(var i=0;i<7;i++){
      var today = new Date(line_chart_tomorrow-24*60*60*1000*(7-i));
      line_chart_dates[i] = today.getFullYear()+"-"+((today.getMonth()+1)<10?"0":"")+(today.getMonth()+1)+"-"+((today.getDate())<10?"0":"")+(today.getDate());
    }
    var myChart = echarts.init(document.getElementById('influence_chart')); 
        
    var option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            x : 'right',
            data:['影响力']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : line_chart_dates
            }
        ],
        yAxis : [
            {
                type : 'value',
            }
        ],
        series : [
            {
                name:'影响力',
                type:'line',
                data:dataFixed,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };
        // 为echarts对象加载数据 
        myChart.setOption(option); 
    },

  draw_weibo:function(data){
  var html = '';
  $('#influence_weibo').empty();
    if(data==''){
        html += "<div style='width:100%;'><span style='margin-left:20px;'>用户在昨天未发布任何微博</span></div>";
        $('#influence_weibo').append(html);
    }else{
        for(i=0;i<data.length;i++){
            //console.log(data[i].text);
            if(i%2 == 0){
              html += "<div style='width:100%;background-color:whitesmoke'>";
            }else{
              html += "<div style='width:100%;'>";
            }
            html += "<div style='width:100%;padding:2px;'>";
            html += "<img src='/static/img/pencil-icon.png' style='height:10px;width:10px;margin:0px;margin-right:10px;'><span>"+data[i].text+"</span></div>";
            html += "<div style='width:100%;padding:2px;'>";
            html += "<span style='margin:0 20px'>最高值:<span id='' style='color:red;'>"+data[i].zuigao+"</span></span>";
            html += "<span style='margin:0 20px;'>爆发度:<span id='' style='color:red;'>"+data[i].baofa+"</span></span>";
            html += "<span style='float:right;margin-right:30px;'><span>转发数:<span type='button' class='retweet_count' data-toggle='modal' data-target='#re_influence'  style='font-size:16px;margin-left:160px;cursor: pointer'><u>"+data[i].zhuanfa+"</u></span></span>";
            html += "<span style='margin-left:50px'>评论数:<span class='comment_count' style='font-size:16px;margin-left:10px;cursor: pointer'><u>"+data[i].pinglun+"</u></span></span></span></div>";
            html += "</div>";
        }
      $('#influence_weibo').append(html);
      // $(".closeList2").off("click").click(function(){
      //   $("#float-wrap").addClass("hidden");
      //   $("#re_influence").addClass("hidden");
      //   $("#cmt_influence").addClass("hidden");
      //   return false;
      // });
      // $(".retweet_count").off("click").click(function(){
      //   $("#float-wrap").removeClass("hidden");
      //   $("#re_influence").removeClass("hidden");
      //   return false;
      // });
      // $(".comment_count").off("click").click(function(){
      //   $("#float-wrap").removeClass("hidden");
      //   $("#cmt_influence").removeClass("hidden");
      //   return false;
      // });
    }
  },
  Influence_motal:function(data, div_name){         //后期加名字
    $('#'+div_name).empty();
    var html = '';
    html += '<div style="float:none;margin:0;font-size:16px;">该类用户多来自'+data[0]+'领域，多参与'+data[1]+'话题的讨论，所处地为'+data[2]+',平均影响力为'+data[3]+'</div>';
    html += '<hr>';
    html += '<h4>已入库用户:('+data[4].length+')</h4><p style="text-align:left;padding: 0px 10px;">';
    for (i=0;i<data[4].length;i++){
      html += '<span"><img style="margin:10px 0px 0px 25px;" src="' + data[4][i] + '" alt="' + data[4][i] +'"></span>';
      
      // html += '<ul style="margin-top:0px;margin-bottom:0;padding-left: 7px;height:50px; overflow-y:hidden" class="list-inline">';
      // html += '<li ng-repeat="result in t.result" target="_blank" style="margin-bottom: 10px" class="index-small-photo-wrap no-padding ng-scope">';
      // //html += '<a target="_blank" href="/index/personal/?uid=' + data[4][i] +'" title="' + data[4][i] +'">';
      // html += '<div class="small-photo shadow-5"><span class="helper"></span>'+i+'<img src="' + data[4][i] + '" alt="' + data[4][i] +'"></div></li>';         
      // html += '</ul></div>';

    }
    html += '</p>';
    html += '<hr><h4>未入库用户:('+data[5].length+')</h4><p style="text-align:left;padding: 0px 10px;">';
    for (i=0;i<data[5].length;i++){
      html += '<span"><img style="margin:10px 0px 0px 20px;" src="' + data[4][i] + '" alt="' + data[4][i] +'"></span>';

      // html += '<ul style="margin-top:0px;margin-bottom:0;padding-left: 7px;height:50px; overflow-y:hidden" class="list-inline">';
      // html += '<li ng-repeat="result in t.result" target="_blank" style="margin-bottom: 10px" class="index-small-photo-wrap no-padding ng-scope">';
      // //html += '<a target="_blank" href="/index/personal/?uid=' + data[4][i] +'" title="' + data[4][i] +'">';
      // html += '<div class="small-photo shadow-5"><span class="helper"></span>'+i+'<img src="' + data[4][i] + '" alt="' + data[4][i] +'"></div></li>';         
      // html += '</ul></div>';

    }
    html += '</p>';
    $('#'+div_name).append(html);
  }

}

function choose_dayorweek(url){
$('input[name="choose_module"]').click(function(){                  
  var index = $('input[name="choose_module"]:checked').val();
  //console.log(index);
  if(index == 1){
    $('#influence_chart').empty();
    //console.log(url);
    Influence.call_sync_ajax_request(url, Influence.ajax_method, Influence.Draw_influence);
  }else{
    $('#influence_chart').empty();
    Influence.call_sync_ajax_request(url, Influence.ajax_method, Influence.Draw_influence);    
  }
})}

var weibo =[{"text":"【“小学生太需要自由快乐的生活了”】教育专家孙云晓在回忆他的“危险的童年”时说：小学阶段的教育，包括学校、家庭和社会教育的成败得失，将很大程度决定孩子的一生，“小学生太需要自由快乐的生活了，他们上半天课足矣，另外半天适宜参加各种兴趣活动” 。你赞同吗？","zhuanfa":1225453,"pinglun":11425421,"zuigao":16743,"baofa":2135632},{"text":"【“小学生太需要自由快乐的生活了”】教育专家孙云晓在回忆他的“危险的童年”时说：小学阶段的教育，包括学校、家庭和社会教育的成败得失，将很大程度决定孩子的一生，“小学生太需要自由快乐的生活了，他们上半天课足矣，另外半天适宜参加各种兴趣活动” 。你赞同吗？","zhuanfa":123,"pinglun":111,"zuigao":123,"baofa":212},{"text":"【“小学生太需要自由快乐的生活了”】教育专家孙云晓在回忆他的“危险的童年”时说：小学阶段的教育，包括学校、家庭和社会教育的成败得失，将很大程度决定孩子的一生，“小学生太需要自由快乐的生活了，他们上半天课足矣，另外半天适宜参加各种兴趣活动” 。你赞同吗？","zhuanfa":123,"pinglun":111,"zuigao":123,"baofa":212}]
var weibo2 = ['媒体','娱乐','北京','45',['http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1'],['http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1','http://tp4.sinaimg.cn/1729736051/50/40018551765/1']]
var div_name = 're_user'
var Influence = new Influence();
var influence_url = '/influence_application/portrait_history_active/?date=2013-09-07&uid='+parent.personalData.uid ;
//console.log(url)
Influence.call_sync_ajax_request(influence_url, Influence.ajax_method, Influence.Draw_influence);
Influence.draw_weibo(weibo);
Influence.Influence_motal(weibo2,div_name)
choose_dayorweek(influence_url);