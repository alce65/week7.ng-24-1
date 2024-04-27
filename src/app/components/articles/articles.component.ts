import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'isdi-articles',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h2>Articles</h2>
    @if (stateService.getState() | async; as state) {
    <ul>
      @for (item of state.articles; track $index) {
      <li>{{ item.title }}</li>
      }
    </ul>
    }
  `,
  styles: ``,
})
export default class ArticlesComponent {
  stateService = inject(StateService);
  constructor() {
    this.stateService.loadArticles();
  }
}
