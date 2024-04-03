import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationPipe } from './pagination.pipe';
import { AddressPipe } from './address.pipe';
import { ResourceImagePipe } from './resource-image.pipe';
import { InnerHtmlPipe } from './inner-html.pipe';
import { ResourceFilePipe } from './resource-file.pipe';

@NgModule({
  declarations: [
    PaginationPipe,
    AddressPipe,
    ResourceImagePipe,
    InnerHtmlPipe,
    ResourceFilePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationPipe,
    AddressPipe,
    ResourceImagePipe,
    InnerHtmlPipe,
    ResourceFilePipe
  ]
})
export class PipesModule { }
