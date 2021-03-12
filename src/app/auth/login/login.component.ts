import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.renderButton();
  }
    
  login() {
    console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value)
      .subscribe(res => {
        if(this.loginForm.get('remember').value){
          localStorage.setItem('email', this.loginForm.get('email').value);
        }
        else {
          localStorage.removeItem('email');
        }
        
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        console.warn(err);
        Swal.fire('Error', err.error.msg, 'error');
      });
    
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  
  
  /*onSuccess(googleUser) {
    //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    //console.log('Logged in as: ' + googleUser.getAuthResponse().id_token);
  }
  
  onFailure(error) {
    console.log(error);
  }*/

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      /*'onsuccess': this.onSuccess,*/
      /*'onfailure': this.onFailure*/
    });

    this.startApp();
  }

  async startApp()  {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
          this.usuarioService.loginGoogle(id_token).subscribe(res => {
            this.ngZone.run(()=> {
              this.router.navigateByUrl('/dashboard');
            });
          });
          
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
