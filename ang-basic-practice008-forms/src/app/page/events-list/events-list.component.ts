import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList: Observable<Event[]> = this.eventService.list$;

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit(): void { }

  onDelete(event: Event): void {
    this.eventService.remove(event).subscribe();
    this.eventList = this.eventService.getAll();
  }

}
