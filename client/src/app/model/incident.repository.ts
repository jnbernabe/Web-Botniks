import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { Incident } from './incident.model';
import { TestIncident } from './test-incident.model';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class IncidentRepository {
  private incidents: Incident[] = [
    // new Incident(
    //   '10',
    //   'Medium',
    //   'New',
    //   undefined,
    //   undefined,
    //   'Short Description 10',
    //   'Narrative 10',
    //   undefined
    // ),
  ];
  private priorities: String[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getIncidents().subscribe((data) => {
      this.incidents = data;
      // this.priorities = data
      //   .map((i) => i.Priority!)
      //   .filter((c, index, array) => array.indexOf(c) === index)
      //   .sort();
    });
  }

  getIncidents(): Incident[] {
    return this.incidents;
  }

  getIncident(id: string): Incident {
    return this.incidents.find((i) => i.incidentID === id)!;
  }

  addIncident(obj: Incident): void {
    this.incidents.push(obj);
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
