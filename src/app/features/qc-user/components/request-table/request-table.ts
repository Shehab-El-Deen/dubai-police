import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestDetailService } from '../../../../core/services/request-detail.service';

export interface TableRequest {
  id: string;
  name: string;
  type: string;
  owner: string;
  date: string;
  status: 'Validation Failed' | 'Under Review' | 'Rejected' | 'Approved' | 'Need Review';
  priority: 'High' | 'Medium' | 'Low';
}

@Component({
  selector: 'app-request-table',
  imports: [CommonModule],
  templateUrl: './request-table.html',
  styleUrl: './request-table.css',
})
export class RequestTable {
  private requestDetailService = inject(RequestDetailService);
  
  @Input() requests: TableRequest[] = [];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number = 0;
  @Input() totalPages: number = 1;
  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();
  @Output() rowClick = new EventEmitter<TableRequest>();
  @Output() viewRequest = new EventEmitter<TableRequest>();

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems || this.requests.length);
  }

  get totalCount(): number {
    return this.totalItems || this.requests.length;
  }

  getStatusColor(status: string): string {
    switch (status) {
       case 'Validation Failed':
        return '#946800'
      case 'Rejected':
        return '#FF3B30';
      case 'Under Review':
        return '#946800';
      case 'Approved':
        return '#1A7A5E';
      case 'Need Review':
        return '#006094';
      default:
        return '#e2e3e5';
    }
  }

  getStatusBgColor(status: string): string {
    switch (status) {
      case 'Validation Failed':
        return '#FFFBD1'
      case 'Rejected':
        return '#FFD6D6';
      case 'Under Review':
        return '#FFFBD1';
      case 'Approved':
        return '#E4FAEF';
      case 'Need Review':
        return '#D1ECFF';
      default:
        return '#e2e3e5';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High':
        return '#FF3B30';
      case 'Medium':
        return '#FFCC00';
      case 'Low':
        return '#B2BBC6';
      default:
        return '#999';
    }
  }

  onNextPage() {
    this.nextPage.emit();
  }

  onPrevPage() {
    this.prevPage.emit();
  }

  onRowClick(request: TableRequest) {
    this.rowClick.emit(request);
  }

  onViewRequest(request: TableRequest) {
    this.viewRequest.emit(request);
    this.requestDetailService.selectRequest({
      id: request.id,
      name: request.name,
      type: request.type,
      owner: request.owner,
      date: request.date,
      status: request.status,
      priority: request.priority
    });
  }
}
