 import { LightningElement, wire ,api} from 'lwc';
import { createRecord,getRecord,getFieldValue } from 'lightning/uiRecordApi';
import ITEMNAME from '@salesforce/schema/Cart__c.Selected_product__c'
import ITEMPRICE from '@salesforce/schema/Cart__c.Price_of_product__c'
import {NavigationMixin} from 'lightning/navigation'
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import ORDERI from '@salesforce/schema/Order1__c.Item_Name__c'
import ORDERP from '@salesforce/schema/Order1__c.Item_price__c'
const Fields=[ITEMNAME,ITEMPRICE]
export default class CartButtonComponent extends NavigationMixin(LightningElement) {
    OrderName
    OrderPrice
    @api recordId
    @api cartCollection
    iscancelOrder=false
    showModel=false
    hideModal(event){
this.showModel=false
    }
    @wire(getRecord,{recordId:'$recordId',fields:Fields})
    cartFun({data,error}){
        if(data){
this.cartCollection=data
this.OrderName=getFieldValue(data,ITEMNAME)
this.OrderPrice=getFieldValue(data,ITEMPRICE)
        }
        else if(error){
            console.error(error)
        }
    }
    clickHandler(event){
        this.showModel=true
        this.iscancelOrder=true
       const FIELDS1={
            "Item_Name__c":this.OrderName,
            "Item_price__c":this.OrderPrice
        }
        const recordInput = {apiName:'Order1__c',
            fields: FIELDS1
          }    
        createRecord(recordInput).then(result=>{
            const showMsg = new ShowToastEvent({
                title:'success Message',
                variant:'success',
                mode:'dismissable',
                message:'Order Placed Successfully'
               })
               this.dispatchEvent(showMsg)
      
        })
          }
    cancelHandler(event){
        
        this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Cancellation_Refund__c',
                    actionName: 'new'
            }
        })
        
            }
}
