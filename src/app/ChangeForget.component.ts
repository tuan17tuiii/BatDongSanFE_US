import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServices } from './services/User.Services';
import { User } from './entities/User.entities';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule, PasswordModule, DividerModule, FloatLabelModule, InputTextModule],
    templateUrl: 'ChangeForget.component.html',
    providers: [MessageService]
})
export class ChangeForgetComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private userServices: UserServices, private router: Router, private messageService: MessageService, private activatedRoute: ActivatedRoute) { }

    ChangeForm: FormGroup;
    email: string;
    code: string;
    id: string;

    ngOnInit() {
        this.ChangeForm = this.formBuilder.group({
            newpass: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/), Validators.minLength(8)]],
            confirm: ['', [Validators.required]]
        });

        this.activatedRoute.paramMap.subscribe(p => {
            this.code = p.get('code');
            this.email = p.get('email');
            this.id = p.get('id')
            this.Retrieve(this.email, this.code, this.id);
        });
    }

    Retrieve(email: string, code: string, id: string) {
        this.userServices.findById(id).then(
            res => {
                let user: User = res as User;
                let form = this.ChangeForm.value;
                this.userServices.PasswordVerify(form.newpass, user.username).then(
                    res => {
                        if (res) {
                            this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'New Password Can Not Like Your Old Password', key: 'bl', life: 2000 });
                        } else {
                            if (form.newpass != form.confirm) {
                                this.messageService.add({ severity: 'error', summary: 'Failed !', detail: 'New Password Not Match', key: 'bl', life: 2000 });
                            } else {
                                this.userServices.ChangePass(form.newpass, user.username).then(
                                    res => {
                                        this.messageService.add({ severity: 'success', summary: 'Success !', detail: 'Change Password Success', key: 'bl', life: 2000 });
                                        this.router.navigate(['/Login']);
                                    },
                                    err => {
                                        console.log(err);
                                    }
                                );
                            }
                        }
                    },
                    err => {
                        console.log(err);
                    }
                )
            },
            err => {
                console.log(err);
            }
        )
    }


}
