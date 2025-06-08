import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-extractor',
  imports: [ReactiveFormsModule],
  templateUrl: './extractor.html',
  styleUrl: './extractor.scss'
})
export class Extractor {
  form = new FormGroup({
    file: new FormControl<File | null>(null),
    exportName: new FormControl(''),
    formats: new FormControl<string[]>([])
  });

  onSubmit() {
    console.log(this.form.value);
  }

  tabs = ['citations', 'annotations'] as const;
  activeTab: 'citations' | 'annotations' = 'citations';

  selectTab(tab: 'citations' | 'annotations') {
    this.activeTab = tab;
  }

  onKeyDown(event: KeyboardEvent) {
    console.log("key");
    const currentIndex = this.tabs.indexOf(this.activeTab);
    if (event.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % this.tabs.length;
      this.selectTab(this.tabs[nextIndex]);
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
      this.selectTab(this.tabs[prevIndex]);
      event.preventDefault();
    }
  }

  toggleFormat(format: string) {
    const selected = this.form.value.formats || [];
    if (selected.includes(format)) {
      this.form.patchValue({ formats: selected.filter(f => f !== format) });
    } else {
      this.form.patchValue({ formats: [...selected, format] });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.form.controls['file'].setValue(file);
  }
}
