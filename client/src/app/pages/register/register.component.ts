/*
Created by: Jaamaal
Register Screen
Last Edited: November 28, 2021

 */
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgModel,
} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { RegisterPostService } from 'src/app/config/register.post.service';
import { AuthService } from '../../services/auth/auth.service';
import { AppToastService } from 'src/app/partials/toast/app-toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  edituser!: User | null;
  userForm!: FormGroup;
  userProfile!: User;
  @Input() value: string | any;

  constructor(
    private registerForm: FormBuilder,
    private newUser: RegisterPostService,
    private auth: AuthService,
    private toast: AppToastService
  ) {}

  ngOnInit() {
    this.userForm = this.registerForm.group({
      username: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      displayName: [null, [Validators.required]],
      userType: [null, [Validators.required]],
      Password: [null, [Validators.required]],
    });
  }

  ngOnDestroy() {}

  editUser(id: string) {
    this.newUser.getUsers().subscribe((users: User[]) =>
      users.forEach((user: User) => {
        if (user.username == id) {
          this.edituser = user;
        }
      })
    );
  }

  getUser() {
    this.newUser.getUsers().subscribe((users: User[]) => console.log(users));
  }
  addUser() {
    this.newUser.registerUser(this.userProfile).subscribe((data) => {
      this.auth.setLocalStorage(data);
    });
  }

  createUser() {
    this.userProfile = new User(
      this.userForm.value.username,
      this.userForm.value.email,
      this.userForm.value.displayName,
      this.userForm.value.firstName,
      this.userForm.value.lastName,

      this.userForm.value.userType,
      this.userForm.value.Password
    );
  }

  onSubmit(): void {
    if (this.userForm.invalid) {

      this.toast.showDanger('Form in not complete');
    } else {
      this.toast.showSuccess('User Successfully created!');
    }

    this.createUser();

    this.addUser();

    // this.userForm.reset();
  }
}
