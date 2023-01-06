export class SelectionController {
  constructor(tag) {
    this.cate = tag;
    this.selection = "";
    this.description = "";
    this.resultDescription = "";
    this.isSelected = false;
    this.regex = new RegExp("\\${[^}]*}");
  }
  static get(tag) {
    if (tag in SelectionControllerDistributor.selectionControllers) {
      return SelectionControllerDistributor.selectionControllers[tag];
    } else {
      SelectionControllerDistributor.selectionControllers[tag] =
        new SelectionController(tag);
      return SelectionControllerDistributor.selectionControllers[tag];
    }
  }
  async setSelection(value, description) {
    this.selection = value;
    this.description = description;
    await this.processDescription();
    this.isSelected = true;
  }

  async processDescription() {
    var newDescription = this.description;
    var match = this.regex.exec(newDescription);

    while (match != null) {
      var cate = match[0].substring(2, match[0].length - 1);

      if (cate in SelectionControllerDistributor.selectionControllers) {
        var selectionController = SelectionController.get(cate);
        if (selectionController.description != "") {
          newDescription = newDescription.replace(
            match[0],
            selectionController.description
          );
        } else {
          newDescription = newDescription.replace(
            match[0],
            match[0].substring(1)
          );
        }
      } else {
        // newDescription = newDescription.replace(match[0], "")
      }
      match = await this.regex.exec(newDescription);
    }
    console.log(newDescription)
    this.resultDescription = newDescription;
  }
}

export class SelectionControllerDistributor {
  static selectionControllers = {};
}
