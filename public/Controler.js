import {Rocket} from './Model.js';
import {View} from './View.js';

export class Controler {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.view = new View();
       
    }
    requestApi() {
        fetch(this.apiUrl)
            .then(result => {
                return result.json();
            }).then(result => {
                var id = 0;
                console.log(result);
                for (let index = 0; index < result.length; index++) {
                    if (result[index].active) {
                        let r = new Rocket(result[index].name, 
                            result[index].engines.number, 
                            result[index].first_stage.fuel_amount_tons,
                             Math.ceil(result[index].first_stage.fuel_amount_tons / result[index].first_stage.engines),
                             Math.ceil(result[index].second_stage.fuel_amount_tons / result[index].second_stage.engines),
                              id++);
                        this.view.addRocket(r)();
                        console.log(r);
                    }
                }

            });
    }

} 
