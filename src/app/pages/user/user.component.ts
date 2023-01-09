import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserState } from 'src/app/states/user.state';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import * as UserActions from 'src/app/actions/user.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  currentUser$ = this.store.select((store) => store.user.currentUser);
  currentUser !: User
  userList$ = this.store.select(state => state.user.userList);
  userList: User[] = [];
  totalUser$ = this.store.select(state => state.user.total);
  total: number = 0;
  isSuccess$ = this.store.select(state => state.user.isSuccess);
  //pagination
  public itemsPerPage = 10;
  public currentPage = 1;
  public onChange(event: number): void {
    this.currentPage = event;
  }

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private store: Store<{ user: UserState }>,
    private toastController: ToastController) { }

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUserTotal());
    this.userList$.subscribe((userList) => {
      if (userList) {
        this.userList = userList.userList;
        // console.log('userList', this.userList);
      }
    });
    this.totalUser$.subscribe((total) => {
      if (total) {
        this.total = total.total;
        // console.log('total', this.total);
        this.store.dispatch(UserActions.getUserPagination({ afterID: 0, limit: this.total }));
      }
    });
    this.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user.data;
        // console.log('current user', this.currentUser);
      }
    });
  }

  //refresh page
  handleRefresh(event: any) {
    setTimeout(() => {
      this.store.dispatch(UserActions.getUserTotal());
      event.target.complete();
    }, 2000);
  };

  //search user
  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);
  }

  //-----------------update action sheet-----------------
  //edit user
  async openUpdateModal(user: User) {
    const modal = await this.modalCtrl.create({
      component: EditDialogComponent,
      componentProps: {
        user: user,
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'cancel') {
      console.log('close dialog');
    } else if (role === 'update') {
      this.presentToast(`update user: ${data.email} success`);
    }
  }
  //snackbar-update
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => { 'Dismiss clicked'; }
        }
      ]
    });

    await toast.present();
    const { role } = await toast.onDidDismiss();
    if (role === 'cancel') {
      console.log('cancel toast');
    }
  }

  //-----------------delete user-----------------
  deleteUser(user: User) {
    this.store.dispatch(UserActions.deleteUser({ user: user }));
    this.progressShow = false;
  }
  progressShow: boolean = false;
  async presentDeleteActionSheet(user: User) {
    this.progressShow = false;
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Do you want to delete this user?',
      subHeader: 'This action cannot be undone',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    if (result.data.action === 'delete') {
      this.progressShow = true;
      this.deleteUser(user);
    } else {
      console.log('cancel');
      this.progressShow = false;
    }
  }

  //handle error image
  handleError(e: any) {
    console.log(e);
    e.target.src = "../../../assets/images/eiu.jpg";
  }
}
