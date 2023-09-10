import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "OuO";
var name = "Clubster";
var description = "No theory description :(";
var authors = "JojoGames";
var version = "v1.0.0";

var clubster, najor;
var c1;

var init = () => {
    clubster = theory.createCurrency("C", "C");
    najor = theory.createCurrency("N", "N");

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(c1.level).toString(2);
        c1 = theory.createUpgrade(0, clubster, new FirstFreeCost(new ExponentialCost(20, 1.23)));
        c1.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, clubster, 1e15);
    theory.createBuyAllUpgrade(1, clubster, 1e33);
    theory.createAutoBuyerUpgrade(2, clubster, 1e63);

    /////////////////
    //// Achievements   

    ac1 = theory.createAchievementCategory(0, "Clubsters");
    theory.createAchievement(0, ac1, "Go Go! Started", "Reach 1 Clubster", () => currency.value > 0)
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;

    clubster.value += bonus * getC1(c1.level) * dt;
}

var getPublicationMultiplier = (tau) => tau.pow(0.05);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{0.05}";
var getTau = () => clubster.value;

var getC1 = (level) => level;

init();