import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RequestDetail {
  id: string;
  name: string;
  type: string;
  owner: string;
  date: string;
  status: string;
  priority: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestDetailService {
  private selectedRequestSubject = new BehaviorSubject<RequestDetail | null>(null);
  public selectedRequest$ = this.selectedRequestSubject.asObservable();

  private isModalOpenSubject = new BehaviorSubject<boolean>(false);
  public isModalOpen$ = this.isModalOpenSubject.asObservable();

  selectRequest(request: RequestDetail) {
    this.selectedRequestSubject.next(request);
    this.isModalOpenSubject.next(true);
  }

  closeModal() {
    this.isModalOpenSubject.next(false);
    this.selectedRequestSubject.next(null);
  }

  getSelectedRequest(): RequestDetail | null {
    return this.selectedRequestSubject.value;
  }
}
