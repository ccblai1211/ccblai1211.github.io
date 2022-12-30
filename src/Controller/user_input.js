import {createNote} from"./Database.js"

export class InputController{

    constructor (tag){
        this.cate = tag;
        this.tag = "";
        this.description = "";
    }
    static get(tag){
        if(tag in InputControllerDistributor.inputControllers){
            return InputControllerDistributor.inputControllers[tag];
        }else{
            InputControllerDistributor.inputControllers[tag] = new InputController(tag);
            return InputControllerDistributor.inputControllers[tag];
        }
    }
    setTag(tag){
        this.tag = tag;
    }
    setDescription(description){
        this.description = description;
    }
    async submitToAWS(){
        if(this.tag != "" && this.description != ""){
            await createNote( this.cate, this.tag, this.description)
        }
    }
    resetData(){
        this.tag = "";
        this.description = "";
    }
    
}

class InputControllerDistributor{
    static inputControllers = {};
}
