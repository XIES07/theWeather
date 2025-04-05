import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class SearchInputComponent implements OnInit {
  @Input() placeholderText: string = 'Buscar...';
  @Input() items: any[] = [];
  @Output() onFilterChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onItemSelected: EventEmitter<any> = new EventEmitter<any>();

  filterText: string = '';
  filteredItems: any[] = [];
  isDropdownOpen: boolean = false;
  highlightedIndex: number = -1;

  private searchSubject: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe((searchTerm) => {
      this.filterItems(searchTerm);
      this.onFilterChange.emit(searchTerm);
    });
  }

  ngOnChanges(): void {
    this.filterItems(this.filterText);
  }

  onInputChange(): void {
    this.searchSubject.next(this.filterText.trim());
    this.isDropdownOpen = true;
  }

  selectItem(item: any): void {
    this.filterText = item?.name || '';
    this.onItemSelected.emit(item);
    this.isDropdownOpen = false;
  }

  clearFilter(): void {
    this.filterText = '';
    this.filteredItems = [];
    this.isDropdownOpen = false;
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' && this.highlightedIndex < this.filteredItems.length - 1) {
      this.highlightedIndex++;
    } else if (event.key === 'ArrowUp' && this.highlightedIndex > -1) {
      this.highlightedIndex--;
    } else if (event.key === 'Enter' && this.highlightedIndex > -1) {
      const selectedItem = this.filteredItems[this.highlightedIndex];
      if (selectedItem) {
        this.selectItem(selectedItem);
      }
    }
  }

  getFormattedItem(item: any): string {
    return item?.name ? `${item.name} - ${item?.country || 'N/A'}` : 'N/A';
  }

  private filterItems(searchTerm: string): void {
    this.filteredItems = this.items.filter((item) =>
      item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }
}