import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainpages/header/header.component';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';
import { FooterComponent } from './components/mainpages/footer/footer.component';
import { SharedmoduleModule } from './components/sharedmodule/sharedmodule.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [AppComponent, HeaderComponent, FooterComponent, AboutpageComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        // MatInputModule,
        // MatButtonModule,
        MatIconModule,
        // MatTreeModule,
        // MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        SharedmoduleModule], providers: [
            HttpClient,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true,
            },
            provideHttpClient(withInterceptorsFromDi()),
        ]
})
export class AppModule { }
