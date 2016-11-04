/*
 * 名称：评分/shineonScole
 * 作者：djl
 * 邮箱：474569696@qq.com
 * 日期：2016/4/14
 * 
 */
$.fn.shineonScole = function(options,num,fn) 
{	var starflag=false,
	startleft,
	starttop,
	count,
	defaults = {
		"classid":".stars",//评分的外围样式表
		"star":".star",//内部显示样式表
		"wid":87,//总长度
		"starwid":15,//每颗星的长度
		"starnum":5,//几颗星
		"jj":3,//星间距
		"scolerate":20,//得分率，不能为0
		"scolestarflag":"half",//半颗星标识half/整颗星all/自由星auto
		"scoletxt":[],//得分显示文本
		"scoleaddtxt":"",//纯数字得分后缀
		"scolePartTxt":false,//得分后缀文本分开
		"classidBorderRadius":0,//背景图圆角设置
		"disabled":false,//是否禁用
	},
	settings  = $.extend({},defaults,options),
	setcid = settings['classid'],
	setstarflag = settings['scolestarflag'],
	setwidall = settings['starwid']+settings['jj'],
	settxt=settings['scoletxt'],
	setstarnum=settings['starnum'],
	setatxt=settings['scoleaddtxt'],
	setparttxt = settings['scolePartTxt'],
	txtavarage=(setstarnum*settings['scolerate']/settxt.length).toFixed(1),
	totalWid = settings['wid'],
	totalScole = setstarnum*settings['scolerate'],
	borderRadius = settings['classidBorderRadius'],
	disabled = settings['disabled'],
	startind;
	if(num>=0)
	{
		starind=$(setcid).eq(num);
		starind.attr("starnum",num);
	}
	else
	{
		var starlen=$(setcid).length,nonum;
		for(nonum=0;nonum<starlen;nonum++)
		{
			$(setcid).eq(nonum).attr("starnum",nonum);
		}
		starind=$(setcid);
	}
	if(setstarflag == "auto"){
		$(setcid).width(totalWid+1);
	}
	starind.mouseover(function(){
		starind=$(setcid).eq($(this).attr("starnum"));
	});
	if(disabled){
		return false;
	}
	starind.mousedown(function(e){	
		starflag=true;
		
		startleft=starind.offset()['left'];	
		starttop=starind.offset()['top'];
		if(setstarflag == "auto"){
			count=(e.pageX-startleft)/((settings['wid'])/setstarnum);
		}else{
			count=(e.pageX-startleft)/setwidall;
		}
		if(setstarflag=="half")
		{
			var countparse=parseInt(count.toFixed(1).toString().split(".")[1]);
			if(countparse>5)
			{
				count=parseInt(count)+1;
			}
			else
			{
				count=parseInt(count)+0.5;
			}
			starind.find(settings['star']).width(count*setwidall);
			var realscole=count*settings['scolerate'];
			if(settxt.length==0)
			{
				if(setparttxt){
					starind.next().text(realscole);
					starind.next().next().text(setatxt);
				}else{
					starind.next().text(realscole+""+setatxt);
				}
				
			}
			else
			{
				var arrind=parseInt(realscole/txtavarage);
				if(setparttxt){
					starind.next().text(settxt[arrind]);
					starind.next().next().text(setatxt);
				}else{
					starind.next().text(settxt[arrind]+""+setatxt);
				}
				
			}
			starind.find(settings['star']).attr("star",count);
		}
		else if(setstarflag=="all")
		{
			count=Math.ceil(count);
			starind.find(settings['star']).width(count*setwidall);
			var realscole=count*settings['scolerate'];
			if(settxt.length==0)
			{
				if(setparttxt){
					starind.next().text(realscole);
					starind.next().next().text(setatxt);
				}else{
					starind.next().text(realscole+""+setatxt);
				}
			}
			else
			{
				if(setparttxt){
					starind.next().text(settxt[count-1]);
					starind.next().next().text(setatxt);
				}else{
					starind.next().text(settxt[count-1]+""+setatxt);
				}
				
			}
			starind.find(settings['star']).attr("star",count);
		}
		else
		{
			var realscole=count*settings['scolerate'];
			if(realscole>totalScole){
				realscole = totalScole;
			}
			starind.find(settings['star']).width(count*setwidall);
			if(settxt.length==0)
			{
				if(setparttxt){
					starind.next().text(parseFloat(realscole).toFixed(1));
					starind.next().next().text(setatxt);
				}else{
					starind.next().text(parseFloat(realscole).toFixed(1)+""+setatxt);
				}
				
			}
			else
			{
				var arrind=parseInt(realscole/txtavarage);
				if(arrind>=settxt.length)
				{
					arrind=settxt.length-1;
				}
				if(setparttxt){
					starind.next().text(settxt[arrind]);
					starind.next().next().text(setatxt);
				}else{
					starind.next().text(settxt[arrind]+""+setatxt);
				}
				
			}
			starind.find(settings['star']).attr("star",count);
		}
		
	});
	starind.mousemove(function(e){

		if(starflag)
		{
			var XScope ;
			if(setstarflag == "auto"){
				XScope = e.pageX<=(startleft+settings['wid']+1)
			}else{
				XScope = e.pageX<=(startleft+settings['wid'])
			}
			if(XScope&&e.pageY>=starttop&&e.pageY<=starttop+starind.height())
			{
				var left=e.pageX-startleft;
				starind.find(settings['star']).width(left);
				if(left <= 0&&borderRadius){
					starind.css("border-radius","0 "+borderRadius+"px "+borderRadius+"px 0");
				}else{
					starind.css("border-radius",borderRadius+"px ");
				}
				if(setstarflag=="half")
				{
					count=(e.pageX-startleft)/setwidall;
					var countparse=parseInt(count.toFixed(1).toString().split(".")[1]);
					if(countparse>5||countparse==0)
					{
						count=parseInt(count)+1;
					}
					else
					{
						count=parseInt(count)+0.5;
					}
					var realscole=count*settings['scolerate'];
					if(settxt.length==0)
					{
						if(setparttxt){
							starind.next().text(realscole);
							starind.next().next().text(setatxt);
						}else{
							starind.next().text(realscole+""+setatxt);
						}
						
					}
					else
					{
						var arrind=parseInt(realscole/txtavarage);
						if(arrind>=settxt.length)
						{
							arrind=settxt.length-1
						}
						if(setparttxt){
							starind.next().text(settxt[arrind]);
							starind.next().text(setatxt);
						}else{
							starind.next().text(settxt[arrind]+""+setatxt);
						}
						
					}
					starind.find(settings['star']).attr("star",count);
				}
				else if(setstarflag=="all")
				{
					count=Math.ceil((e.pageX-startleft)/setwidall);
					var realscole=count*settings['scolerate'];
					if(settxt.length==0)
					{
						if(setparttxt){
							starind.next().text(realscole);
							starind.next().next().text(setatxt);
						}else{
							starind.next().text(realscole+""+setatxt);
						}
						
						starind.find(settings['star']).width(count*(settings['starwid'])+parseInt(count)*settings['jj']);
					}
					else
					{
						if(setparttxt){
							starind.next().text(settxt[count-1]);
							starind.next().text(setatxt);
						}else{
							starind.next().text(settxt[count-1]+""+setatxt);
						}
						
						starind.find(settings['star']).width(count*(settings['starwid'])+parseInt(count)*settings['jj']);
					}
					starind.find(settings['star']).attr("star",count);
				}
				else
				{
					count=(e.pageX-startleft)/((settings['wid'])/setstarnum);
					if(count<0)
					{
						count=0;
					}
					var realscole=count*settings['scolerate'];
					if(realscole>totalScole){
						realscole = totalScole;
					}
					if(settxt.length==0)
					{
						if(setparttxt){
							starind.next().text(parseFloat(realscole).toFixed(1));
							starind.next().next().text(setatxt);
						}else{
							starind.next().text(parseFloat(realscole).toFixed(1)+""+setatxt);
						}
						
					}
					else
					{
						var arrind=parseFloat(realscole/txtavarage).toFixed(1);
						if(arrind>=settxt.length)
						{
							arrind=settxt.length-1;
						}
						if(setparttxt){
							
							starind.next().text(settxt[arrind]);
							starind.next().next().text(setatxt);
						}else{
							starind.next().text(settxt[arrind]+""+setatxt);
						}
						
					}
					starind.find(settings['star']).attr("star",count);
				}
				
			}
			else
			{
				starflag=false;	
			}
			
		}
		starind.find(settings['star']).attr("scole",realscole);
	});
	starind.mouseup(function(e){
		starflag=false;
		
		if(setstarflag=="half"&&count!=undefined)
		{
			var countparse=parseInt(count.toFixed(1).toString().split(".")[1]);
			if(countparse>5||countparse==0)
			{
				starind.find(settings['star']).width(count*(settings['starwid'])+parseInt(count)*settings['jj']);
			}
			else
			{
				starind.find(settings['star']).width(count*settings['starwid']+count*settings['jj']);
			}	
		}
		else if(setstarflag=="all")
		{
			starind.find(settings['star']).width(count*(settings['starwid'])+parseInt(count)*settings['jj']);
		}
		if(typeof fn==="function")
		{
			fn();
		}	
	});
	$(document).mouseup(function(){
		starflag=false;
		
	});
	document.addEventListener("dragstart",function(e){
		e.preventDefault();
	},false)
		
	
};
