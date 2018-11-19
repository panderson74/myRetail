import * as _ from 'lodash';

export class Product {
	tcin: number;
	name: string;
	price: string;
	imageUrl: string;
	raw: Object;

	static fromJSON(json): Product {
		if (json) {
			var item = (json["Item"] ? json["Item"] : json );
			var p = new Product();
			p.tcin = item["productId"];
			p.name = item["name"];
			var price = item["current_price"]["value"].toString();
			var cCode = item["current_price"]["currency_code"];
			p.imageUrl = "";
			p.price = price + " " + cCode;
			p.raw = item; //JSON.stringify(item);
			return p;
		}
		return null;
	}

	static listFromJSON(json): Product[] {
		if (json) {
			var products:Product[] = [];
			json["Items"].forEach(item => {
				var p = Product.fromJSON(item);
				products.push(p);
			});
			return products;
		}
		return null;
	}
}

/*
	static parseProductFromJSON(json): Product {
		// var selectProduct = _.filter(json.product.item, {tcin: 13860428});
		// Object.toString(json, 'product.item');
		console.log("type: " + typeof json);
		var snippet = findNested(json, "item", null);
		console.log(json["item"]);
		var selectProduct = snippet[0];
		var tcin = _.pick(selectProduct, ['tcin']);
		var title = _.pick(selectProduct, ['title']);
		//console.log(price["price"]["offerPrice"]["price"]);
		var p = new Product();
		p.tcin = tcin["tcin"]
		p.title = title["title"];
		p.price = ""; //price["price"]["offerPrice"]["price"];
		p.raw = selectProduct;
		console.log(p);
		return selectProduct;
	}


function pluckFromJSON(obj, key) {
    if (_.has(obj, key)) // or just (key in obj)
        return [obj];
    // elegant:
    return _.flatten(_.map(obj, function(v) {
        return typeof v == "object" ? pluckFromJSON(v, key) : [];
    }), true);

    // or efficient:
    var res = [];
    _.forEach(obj, function(v) {
        if (typeof v == "object" && (v = pluckFromJSON(v, key)).length)
            res.push.apply(res, v);
    });
    return res;
}

function findNested(obj, key, memo) {
  var i,
      proto = Object.prototype,
      ts = proto.toString,
      hasOwn = proto.hasOwnProperty.bind(obj);

  if ('[object Array]' !== ts.call(memo)) memo = [];

  for (i in obj) {
    if (hasOwn(i)) {
      if (i === key) {
        memo.push(obj[i]);
      } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
        findNested(obj[i], key, memo);
      }
    }
  }

  return memo;
}
*/
