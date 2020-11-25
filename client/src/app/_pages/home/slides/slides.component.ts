import { Component, OnInit } from '@angular/core';
import { DataService, IPortfolio } from '../../../_core';
import { OwlConfigs } from './owl.config';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {
  slides: IPortfolio[];
  customOptions = OwlConfigs;

  constructor(private dataSrv: DataService) {}

  ngOnInit() {
    this.loadSlides();
  }

  loadSlides() {
    this.dataSrv.getPortfolios().subscribe((res: IPortfolio[]) => (this.slides = res));
  }
}
