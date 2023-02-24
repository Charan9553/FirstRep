import { LightningElement,api,wire } from 'lwc';

import plantdetails from '@salesforce/apex/Plant.plantdetails';
const collum=[{label :"Name", fieldName :"Name"},
              {label :"Price", fieldName :"Price__c"},
              {label :"Type of planted soil", fieldName:"Type_of_planted_soil__c"},
              {label :"Types of plants",fieldName:"Types_of_plants__c"}]


export default class plant extends LightningElement {
    @api col =collum
    @api collectionname
    selecteddate=''
    changehandler(event){
this.selecteddate=event.target.value
    }
    @wire(plantdetails,{abc:'$selecteddate'}) wirefun({data,error}){
        if(data){
            this.collectionname=data
        }else if(error){
            console.error(error)
        }
    }
}