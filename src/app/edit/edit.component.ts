import {Component, OnInit} from '@angular/core';
import {IUser} from '../iuser';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: any;
  // @ts-ignore
  user: IUser;
  // @ts-ignore
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private activate: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
    this.activate.params.subscribe((params: Params) => {
      this.id = params.id;
      this.userService.getUserById(this.id).subscribe(result => {
        this.user = result;
        this.userForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          password: this.user.password
        });
      });
    });
  }

  // tslint:disable-next-line:typedef
  update() {
    if (!this.userForm.invalid) {
      this.user.username = this.userForm.value.username;
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
    }
    this.userService.update(this.user).subscribe(result => {
      alert('Update successfully');
      this.router.navigate(['']);
    }, error => {
      console.log(error);
    });
  }
}
