import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './OutLet.component.html',
  styleUrl: './app.component.css'
})
export class OutLetComponent {
  title = 'BatDongSanFE_AD';
}
