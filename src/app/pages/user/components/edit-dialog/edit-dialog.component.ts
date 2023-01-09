import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserState } from 'src/app/states/user.state';
import * as UserActions from 'src/app/actions/user.action';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Input('user') user !: User;
  form !: FormGroup;
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private store: Store<{ user: UserState }>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl({ value: this.user.id, disabled: true }, [Validators.required]),
      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl({value: this.user.email, disabled: true}, [Validators.required, Validators.email]),
      role: new FormControl({ value: this.user.role, disabled: true }, [Validators.required]),
      photoURL: new FormControl(this.user.photoURL, [Validators.required])
    });
    console.log('username: ',this.user.name);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  update() {
    let newForm1: User = this.form.getRawValue();
    this.store.dispatch(UserActions.updateUser({ user: newForm1 }));
    return this.modalCtrl.dismiss(newForm1, 'update');
  }

}
