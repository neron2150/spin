import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './game';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'spin';

  ngOnInit(): void {
    document.getElementById('pixiContainer')?.appendChild(Game.app.view as HTMLCanvasElement);
    Game.init();
  }
  onSpin() {
    Game.spin();
  }
}
