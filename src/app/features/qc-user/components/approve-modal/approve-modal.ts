import { Component, EventEmitter, Output, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approve-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approve-modal.html',
  styleUrls: ['./approve-modal.css']
})
export class ApproveModal implements OnInit, OnDestroy {
  @Output() approve = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    try {
      this.renderer.appendChild(document.body, this.el.nativeElement);
    } catch (e) {
      // fallback: do nothing
    }
  }

  ngOnDestroy(): void {
    const parent = this.el.nativeElement.parentNode;
    try {
      if (parent) {
        this.renderer.removeChild(parent, this.el.nativeElement);
      }
    } catch (e) {
      // ignore
    }
  }

  onApprove(): void {
    this.approve.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}