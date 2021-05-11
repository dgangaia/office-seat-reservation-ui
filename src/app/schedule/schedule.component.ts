import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {SeatInfoModel} from '../model/seatinfo.model';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  seatinfo: SeatInfoModel[] = [];
  seats: [];
  counter = Array;

  temp = Array;
  math = Math;
  arr = this.seatinfo;

  constructor( private http: HttpClient) {

  }

  ngOnInit() {
    this.onfetchPosts();
  }

  onfetchPosts() {
    return this.fetchSchedule();
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
      this.seatinfo = posts;
      console.log(posts);
    });
  }

}
