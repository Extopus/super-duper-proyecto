import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';  // Importamos el plugin del teclado
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

  // Se ejecuta al hacer clic en el botón de login
  async onLogin() {
    const { username, password } = this.loginForm.value;
    const storedPassword = localStorage.getItem('password') || 'contra'; 

    localStorage.setItem('username', username);
    
    if (username === 'ben' && password === storedPassword) {
      this.router.navigate(['/home']);
      Keyboard.hide();  // Ocultar el teclado después de enviar el formulario
    } else {
      const alert = await this.alertController.create({
        header: 'Error de validación',
        message: 'Nombre de usuario y/o contraseña incorrectos.',
        buttons: ['OK']
      });
      await alert.present();
      Keyboard.hide();  // Ocultar el teclado si las credenciales son incorrectas
    }
  }

  // Redirige a la página de recuperación de contraseña
  goToPasswordReset() {
    this.router.navigate(['/passreset']);
  }

  // Método para aumentar el tamaño del texto
  async increaseTextZoom() {
    try {
      const result = await TextZoom.get();
      const newZoom = result.value + 0.1; // Aumentamos el zoom en 0.1
      await TextZoom.set({ value: newZoom });
    } catch (error) {
      console.error('Error aumentando el zoom:', error);
    }
  }

  // Método para restablecer el zoom a su valor predeterminado
  async resetTextZoom() {
    try {
      await TextZoom.set({ value: 1 }); // Establecemos el zoom a 100%
    } catch (error) {
      console.error('Error restableciendo el zoom:', error);
    }
  }

  // Método para ocultar el teclado cuando el usuario haga clic fuera del formulario
  dismissKeyboard() {
    Keyboard.hide();
  }
}
