$(document).ready(function(){	
			$('.menu_icon').on('click',function(){
				$('.row_base').toggleClass('expanded');
			});
			$(".menu_icon").on('click',function(){
				$(this).toggleClass('menu_shown');
			});
});