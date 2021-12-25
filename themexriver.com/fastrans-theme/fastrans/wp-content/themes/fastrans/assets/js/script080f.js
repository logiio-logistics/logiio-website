/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
(function($) {

	"use strict";
	
	function handlePreloader() {
		if($('#preloader').length){
			$('#preloader').delay(200).fadeOut(500);
		}
	}

	var FasTrans = {
		init: function() {
			this.Basic.init();  
		},

		Basic: {
			init: function() {

				this.BackgroundImage();
				this.Animation();
				this.StickyHeader();
				this.MobileMenu();
				this.scrollTop();
				this.counterUp();
				this.PopUp();
				this.CarouselSliderJs();
				this.countDown();
				this.MilesRange();

			},
			BackgroundImage: function (){
				$('[data-background]').each(function() {
					$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
				});
			},
			Animation: function (){
				if($('.wow').length){
					var wow = new WOW(
					{
						boxClass:     'wow',
						animateClass: 'animated',
						offset:       0,
						mobile:       true,
						live:         true
					}
					);
					wow.init();
				}
			},
			StickyHeader: function (){
				jQuery(window).on('scroll', function() {
					if (jQuery(window).scrollTop() > 250) {
						jQuery('.ft-header-section').addClass('sticky-on');
					} else {
						jQuery('.ft-header-section').removeClass('sticky-on');
					}
				});
			},
			MobileMenu: function (){
				$('.open_mobile_menu').on("click", function() {
					$('.mobile_menu_wrap').toggleClass("mobile_menu_on");
				});
				$('.open_mobile_menu').on('click', function () {
					$('body').toggleClass('mobile_menu_overlay_on');
				});
				if($('.mobile_menu li.dropdown ul').length){
					$('.mobile_menu li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-angle-right"></span></div>');
					$('.mobile_menu li.dropdown .dropdown-btn').on('click', function() {
						$(this).prev('ul').slideToggle(500);
					});
				}
				$(".dropdown-btn").on("click", function () {
					$(this).toggleClass("toggle-open");
				});
			},
			scrollTop: function (){
				$(window).on("scroll", function() {
					if ($(this).scrollTop() > 200) {
						$('.scrollup').fadeIn();
					} else {
						$('.scrollup').fadeOut();
					}
				});

				$('.scrollup').on("click", function()  {
					$("html, body").animate({
						scrollTop: 0
					}, 800);
					return false;
				});
			},
				counterUp: function (){
					if($('.counter').length){
						jQuery('.counter').counterUp({
							delay: 50,
							time: 2000,
						});
					};
				},
				PopUp: function (){
					$('.zoom-gallery').magnificPopup({
						delegate: 'a',
						type: 'image',
						closeOnContentClick: false,
						closeBtnInside: false,
						mainClass: 'mfp-with-zoom mfp-img-mobile',
						gallery: {
							enabled: true
						},
						zoom: {
							enabled: true,
							duration: 300, 
							opener: function(element) {
								return element.find('img');
							}
						}
					});
				},
				CarouselSliderJs: function (){
					
					
					$("#mySlider1").AnimatedSlider( { prevButton: "#btn_prev1", 
						nextButton: "#btn_next1",
						visibleItems: 3,
						infiniteScroll: true,
						slidesToScroll: 1,
						willChangeCallback: function(obj, item) { $("#statusText").text("Will change to " + item); },
						changedCallback: function(obj, item) { $("#statusText").text("Changed to " + item); }
					});
					
					
				},
				
				countDown:  function (){
					if ($('.coming-soon-countdown').length > 0) {
						var deadlineDate = new Date('sep 26, 2023 23:59:59').getTime();
						var countdownDays = document.querySelector('.days .ft-count-down-number');
						var countdownHours = document.querySelector('.hours .ft-count-down-number');
						var countdownMinutes = document.querySelector('.minutes .ft-count-down-number');
						var countdownSeconds = document.querySelector('.seconds .ft-count-down-number');
						setInterval(function () {
							var currentDate = new Date().getTime();
							var distance = deadlineDate - currentDate;
							var days = Math.floor(distance / (1000 * 60 * 60 * 24));
							var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
							var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
							var seconds = Math.floor((distance % (1000 * 60)) / 1000);
							countdownDays.innerHTML = days;
							countdownHours.innerHTML = hours;
							countdownMinutes.innerHTML = minutes;
							countdownSeconds.innerHTML = seconds;
						}, 1000);

					};
					jQuery('.video_box').magnificPopup({
						disableOn: 200,
						type: 'iframe',
						mainClass: 'mfp-fade',
						removalDelay: 160,
						preloader: false,
						fixedContentPos: false,
					});
				},
				MilesRange: function (){
					if ($("#slider-range").length) {
						$( "#slider-range" ).slider({
							range: true,
							min: 0,
							max: 3000,
							values: [ 0, 1500 ],
							slide: function( event, ui ) {
								$( "#amount" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
							}
						});
					};
					if ($("#amount").length) {
						$( "#amount" ).val( "" + $( "#slider-range" ).slider( "values", 0 ) +
							" - " + $( "#slider-range" ).slider( "values", 1 ) );
					};
					$('.count').prop('disabled', true);
					$(document).on('click','.plus',function(){
						$('.count').val(parseInt($('.count').val()) + 1 );
					});
					$(document).on('click','.minus',function(){
						$('.count').val(parseInt($('.count').val()) - 1 );
						if ($('.count').val() == 0) {
							$('.count').val(1);
						}
					});
				},


			}
		}
		
		//Gallery Filters
		if($('.filter-list').length){
			$('.filter-list').mixItUp({});
		}
	
		jQuery(document).ready(function (){
			FasTrans.init();
		});
		
		$(window).on('load', function() {
			handlePreloader();
		});
			if($('.count-box').length){
				$('.count-box').appear_c(function(){
					var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);
					if (!$t.hasClass("counted")) {
						$t.addClass("counted");
						$({
							countNum: $t.find(".count-text").text()
						}).animate({
							countNum: n
						}, {
							duration: r,
							easing: "linear",
							step: function() {
								$t.find(".count-text").text(Math.floor(this.countNum));
							},
							complete: function() {
								$t.find(".count-text").text(this.countNum);
							}
						});
					}
				},{accY: 0});
			};
			if($('.dial').length){
				$('.dial').appear_c(function(){
					var elm = $(this);
					var color = elm.attr('data-fgColor');  
					var perc = elm.attr('value'); 
					var thickness = elm.attr('thickness');  
					elm.knob({ 
						'value': 0, 
						'min':0,
						'max':100,
						'skin':'tron',
						'readOnly':true,
						'thickness':.1,
						'dynamicDraw': true,
						'displayInput':false
					});
					$({value: 0}).animate({ value: perc }, {
						duration: 3500,
						easing: 'swing',
						progress: function () { elm.val(Math.ceil(this.value)).trigger('change');
					}
				});
				},{accY: 0});
			}
		function projectV2($scope, $) {
			$('.ft-project-slider-area').slick({
				arrow: false,
				dots: true,
				infinite: true,
				slidesToShow: 2,
				slidesToScroll: 1,
				centerMode: true,
				variableWidth: true,
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}

				]
			});
		}
		function testimonialV2($scope, $) {
			$('.ft-testimonial-slider-area').slick({
				arrow: false,
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: true,
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 799,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 599,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
				]
			});
		}

		function ftTestimonial3($scope, $) {
			$(".ft-testimonial-slider-3").slick({
				autoplay: false,
				dots: true,
				customPaging : function(slider, i) {
					var thumb = $(slider.$slides[i]).data();
					return '<a>'+(i+1)+'</a>';
				},
			});
		}
		function latestBlog3($scope, $) {
			$('.blog-slider-3').slick({
				dots: true,
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				customPaging : function(slider, i) {
					var thumb = $(slider.$slides[i]).data();
					return '<a>'+(i+1)+'</a>';
				},
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}

				]
			});
		}

		function whatwedoSlide($scope, $) {
			$('.ft-service-slider-wrapper').slick({
				arrow: false,
				dots: true,
				infinite: false,
				slidesToShow: 3,
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}

				]
			});
		}
		function teamSliderV2($scope, $) {
			$('.ft-team2-slider-wrapper').slick({
				arrow: false,
				dots: true,
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 400,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}

				]
			});
		}
		function whatwedoSlideV2($scope, $) {
			$('.ft-service-slider-2').slick({
				arrow: false,
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				dots: true,
				responsive: [
				{
					breakpoint: 1100,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 799,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 599,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
				]
			});
		}
		function portfolioActive2($scope, $) {
			$('.ft-portfolio-slider-2').slick({
				arrow: false,
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				dots: true,
				responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 799,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 599,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
				]
			});
		}

		function ftBlogSlide2($scope, $) {
			$('.ft-blog-slider-2').slick({
				arrow: true,
				dots: false,
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				prevArrow: ".blg-left_arrow",
				nextArrow: ".blg-right_arrow",
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}

				]
			});
		}
		function projectv5($scope, $) {
			$('.ft-portfolio-slider-5').slick({
				centerMode: true,
				slidesToShow: 1,
				centerPadding: '535px',
				dots: true,
				arrow: false,
				responsive: [
					{
						breakpoint: 1500,
						settings: {
							slidesToShow: 1,
							centerPadding: '50px',							
							centerMode: true,
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 1,
							centerPadding: '150px',							
							centerMode: true,
						}
					},
					{
						breakpoint: 800,
						settings: {
							slidesToShow: 1,
							centerPadding: '150px',							
							centerMode: true,
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							centerPadding: '50px',							
							centerMode: true,
						}
					},
					{
						breakpoint: 500,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerPadding: '50px',							
							centerMode: true,
						}
					}
	
					]
			  });
		}
		function serviceAslide($scope, $) {
			$('.fs-awesome-slide').slick({
				slidesToShow: 1,
				dots: false,
				arrow: true,
			  });
		}
		function testimonialV4($scope, $) {
			$('.ft-testimonial-slider-4').slick({
				slidesToShow: 1,
				arrow: false,
				dots: true,
			  });
		}
		function postv4Slider($scope, $) {
			$('.ft-post-4-slider').slick({
				slidesToShow: 2,
				arrow: true,
				dots: false,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: true,
						}
					},
					{
						breakpoint: 800,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 500,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
	
					]
			  });
		}
		function transportSlideActive($scope, $) {
		// Product Carousel Slider
			if ($('.main-slider-two .image-carousel').length && $('.main-slider-two .thumbs-carousel').length) {

				var $sync1 = $(".main-slider-two .image-carousel"),
					$sync2 = $(".main-slider-two .thumbs-carousel"),
					flag = false,
					duration = 500;

					$sync1
						.owlCarousel({
							loop:true,
							items: 1,
							margin: 0,
							nav: true,
							navText: [ '<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>' ],
							dots: false,
							autoplay: true,
							autoplayTimeout: 5000
						})
						.on('changed.owl.carousel', function (e) {
							if (!flag) {
								flag = false;
								$sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
								flag = false;
							}
						});

					$sync2
						.owlCarousel({
							loop:true,
							margin: 0,
							items: 1,
							nav: false,
							navText: [ '<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>' ],
							dots: false,
							center: false,
							autoplay: true,
							autoplayTimeout: 5000,
							responsive: {
								0:{
									items:1,
									autoWidth: false
								},
								400:{
									items:2,
									autoWidth: false
								},
								600:{
									items:3,
									autoWidth: false
								},
								900:{
									items:4,
									autoWidth: false
								},
								1400:{
									items:4,
									autoWidth: false
								},
								1600:{
									items:5,
									autoWidth: false
								}
							},
						})
						
				.on('click', '.owl-item', function () {
					$sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
				})
				.on('changed.owl.carousel', function (e) {
					if (!flag) {
						flag = true;		
						$sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
						flag = false;
					}
				});
				
			}
		}

		function transProjectCarousel($scope, $) {
			$('.project-carousel-two').owlCarousel({
				loop:true,
				margin:0,
				nav:true,
				center:true,
				smartSpeed: 700,
				autoplay: 5000,
				navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
				responsive:{
					0:{
						items:1
					},
					600:{
						items:1
					},
					800:{
						items:1
					},
					1024:{
						items:1
					},
					1200:{
						items:1
					},
					1400:{
						items:1
					},
					1600:{
						items:1
					}
				}
			});
		}
		function transTeamCarousel($scope, $) {
			$('.team-carousel-two').owlCarousel({
				loop:true,
				margin:0,
				nav:true,
				autoplayHoverPause: true, // Stops autoplay
				smartSpeed: 500,
				autoplay: 6000,
				navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
				responsive:{
					0:{
						items:1
					},
					600:{
						items:2
					},
					800:{
						items:2
					},
					1024:{
						items:3
					},
					1200:{
						items:4
					}
				}
			});  
		}
		function transportTestimonial($scope, $) {
			$('.single-item-carousel').owlCarousel({
				//animateOut: 'fadeOut',
				//animateIn: 'fadeIn',
				loop:true,
				margin:0,
				nav:true,
				autoplayHoverPause: true, // Stops autoplay
				smartSpeed: 500,
				autoplay: 6000,
				navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
				responsive:{
					0:{
						items:1
					},
					600:{
						items:1
					},
					800:{
						items:1
					},
					1024:{
						items:1
					},
					1200:{
						items:1
					}
				}
			});  
		}

		

		$(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_our_testimonials.default', ftTestimonial3);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_latest_news.default', latestBlog3);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_what_we_do.default', whatwedoSlide);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_our_projects_v2.default', projectV2);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_our_testimonials_v2.default', testimonialV2);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_what_we_do_v2.default', whatwedoSlideV2);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_our_projects_v3.default', portfolioActive2);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_latest_news_v3.default', ftBlogSlide2);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_our_team_v3.default', teamSliderV2);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_our_projects_v5.default', projectv5);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_our_awesome_service.default', serviceAslide);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_our_testimonials_v4.default', testimonialV4);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_latest_news_v4.default', postv4Slider);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrance_transport_slider.default', transportSlideActive);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_transport_project_car.default', transProjectCarousel);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_transport_team.default', transTeamCarousel);
			elementorFrontend.hooks.addAction('frontend/element_ready/fastrans_transport_testimonial.default', transportTestimonial);
		});

})(window.jQuery);