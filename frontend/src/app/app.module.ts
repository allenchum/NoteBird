// Import Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// Import Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { RelatedContentComponent } from './related-content/related-content.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FacebookComponent } from './facebook/facebook.component';
import { LoginComponent } from './login/login.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProfileControlPanelComponent } from './profile-control-panel/profile-control-panel.component';
import { ProfileDisplayBoardComponent } from './profile-display-board/profile-display-board.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

// Import Services
import { NoteImageService } from './note-image.service';
import { NotePinService } from './note-pin.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { FacebookAuthService } from './facebook-auth.service';
import { FilterService } from './filter.service';
import { NotesService } from './notes.service';
import { UploadService } from './image-upload.service';
import { ExploreService } from './explore.service';
import { UserInformService } from './user-inform.service';
import { NoteInitService } from './note-init.service';


// Import Pipe
import { SearchFilterPipe } from './search-filter.pipe';
import { DisplayPageComponent } from './display-page/display-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainFrameComponent,
    RelatedContentComponent,
    CreateBoardComponent,
    TextEditorComponent,
    ProfilePageComponent,
    FacebookComponent,
    LoginComponent,
    SearchBoxComponent,
    ProfileControlPanelComponent,
    ProfileDisplayBoardComponent,
    ExplorePageComponent,
    SearchFilterPipe,
    SearchBarComponent,
    DisplayPageComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    NoteImageService,
    NotePinService,
    AuthService,
    AuthGuard,
    OAuthService,
    FacebookAuthService,
    FilterService,
    ExploreService,
    NotesService,
    UserInformService,
    UploadService,
    NoteInitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
