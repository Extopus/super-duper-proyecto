// password-reset.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './passreset.page.html',
  styleUrls: ['./passreset.page.scss'],
})
export class PasswordResetPage {
  passwordResetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.passwordResetForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async onResetPassword() {
    const { username, newPassword } = this.passwordResetForm.value;

    if (this.passwordResetForm.valid) {
      if (username === localStorage.getItem('username')) {
        localStorage.setItem('password', newPassword); 

        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'La contraseña ha sido actualizada.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/login']);
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Nombre de usuario no encontrado.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos correctamente. La contraseña debe tener al menos 8 caracteres.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
