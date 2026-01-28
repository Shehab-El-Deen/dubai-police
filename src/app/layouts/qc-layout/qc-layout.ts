import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-qc-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './qc-layout.html',
  styleUrl: './qc-layout.css',
})
export class QcLayout {

}

