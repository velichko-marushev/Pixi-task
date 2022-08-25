export class Rocket {
    startPositionThrust = {
        x: 76,
        y: 600
    }

    startPositionBottom = {
        x: 76,
        y: 533
    }

    startPositionTops = {
        x: 76,
        y: 483
    }
    // flyTimeFS is flyTimeFirstStage
    // flyTimeS is flyTimeSecondStage
    constructor(rocketName, enginesNumber, fuelAmountTons, flyTimeFS, flyTimeS, id) {
        this.rocketName = rocketName;
        this.enginesNumber = enginesNumber;
        this.fuelAmountTons = fuelAmountTons;
        this.flyTimeFS = (flyTimeFS / (flyTimeFS + flyTimeS)) * this.startPositionThrust.y;
        this.flyTimeS = (flyTimeS / (flyTimeFS + flyTimeS)) * this.startPositionThrust.y;
        this.startPositionBottom.x += id * 200;
        this.startPositionTops.x = this.startPositionBottom.x;
        this.startPositionThrust.x = this.startPositionTops.x;
    }

    get fuelAmount() {
        return --this.fuelAmountTons;
    }

}
