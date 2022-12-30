export class SelectionController{

    constructor (){
        this.selection = ""
        this.description = ""
    }
    static get(tag){
        if(tag in SelectionControllerDistributor.selectionControllers){
            return SelectionControllerDistributor.selectionControllers[tag];
        }else{
            SelectionControllerDistributor.selectionControllers[tag] = new SelectionController();
            return SelectionControllerDistributor.selectionControllers[tag];
        }
    }
    setSelection(value, description){
        this.selection = value
        this.description = description;
    }
        
}

export class SelectionControllerDistributor{
    static selectionControllers = {};
}
