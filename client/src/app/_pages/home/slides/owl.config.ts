import { OwlOptions } from 'ngx-owl-carousel-o';

export const OwlConfigs: OwlOptions = {
  loop: true,
  autoplay: true,
  center: true,
  dots: true,
  autoHeight: true,
  autoWidth: true,
  responsive: {
    0: {
      items: 1,
    },
    777: {
      items: 1,
    },
    1280: {
      items: 2,
    },
  },
};
