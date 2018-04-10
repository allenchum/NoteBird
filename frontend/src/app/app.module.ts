import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RelatedContentComponent } from './related-content/related-content.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { NoteImageService } from './note-image.service';
import { NotePinService } from './note-pin.service';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { FacebookComponent } from './facebook/facebook.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { FacebookAuthService } from './facebook-auth.service';
import { FilterService } from './filter.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainFrameComponent,
    RelatedContentComponent,
    CreateBoardComponent,
    TextEditorComponent,
    FacebookComponent,
    LoginComponent,
    UsersComponent,
    SearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    NoteImageService,
    NotePinService,
    AuthService,
    UserService,
    AuthGuard,
    OAuthService,
    FacebookAuthService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
