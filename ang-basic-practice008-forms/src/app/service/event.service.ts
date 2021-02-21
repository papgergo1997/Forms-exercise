import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  list$: Observable<Event[]>;
  apiUrl: string = 'http://localhost:3000/events';


  constructor(private http: HttpClient,) {
    this.list$ = this.getAll();
  }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  get(id: number): Observable<Event> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const ev: Observable<Event> | undefined = this.http.get<Event>(`${this.apiUrl}/${id}`);
    if (id == 0) {
      return of(new Event());
    } else
      return ev;
  }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/${event.id}`, event);
  }

  remove(event: Event): Observable<Event> {
    console.log(event);
    return this.http.delete<Event>(`${this.apiUrl}/${event.id}`);
  }
}
