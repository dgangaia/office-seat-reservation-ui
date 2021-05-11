import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { map } from 'rxjs/operators';

import {SeatInfoModel} from '../model/seatinfo.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  userslist: SeatInfoModel[] = [];
  showMsg = false;
  showbookingMsg = false;

  availblelist: SeatInfoModel[] = [];

/*
  userslist = [
    {name: 'Arizona'},
    {name: 'California'},
    {name: 'Colorado'},
    {name: 'New York'},
    {name: 'Pennsylvania'},
  ];
*/
  scheduleForm = new FormGroup({
    seatownedby: new FormControl(this.userslist, Validators.required),
    leavestartdate: new FormControl(this.fromDate, [Validators.required, Validators.nullValidator]),
    leaveenddate: new FormControl(this.fromDate, [Validators.required, Validators.nullValidator])
  });

  bookingForm = new FormGroup({
    seatownedby: new FormControl('', [Validators.required, Validators.nullValidator]),
    seatbookedby: new FormControl('', [Validators.required, Validators.nullValidator])
  });

  constructor(private http: HttpClient) {
  }


  ngOnInit() {
    this.fetchSchedule();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.scheduleForm.value);
    this.UpdateSchedule(this.scheduleForm);
    this.showMsg = true;


  }

  fetchSchedule() {
    this.http.get('http://localhost:8080/seatinfo')
    .pipe(map(responseData => {
      const postArray = [];
      for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
          postArray.push({...responseData[key]});
          }
        }
      return postArray;
      })
    )
    .subscribe(posts => {
      this.userslist = posts;
      console.log(posts);
      // tslint:disable-next-line:forin
      for (let i in  this.userslist ) {
        if (this.userslist[i].bookingstatus === 'Available') {
           this.availblelist.push(  this.userslist[i]);
       }
     }
      console.log('Available List', this.availblelist);
    });

  }



  UpdateSchedule(formelements) {
    console.log('Dixit', formelements.value.leavestartdate);

    this.http.patch('http://localhost:8080/scheduleleaves', formelements.value)
    .pipe(map(responseData => {
      const postArray = [];
      for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
          postArray.push({...responseData[key]});
          }
        }
      return postArray;
      })
    )
    .subscribe(posts => {
      console.log(posts);
    });
  }


  onbookingSubmit() {
    console.log(this.bookingForm.value);
    this.UpdateBooking(this.bookingForm);
    this.showbookingMsg = true;
  }

  UpdateBooking(formelements) {
    this.http.patch('http://localhost:8080/booking', formelements.value)
    .pipe(map(responseData => {
      const postArray = [];
      for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
          postArray.push({...responseData[key]});
          }
        }
      return postArray;
      })
    )
    .subscribe(posts => {
      console.log(posts);
    });
  }


}
