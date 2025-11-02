import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageTimePipe } from 'src/app/pipes/message-time.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { APIServicem } from 'src/app/apiservicem';



@NgModule({
  declarations: [
    MessageTimePipe
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  providers: [APIServicem],
  exports: [
    MessageTimePipe,
    MatProgressSpinnerModule,
    
    
     // Export the declared pipes, components, or directives
    // Other exports if any
  ]
})
export class SharedmoduleModule { }
