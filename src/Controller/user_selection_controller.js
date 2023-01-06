export class SelectionController{

    constructor (tag){
        this.cate = tag
        this.selection = ""
        this.description = ""
        this.resultDescription = ""
        this.isSelected = false
        this.regex = new RegExp('\\${[^}]*}')
    }
    static get(tag){
        if(tag in SelectionControllerDistributor.selectionControllers){
            return SelectionControllerDistributor.selectionControllers[tag];
        }else{
            SelectionControllerDistributor.selectionControllers[tag] = new SelectionController(tag);
            return SelectionControllerDistributor.selectionControllers[tag];
        }
    }
    setSelection(value, description){
        this.selection = value
        this.description = description;
        this.resultDescription = this.processDescription(description);
        this.isSelected = true;
    }

    processDescription(description){
        var newDescription = description
        var match = this.regex.exec(newDescription);

        while(match != null){
            var cate = match[0].substring(2, match[0].length -1);
            console.log(cate)

            if(cate in SelectionControllerDistributor.selectionControllers){
                var selectionController = SelectionController.get(cate)
                if(selectionController.description !=""){
                    newDescription = newDescription.replace(match[0], selectionController.description)
                }else{
                    newDescription = newDescription.replace(match[0], match[0].substring(1))
                }
            }else{
                newDescription = newDescription.replace(match[0], "")
            }
            match = this.regex.exec(newDescription);
        }
        return newDescription
;    }
        
}

export class SelectionControllerDistributor{
    static selectionControllers = {};
}
