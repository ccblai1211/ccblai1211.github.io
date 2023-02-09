import Project from '../Model/projectDescription'

import BCSC_logo from '../asset/images/BCSC-logo_high.PNG';
import Doc_logo from '../asset/images/doc_temp.jpg'

export default class PortfolioController{

    constructor(){
        this.projects = {
            "BCSCIOS":new Project("BCSC IOS App", "The V3 Breast Cancer Risk Calculator App Beta is a multi-purpose application predicting both invasive and advanced breast cancer risk rates. It is built on the previous version of the BCSC Breast Cancer Risk Calculator “BCSC AdvancedBreastCancerRisk,” developed in the first half of 2022, with significant improvement in UI&UX, efficiency, and deployment of the new predicting model of invasive breast cancer. The basic functionalities of the app are complete, including the prediction of invasive breast cancer risk, exception handling when the user’s input is only eligible for one model, risk distribution plot, etc. The documentation needs to be updated in the feature development.", BCSC_logo),"BCSCAndroid":new Project("BCSC Android App", "The V3 Breast Cancer Risk Calculator App Beta is a multi-purpose application predicting both invasive and advanced breast cancer risk rates. It is built on the previous version of the BCSC Breast Cancer Risk Calculator “BCSC AdvancedBreastCancerRisk,” developed in the first half of 2022, with significant improvement in UI&UX, efficiency, and deployment of the new predicting model of invasive breast cancer. The basic functionalities of the app are complete, including the prediction of invasive breast cancer risk, exception handling when the user’s input is only eligible for one model, risk distribution plot, etc. The documentation needs to be updated in the feature development.",BCSC_logo ),"BCSCWeb":new Project("BCSC Android App", "The V3 Breast Cancer Risk Calculator App Beta is a multi-purpose application predicting both invasive and advanced breast cancer risk rates. It is built on the previous version of the BCSC Breast Cancer Risk Calculator “BCSC AdvancedBreastCancerRisk,” developed in the first half of 2022, with significant improvement in UI&UX, efficiency, and deployment of the new predicting model of invasive breast cancer. The basic functionalities of the app are complete, including the prediction of invasive breast cancer risk, exception handling when the user’s input is only eligible for one model, risk distribution plot, etc. The documentation needs to be updated in the feature development.",BCSC_logo ), "DocTemplater":new Project("Doc Templater", "Templater", Doc_logo)
        }
    }
    // static get(){
    //     return new PortfolioController()
    // }
}