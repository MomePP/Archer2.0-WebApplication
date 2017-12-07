import { Component, TemplateRef, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as firebase from 'firebase/app';

import { UserInfoService } from '../user-info.service'

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

//export class LoginComponent {
@Injectable()
export class LoginComponent implements OnInit {

  authState: any = null;
  Users: Observable<any[]>;
  userid: String;
  inputEmail: String;
  inputPassword: String;
  userInfo: object
  modalResetPwdRef: BsModalRef


  constructor(private modalService: BsModalService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private userService: UserInfoService) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  ngOnInit(): void {

    // this.userService.currentUser.subscribe(user => this.userInfo = user)
    // console.log(this.userInfo);
  }

  openResetPwdModal(template: TemplateRef<any>){
    this.modalResetPwdRef = this.modalService.show(template);
  }

  Uidpath(): any {
    return this.authState.uid
  }
  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }


  //// Social Auth ////


  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }


  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        this.updateUserData()
        this.router.navigate(['/' + this.authState.uid]);
      })
      .catch(error => console.log(error));
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
        this.router.navigate(['/' + this.authState.uid]);
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
        this.router.navigate(['/' + this.authState.uid]);
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }


  //// Helpers ////
  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
      email: this.authState.email,
      name: this.authState.displayName
    }

    this.userService.setUserInfo(data);

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }




}