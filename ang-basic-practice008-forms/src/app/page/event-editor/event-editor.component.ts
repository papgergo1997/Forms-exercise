import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, timeout } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';
import { Location } from 'src/app/model/location';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az url-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap(params => this.eventService.get(params.id))
  );
  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void { }

  onUpdate(form: NgForm, event: Event): void {
    if (event.id !== 0) {
      this.submitted = true;
      this.eventService.update(event).subscribe(
        ev => this.router.navigate([''])
      );
      this.toaster.info('You have successfully updated your event!', 'Updated', { timeOut: 3000 });
    } else {
      this.submitted = true;
      this.eventService.create(event).subscribe(
        ev => this.router.navigate([''])
      );
      this.toaster.success('You have successfully created a new event!', 'Created', { timeOut: 3000 });
    }
  }

}
