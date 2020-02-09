import { Directive,ElementRef } from '@angular/core';
declare var $:any;
@Directive({
  selector: '[appMyOwlCarousel]'
})
export class MyOwlCarouselDirective {

  constructor(private Element: ElementRef) { }

  ngAfterViewInit() {
    
    $(this.Element.nativeElement).owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    })
  }

}
