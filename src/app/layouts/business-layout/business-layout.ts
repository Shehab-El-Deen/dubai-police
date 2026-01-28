import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-business-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './business-layout.html',
  styleUrl: './business-layout.css',
})
export class BusinessLayout {

}

