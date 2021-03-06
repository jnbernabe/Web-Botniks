/*
Created by: Han
Incident Repository

 */
import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { Incident } from './incident.model';
import { StaticDataSource } from './static.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class IncidentRepository {
  private incidents: Incident[] = [];
  private priorities: String[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getIncidents().subscribe((data) => {
      this.incidents = data;
    });
  }

  getIncidents(): Incident[] {
    return this.incidents;
  }

  getIncident(id: string): Incident {
    return this.incidents.find((i) => i.incidentID === id)!;
  }

  saveIncident(incident: Incident): Observable<Incident> {
    return this.dataSource.saveIncident(incident);
  }

  updateIncident(updatedIncident: Incident): void {
    this.dataSource.updateIncident(updatedIncident).subscribe((incident) => {
      this.incidents.splice(
        this.incidents.findIndex((i) => i.incidentID === incident.incidentID),
        1,
        updatedIncident
      );
    });
  }

  deleteIncident(deletedIncidentID: string): void {
    this.dataSource.deleteIncident(deletedIncidentID).subscribe((incident) => {
      this.incidents.splice(
        this.incidents.findIndex((i) => i.incidentID == deletedIncidentID),
        1
      );
    });
  }

  waitForData(): Promise<Incident[]> {
    return new Promise((resolve, reject) => {
      if (this.incidents.length == 0) {
        this.dataSource.getIncidents().subscribe((data) => {
          this.incidents = data;
          resolve(this.incidents);
          // this.priorities = data
          //   .map((i) => i.Priority!)
          //   .filter((c, index, array) => array.indexOf(c) === index)
          //   .sort();
        });
      } else {
        resolve(this.incidents);
      }
      // setTimeout(function () {

      // }, 500);
    });
  }
}
