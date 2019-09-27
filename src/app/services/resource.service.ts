import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Serializer} from '../serializers/serializer';
import {QueryOptions} from '../models/query-options';
import {Resource} from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService<T extends Resource> {
  constructor(
    private httpClient: HttpClient,
    private url: string,
    private serializer: Serializer) {
  }

  public create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}/${item.id}/`,
        this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  read(id: number): Observable<T> {
    return this.httpClient
      .get(`${this.url}/${id}/`)
      .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }

  list(queryOptions?: QueryOptions): Observable<T[]> {
    let url = `${this.url}/`;
    if (queryOptions) {
      url += `?${queryOptions.toQueryString()}`;
    }

    return this.httpClient
      .get(url)
      .pipe(map((data: any) => this.convertData(data)));
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.url}/${id}/`);
  }

  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }
}
