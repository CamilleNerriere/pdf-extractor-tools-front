import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtractorService } from '../../services/extractor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-extractor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './extractor.html',
  styleUrl: './extractor.scss'
})
export class Extractor {

  private extractorService = inject(ExtractorService);
  private snackBar = inject(MatSnackBar);
  isLoading = false;


  form = new FormGroup({
    file: new FormControl<File | null>(null, [Validators.required]),
    exportName: new FormControl('', [Validators.required]),
    formats: new FormControl<string[]>([], [Validators.required])
  });

  //manual reset gestion for input file
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // mode gestion
  tabs = ['citations', 'annotations'] as const;
  activeTab: 'citations' | 'annotations' = 'citations';

  selectTab(tab: 'citations' | 'annotations') {
    this.activeTab = tab;
  }

  onKeyDown(event: KeyboardEvent) {
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
    this.form.controls['file'].markAsTouched();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {
      const formData = this.convertToFormData(this.form.value);
      this.extractorService.extract(this.activeTab, formData).subscribe({
        next: blob => {

          if (blob != null) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'result.zip';
            a.click();
            window.URL.revokeObjectURL(url);

            this.form.reset();
            this.fileInput.nativeElement.value = '';

            this.snackBar.open('Téléchargement terminé !', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            });
          } else {
            this.snackBar.open('Aucune donnée à extraire. Veuillez sélectionner un autre pdf.', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            });
          }

          this.isLoading = false;
        },
        error: error => {
          this.snackBar.open('Erreur lors de l’export', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });
          this.isLoading = false;
        }
      })
    } catch (error) {
      this.snackBar.open('Erreur lors de l’export', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
      this.isLoading = false;
    }
  }

  convertToFormData(values: Partial<{ file: File | null; exportName: string | null; formats: string[] | null; }>): FormData {
    const formData = new FormData();
    const file = values.file;
    const title = values.exportName;
    const formats = values.formats;


    if (file) formData.append('file', file);
    if (title) formData.append('title', title);
    if (formats && formats.length > 0) {
      formats.forEach(format => formData.append('formats', format));
    }

    return formData;
  }

}
