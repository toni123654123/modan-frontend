import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {IUser} from '../iuser';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  // @ts-ignore
  newUF: FormGroup;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.newUF = this.fb.group({
        username: [''],
        email: [''],
        password: ['']
      }
    );
  }

  // tslint:disable-next-line:typedef
  create() {
    let newU: IUser = this.newUF.value;
    this.userService.create(newU).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
