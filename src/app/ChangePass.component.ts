import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './Layout.component';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule],
    providers: [MessageService],
    templateUrl: './ChangePass.component.html',

})
export class ChangePassComponent implements OnInit {

    constructor(private router: Router, private layoutComponent: LayoutComponent, private userServices: UserServices, private formBuilder: FormBuilder, private messageService: MessageService) { }

    PassForm: FormGroup;
    user: User;

    ngOnInit(): void {
        this.PassForm = this.formBuilder.group({
            current: ['', [Validators.required]],
            newpass: ['', [Validators.required]],
            confirm: ['', [Validators.required]]
        });
    }

    Save() {

        if (typeof window !== "undefined" && typeof window.sessionStorage !== "undefined") {
            this.userServices.findByUsername(sessionStorage.getItem('username')).then(
                res => {
                    if (res) {
                        let user: User = res as User;
                        let form = this.PassForm.value;
                        this.userServices.PasswordVerify(form.current, user.password).then(
                            res => {
                                console.log(res);
                                if (res) {
                                    if (form.newpass != form.confirm) {
                                        this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'New Password Not Match', key: 'bl', life: 2000 });
                                    } else if (form.newpass == form.current) {
                                        this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'New Password Can Not Like Your Old Password', key: 'bl', life: 2000 });
                                    } else {
                                        this.userServices.ChangePass(form.newpass, user.username).then(
                                            res => {
                                                this.messageService.add({ severity: 'success', summary: 'Success !', detail: 'Change Password Success', key: 'bl', life: 2000 });
                                            },
                                            err => {
                                                console.log(err);
                                            }
                                        );
                                    }
                                } else {
                                    this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Current Password Not Right', key: 'bl', life: 2000 });
                                }
                            },
                            err => {
                                this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'Current Password Not Right', key: 'bl', life: 2000 });
                            }
                        )
                    };
                },
                err => {
                    console.log(err);
                }
            );
        }
    }
}

