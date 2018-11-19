import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/v1/';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':  'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	url = "https://654nriatsd.execute-api.us-east-2.amazonaws.com/prod/product/";
	//oneUrl = 'https://654nriatsd.execute-api.us-east-2.amazonaws.com/prod/product/13860428';
	redSkyUrlPrefix = 'https://redsky.target.com/v2/pdp/tcin/';
	redSkyUrlPostfix = '?excludes=available_to_promise_network,deep_red_labels,taxonomy,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics';

	getRedSkyData(tcin): Observable<any> {
		var redSkyUrl = this.redSkyUrlPrefix + tcin + this.redSkyUrlPostfix;
		var prodsStr = this.http.get(redSkyUrl).pipe(
		map(this.extractData));
		return prodsStr;
	}

	getProducts(): Observable<any> {
		var prodsStr = this.http.get(this.url).pipe(
		map(this.extractData));
		return prodsStr;
	}

	getProduct(tcin): Observable<any> {
		var oneUrl = this.url + tcin;
		var prodStr = this.http.get(oneUrl).pipe(
		map(this.extractData));
		return prodStr;
	}

	private extractData(res: Response) {
		let body = res;
		return body || { };
	}

	constructor(private http:HttpClient) { }

	ngOnInit() {
	}
}