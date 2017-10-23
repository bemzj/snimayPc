$(function(){
	$(document).on('click','.selected',function(){
		index = $(this).val();
		$('.open').text("您的选择："+$(this).text());
		$(this).css('background-color','#00f1fa');
		$(this).siblings('li').css('background-color','#066162');
	});
})
