$(".main-review-slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay:true,
  autoplaySpeed: 2000,
  prevArrow: ".review-top",
  nextArrow: ".review-bottom",
  pauseOnHover: true,
  vertical: true,
  centerMode: true,
  centerPadding: "0px",
  asNavFor: ".main-text",
  responsive: [
    {
      breakpoint: 1199.5,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        vertical: false,
      },
    },
    {
      breakpoint: 767.5,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        vertical: false,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        vertical: false,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});
$(".main-text").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  pauseOnHover: true,
  vertical: true,
  centerMode: true,
  centerPadding: "0px",
  asNavFor: ".main-review-slider",
  responsive: [
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        vertical: false,
      },
    },
    {
      breakpoint: 767.5,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        vertical: false,
      },
    },
    {
      breakpoint: 1199.5,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        vertical: false,
      },
    },
  ],
});
