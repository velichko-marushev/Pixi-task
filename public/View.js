
export class View {
    app = {}
    constructor() {
        this.app = new PIXI.Application(
            {
                width: 800,
                heigth: 600,
                backgroundColor: 0xAAAAAA
            }
        );
        document.body.appendChild(this.app.view);

        this.app.loader.baseUrl = "SpaceX";
        this.app.loader.add("bg", "bg1.png");
        this.app.loader.add("bottom", "rocket_bottom1.png");
        this.app.loader.add("tops", "rocket_top1.png");
        this.app.loader.add("thrust", "thrust1.png");
        this.app.loader.onComplete.add(this.loadBackground());
        this.app.loader.load();
    }
    loadBackground() {
        let that = this;
        return function () {
            var bg = PIXI.Sprite.from(that.app.loader.resources.bg.texture);
            bg.x = that.app.view.width / 2;
            bg.y = that.app.view.height / 2;
            bg.anchor.set(0.5);
            that.app.stage.addChild(bg);
        }
    }
    addRocket(r) {
        let that = this;
        return function () {
            var bottom = PIXI.Sprite.from(that.app.loader.resources.bottom.texture);
            bottom.x = r.startPositionBottom.x;
            bottom.y = r.startPositionBottom.y;
            bottom.anchor.set(0.5);

            var tops = PIXI.Sprite.from(that.app.loader.resources.tops.texture);
            tops.x = r.startPositionTops.x;
            tops.y = r.startPositionTops.y;
            tops.anchor.set(0.5);

            var thrust = PIXI.Sprite.from(that.app.loader.resources.thrust.texture);
            thrust.x = r.startPositionThrust.x;
            thrust.y = r.startPositionThrust.y;
            thrust.anchor.set(0.5);

            that.app.stage.addChild(bottom);
            that.app.stage.addChild(tops);
            that.app.stage.addChild(thrust);

            that.app.stage.interactive = true;
            that.app.ticker.add(moveRocket);
            function moveRocket() {
                tops.y -= 1;
                bottom.y -= 1;
                thrust.y -= 1;

                if (r.flyTimeFS > 0) {
                    r.flyTimeFS -= 2;
                }
                if (r.flyTimeFS < 0 && r.flyTimeS > 0) {
                    r.flyTimeS -= 2;
                }

                if (r.flyTimeFS < 0) {
                    that.app.stage.removeChild(bottom);
                    that.app.stage.removeChild(thrust);
                }
                // if (tops.y == r.startPositionTops.y) {
                if (r.flyTimeS < 0) {
                    that.app.stage.removeChild(tops);
                    let text = new PIXI.Text("Success", { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010 });
                    that.app.stage.addChild(text);
                }
            }
        }
    }
} 