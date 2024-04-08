import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'chris', 'anna', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })

    // subscription on each value changes in the form
    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   })

    // subscription on each field status changes in the form
    // this.signupForm.statusChanges.subscribe(
    //   (status) => {
    //     console.log(status);
    //   })

    // subscription on email field status changes in the form
    // this.signupForm.get('userData.email').statusChanges.subscribe(
    //   (status) => {
    //     console.log(status);
    //   })
  }
  onSubmit() {
    console.log(this.signupForm);
  }
  AddHobby() {
    const control = new FormControl(null, Validators.required);
    // (<FormArray>this.signupForm.get('hobbies')).push(control);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'dmakwana651@rku.ac.in') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }
}

/*
>>> this is the binding this keyword for names and emails, answer given by ai

In the provided code snippet, the forbiddenNames function is being passed as a validator to the 'username' FormControl, and the forbiddenEmails function is being passed as a validator to the 'email' FormControl.

When passing this.forbiddenNames.bind(this) as a validator to the 'username' FormControl, the bind(this) part explicitly binds the this keyword of the forbiddenNames function to the class instance. This is necessary because forbiddenNames is a regular function, and without binding this, it would not have access to the class properties.

On the other hand, when passing this.forbiddenEmails as a validator to the 'email' FormControl, the this keyword is not explicitly bound using bind(this). This is because forbiddenEmails is using an arrow function inside the Promise constructor, which automatically captures the this value from the surrounding code (in this case, the class instance). So, there is no need to explicitly bind this in this case
*/