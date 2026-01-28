import { Component, EventEmitter, Output, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reject-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reject-modal.html',
  styleUrls: ['./reject-modal.css']
})
export class RejectModal implements OnInit, OnDestroy {
  @Output() reject = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  rejectionReason: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    try {
      this.renderer.appendChild(document.body, this.el.nativeElement);
    } catch (e) {
      // fallback
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

  onReject(): void {
    if (this.rejectionReason.trim()) {
      this.reject.emit(this.rejectionReason);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}