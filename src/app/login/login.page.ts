import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';  
import { TextZoom } from '@capacitor/text-zoom';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  async onLogin() {
    const { username, password } = this.loginForm.value;
    const storedPassword = localStorage.getItem('password') || '12345678'; 

    localStorage.setItem('username', username);
    
    if (username === 'ben' && password === storedPassword) {
      this.router.navigate(['/home']);
      Keyboard.hide();  
    } else {
      const alert = await this.alertController.create({
        header: 'Error de validación',
        message: 'Nombre de usuario y/o contraseña incorrectos.',
        buttons: ['OK']
      });
      await alert.present();
      Keyboard.hide();  
    }
  }


  goToPasswordReset() {
    this.router.navigate(['/passreset']);
  }

  async increaseTextZoom() {
    try {
      const result = await TextZoom.get();
      const newZoom = result.value + 0.1; 
      await TextZoom.set({ value: newZoom });
    } catch (error) {
      console.error('Error aumentando el zoom:', error);
    }
  }


  async resetTextZoom() {
    try {
      await TextZoom.set({ value: 1 }); 
    } catch (error) {
      console.error('Error restableciendo el zoom:', error);
    }
  }


  dismissKeyboard() {
    Keyboard.hide();
  }
}
