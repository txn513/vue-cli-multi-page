<template>
	<div class="x_calendar_wrap">
		<div class="xc_header">
			<div class="xc_header_date">{{year}}年{{month}}月</div>
			<div class="xc_header_left" @click="bindLeft"></div>
			<div class="xc_header_right" @click="bindRight"></div>
		</div>
		<div class="xc_content">
			<div class="xc_week_sec">
				<div class="xc_week_day">日</div>
				<div class="xc_week_day">一</div>
				<div class="xc_week_day">二</div>
				<div class="xc_week_day">三</div>
				<div class="xc_week_day">四</div>
				<div class="xc_week_day">五</div>
				<div class="xc_week_day">六</div>
			</div>
			<div class="xc_days">
				<!-- <div class="xc_day_single">
					<div class="xc_day_date_num xc_day_single_child">1</div>
					<div class="xc_day_price xc_day_single_child">10000</div>
					<div class="xc_day_balance xc_day_single_child">剩余</div>
				</div> -->
				<div class="xc_day_single" v-for="item in squareValue" track-by="$index">

					<div class="xc_day_date_num xc_day_single_child">{{item}}</div>
					<div class="xc_day_price xc_day_single_child">10000</div>
					<div class="xc_day_price xc_day_single_child">10000</div>
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import VueResource from 'vue-resource';
Vue.use(VueResource);
console.dir(Vue);
module.exports = {
	components:{
		
	},
	data: function () {
		return {
			year : 1970,
			month : 1,
			date : 1,
			daysNum : 0,
			firstDatePos : 0,
			maxDaySquare: 0, //最多方块数量-4周28块-5周35块-6周42块
			squareValue: [],
		}
	},
  	created: function(){
  		this.init();
  	},
	methods:{
		init: function(){
			this.year = this.getCurrentYear();
			this.month = this.getCurrentMonth();
			this.date = this.getCurrentDate();
			
			this.setSquareValue();
			//this.el = this.params.el || 'body';  //容器 默认body
			// this.firstDatePos = this.getFirstDayPos();
			//this.renderWrap();
			//this.renderHtml();
			//this.renderData();
			//this.bindSwichMonthClick();
		},
		getCurrentFullDate: function(){
			return new Date();
		},
		getCurrentDate: function(){
			return this.getCurrentFullDate().getDate();
		},
		getCurrentYear: function(){
			return this.getCurrentFullDate().getFullYear();
		},
		getCurrentMonth: function(){
			return this.getCurrentFullDate().getMonth()+1;
		},
		getNewDate: function(newDate){
			return new Date(newDate).getDate(); 
		},
		getNewMonth: function(newDate){
			return new Date(newDate).getMonth()+1; 
		},
		getNewFullYear: function(newDate){
			return new Date(newDate).getFullYear(); 
		},
		getFirstDayPos: function(date){
			var newDate = new Date(date);
			var firstDate = newDate.getFullYear() + '-' + (newDate.getMonth()+1);
			return new Date(firstDate).getDay();
		},
		getDaysNum: function(month,year){
			if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
				return 31;
			}
			else if (month == 4 || month == 6 || month == 9 || month == 11){
				return 30;
			}
			else if (month == 2) {
                return year % 4 == 0 ? 29 : 28;
            }
		},
		lastDayPos: function(){
			var firstDayPos = this.getFirstDayPos(this.year+'-'+this.month+'-'+this.date);
			var maxDayNum = this.getDaysNum(this.month,this.year);
			return firstDayPos+maxDayNum;
		},
		setCalSquareNum: function(){
			var lastDayPos = this.lastDayPos(); //每月最后一天位置
			if(lastDayPos <=28){
				this.maxDaySquare = 28;
			}
			else if (lastDayPos > 28 && lastDayPos <= 35){
				this.maxDaySquare = 35;
			}
			else {
				this.maxDaySquare = 42;
			}

		},
		setSquareValue: function(){
			this.setCalSquareNum();
			var firstDayPos = this.getFirstDayPos(this.year+'-'+this.month+'-'+this.date);
			var lastDayPos = this.lastDayPos();
			this.squareValue = [];
			for(var i=0; i<this.maxDaySquare; i++){
				if(i >= firstDayPos && i < lastDayPos){
					this.squareValue.push(i-firstDayPos+1);
				}
				else {
					this.squareValue.push('');
				}
				
				//Vue.set(this.squareValue, i, '');
			}
			//console.log(this.squareValue);
		},
		bindRight: function(){
			this.month++;
			if(this.month>12){
				this.year++;
				this.month = 1;
			};
			this.setSquareValue();
		},
		bindLeft: function(){
			this.month--;
			if(this.month<=0){
				this.year--;
				this.month = 12;
			}
			this.setSquareValue();
		}
	},
	props:{
		
	}
}
</script>

