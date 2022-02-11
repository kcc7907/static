//jcarousel
let jindex = 0;

$(".jcarousel").jcarousel();

$(".jleft").click(function () {
  if (jindex <= 0) return;
  $(".jcarousel").jcarousel("scroll", "-=1");
  jindex--;
});

$(".jright").click(function () {
  if (jindex >= $(".jcarousel li").length - 1) return;
  $(".jcarousel").jcarousel("scroll", "+=1");
  jindex++;
});

const jStart = setInterval(() => {
  const lastIndex = $(".jcarousel li").length - 1;
  if (lastIndex <= jindex) {
    $(".jcarousel").jcarousel("scroll", 0);
    jindex = 0;
    return;
  }
  $(".jcarousel").jcarousel("scroll", "+=1");
  jindex++;
}, 3000);

// owl-carousel
$(".owl-carousel").owlCarousel({
  items: 1,
  autoplay: true,
  autoplayTimeout: 3000,
  loop: true,
  nav: true,
});

// Swiper
const swiper = new Swiper(".swiper", {
  speed: 400,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});
