import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../core/models/data';
import { MediaObserver } from '@angular/flex-layout';

class CarouselItem {
  positionIndex: number;
  imageIndex: number;
  transitionDuration: number;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() project: Project;

  images: string[] = [];

  positions: string[] = ['out-left', 'left', 'center', 'right', 'out-right'];

  items: CarouselItem[] = [];
  overItemIndex: number = -1;

  constructor(
    public mediasObserver: MediaObserver
  ) { }

  ngOnInit() {
    for(let i = 1; i <= parseInt(this.project.imageCount); i++) {
      this.images.push(`${this.project.key}_${i}`);
    }

    this.items = this.positions.map((v, i, a) => {
      return {
        positionIndex: i,
        imageIndex: i % this.images.length,
        transitionDuration: i === 0 || i === this.positions.length - 1 ? 0 : 0.5
      }
    });
  }

  rotate(item: CarouselItem) {
    const direction = this.getDirection(item);

    if (direction === 0) {
      return;
    }

    this.items.forEach(item => {
      const idx = item.positionIndex + direction;

      // out-left to out-right
      if (idx < 0) {
        item.positionIndex = this.positions.length - 1;
        item.transitionDuration = 0;
      }

      // out-right to out-left
      else if (idx >= this.positions.length) {
        item.positionIndex = 0;
        item.transitionDuration = 0;
      }

      else {
        item.positionIndex = idx;
        item.transitionDuration = 0.5;
      }
    });
    
    // preload images that are not shown
    const sorted = this.items.concat().sort((a,b) => a.positionIndex > b.positionIndex ? 1: -1);

    sorted[0].imageIndex = sorted[1].imageIndex -1;
    if (sorted[0].imageIndex < 0) {
      sorted[0].imageIndex = this.images.length -1;
    }

    const e = sorted.length -1;
    sorted[e].imageIndex = sorted[e -1].imageIndex +1;
    if (sorted[e].imageIndex >= this.images.length) {
      sorted[e].imageIndex = 0;
    }
  }

  getDirection(item: CarouselItem) {
    if (this.positions[item.positionIndex] === 'left') {
      return 1;
    } else if (this.positions[item.positionIndex] === 'right') {
      return -1;
    } else {
      return 0;
    }
  }
}