<style scoped lang="scss">
/* 变量 */
$mainColor: #ec7b2e !default; 	//主色
$calBgColor: #fff;   			//日历背景色
$calWidth: 500px;  				//日历宽
$calHeight: 500px;				//日历高
$fontStack: "Microsoft Yahei";
$dayBorderColor: #e3e3e3;    	//单个日边框颜色
$calBorderColor: #e3e3e3;		//日历边框颜色

/* 头部 */
$calHeadBgColor: $mainColor;  	//日历头部区域颜色
$calHeadHeight: 38px;    		//日历头部区域高度
/* END 头部 */

/* 内容 */
$calWeekDayHeight: 26px;      	//日历星期高度
$calWeekDayBgColor: #f5f5f5; 	//日历星期背景色
$calWeekDayTextAlign: center;
$calWeekDayTextColor: #7c7c7c;
$calWeekDayTextSize: 12px;

$calSingleDayHeight: 50px;

/* END 内容 */

/* END 变量 */ 

@mixin box-sizing ($sizing){
	-webkit-box-sizing: $sizing;
	-moz-box-sizing: $sizing;
	box-sizing: $sizing;
}
@mixin flex-box{
	display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */ 
	display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */ 
	display: -ms-flexbox; /* TWEENER - IE 10 */ 
	display: -webkit-flex; /* NEW - Chrome */ 
	display: flex;
}
@mixin flex-column{
	-webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -moz-box-orient:vertical;
    -moz-box-direction:normal;
    -webkit-flex-direction:column;
    flex-direction:column;
}
@mixin flex-align-items ($dir){
	-ms-align-items:$dir;
	-moz-align-items:$dir;
	-webkit-align-items:$dir;
	align-items:$dir;
}
@mixin flex ($divide:1) {
	-webkit-box-flex: $divide; /* OLD - iOS 6-, Safari 3.1-6 */ 
	-moz-box-flex: $divide; /* OLD - Firefox 19- */ 
	-webkit-flex: $divide; /* Chrome */ 
	-ms-flex: $divide; /* IE 10 */ 
	flex: $divide; 
}
@mixin clearFix {
	zoom: 1;
	&:after {
		content:'';
		display: block;
		clear: both;
		visibility: hidden;
	}
}
@mixin float($dir) {
	float: $dir;
}
.clearFix{
	zoom: 1;
	&:after {
		content:'';
		display: block;
		clear: both;
		visibility: hidden;
	}
}
.x_calendar_wrap * {
	@include box-sizing(border-box);
}
.x_calendar_wrap {
	font-family: $fontStack;
	width: $calWidth;
	//height: $calHeight;
	background: $calBgColor;
	.xc_header {
		height: $calHeadHeight;
		width: $calWidth;
		background-color: $calHeadBgColor;	
		text-align: center;
		position: relative;
		.xc_header_date {
			color: #fff;
			height: $calHeadHeight;
			line-height: $calHeadHeight;
		}
		.xc_header_left {
			width: 100px;
			height: $calHeadHeight;
			position: absolute;
			top: 0;
			left: 0;
			background: blue;
			cursor: pointer;
		}
		.xc_header_right {
			@extend .xc_header_left;
			left: 400px;
		}
	}
	.xc_content {
		width: $calWidth;
		.xc_week_sec {
			@include flex-box;
			border-left: 1px solid #e3e3e3;
			border-right: 1px solid #e3e3e3;
			.xc_week_day {
				@include flex;
				height: $calWeekDayHeight;
				background-color: $calWeekDayBgColor;
				line-height: $calWeekDayHeight;
				text-align: $calWeekDayTextAlign;
				color: $calWeekDayTextColor;
				
			}
		}
		.xc_days {
			border-bottom: 1px solid #e3e3e3;
			border-left: 1px solid #e3e3e3;
			width: $calWidth;
			// @include box-sizing(content-box);
			@include clearFix;
			.xc_day_single {
				width: (($calWidth)-1)/7;
				height: $calSingleDayHeight;
				@include flex-box;
				@include float(left);
				border-top: 1px solid #e3e3e3;
				border-right: 1px solid #e3e3e3;
				@include flex-column;
				padding: 3px 4px 4px 4px;
				.xc_day_single_child {
					// @include flex;
					font-size: 12px;
					// @include flex-align-items(center);
					height: 14px;
					line-height: 14px;
				}
				.xc_day_date_num {
					text-align: left;
					color: #c7c8c8;
				}
				.xc_day_price {
					text-align: right;
					color: $mainColor;
				}
				.xc_day_balance {
					text-align: right;
					color: $mainColor;
				}
			}
		}
		
	}
}

</style>