import {Component, OnInit, TemplateRef} from '@angular/core';
import {IUser} from '../iuser';
import {UserService} from '../service/user.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // @ts-ignore
  List: IUser[];
  // @ts-ignore
  newUF: FormGroup;
  // @ts-ignore
  public modalRef: BsModalRef;

  constructor(private userService: UserService,
              private modalService: BsModalService,
              private http: HttpClient,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllUser();
    this.newUF = this.fb.group({
        username: [''],
        email: [''],
        password: ['']
      }
    );
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  // @ts-ignore
  getAllUser(): IUser[] {
    this.userService.getAllUser().subscribe((data: any) => {
      this.List = data;
    });
    return this.List;
  }

  // tslint:disable-next-line:typedef
  delete(id: any) {
    if (confirm('Are you sure?')) {
      this.userService.delete(id).subscribe(value => {
        console.log('Delete', value);
        this.getAllUser();
      });
    }
  }
  // tslint:disable-next-line:typedef
  create() {
    let newU: IUser = this.newUF.value;
    this.userService.create(newU).subscribe(() => {
    });
    this.getAllUser();
  }

}
