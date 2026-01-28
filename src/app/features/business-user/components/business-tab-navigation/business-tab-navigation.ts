import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-tab-navigation',
  imports: [CommonModule],
  templateUrl: './business-tab-navigation.html',
  styleUrl: './business-tab-navigation.css',
})
export class BusinessTabNavigation {
  @Input() tabs: string[] = [];
  @Output() tabChanged = new EventEmitter<string>();

  activeTab = 'all-requests';

  getTabId(tab: string): string {
    return tab.toLowerCase().replace(/\s+/g, '-');
  }

  selectTab(tab: string) {
    this.activeTab = this.getTabId(tab);
    this.tabChanged.emit(this.activeTab);
  }
}
