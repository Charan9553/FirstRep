import { LightningElement } from 'lwc';

export default class Databinding extends LightningElement {
    name= 'shambavi';
    handleclick(event){
        this.name='rani';
    }

}