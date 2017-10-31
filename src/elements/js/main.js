$(document).ready(function() {
/* portfolio */
$(function() {
var selectedClass = "";
$(".btn").click(function(){ 
	selectedClass = $(this).attr("data-rel"); 
    $("#portfolio").fadeTo(100, 0.1);
	$("#portfolio div").not("."+selectedClass).fadeOut().removeClass('scale-anm');
			
    setTimeout(function() {
      $("."+selectedClass).fadeIn().addClass('scale-anm');
      $("#portfolio").fadeTo(300, 1);
    }, 300); 
});
});

// /* content10 */  
// $(function() {
// $("#partners-slider").owlCarousel({
//     	autoPlay: 1500,
//     	stopOnHover: true,
//     	items: 6,
//     	itemsDesktop: [1170, 5],
//     	itemsDesktopSmall: [1024, 4],
//     	itemsTabletSmall: [768, 3],
//     	itemsMobile: [480, 1],
//     	pagination: !1,
//     	navigation: !1
// 	});
// });
	
// /* content22 */ 
// $(function() {
// $("#testimonials").owlCarousel({
//     	autoPlay: 1500,
//     	stopOnHover: true,
//     	items: 2,
//     	itemsDesktop: [1170, 2],
//     	itemsDesktopSmall: [1024, 2],
//     	itemsTabletSmall: [768, 1],
//     	itemsMobile: [480, 1],
//     	pagination: !1,
//     	navigation: !1
// 	});
// });
	
// /* skills2 */	
// $(function() {
// 	$('.chart').easyPieChart({
//     	scaleColor: "#62b151",
//     	lineWidth: 20,
//     	lineCap: 'butt',
//     	barColor: '#62b151',
//     	trackColor:	"#ecf0f1",
//     	size: 160,
//     	animate: 500
// 	});
// });
	
// /* skills3 */
// $(function() {
// 	$('.chart2').easyPieChart({
//     	scaleColor: "#e74c3c",
//     	lineWidth: 20,
//     	lineCap: 'butt',
//     	barColor: '#e74c3c',
//     	trackColor:	"#282828",
//     	size: 160,
//     	animate: 500
// 	});
// });
	
// /* navigation2 */
// $(function() {
// 	$('#toggle').click(function() {
//    		$(this).toggleClass('active');
//    		$('#overlay').toggleClass('open');
// 	});
// });

// /* content32 */  
// $(function() {
// $("#phone-slider").owlCarousel({
//     	autoPlay: 1500,
//     	stopOnHover: true,
//     	items: 1,
//     	itemsDesktop: [1170, 1],
//     	itemsDesktopSmall: [1024, 1],
//     	itemsTabletSmall: [768, 1],
//     	itemsMobile: [480, 1],
//     	pagination: !1,
//     	navigation: !1
// 	});
// });
	
/* navigation8 */
$(".mobile-menu").click(function() {
    $(".menu").slideToggle();
});
	
});


