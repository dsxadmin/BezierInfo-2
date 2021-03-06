setup() {
    this.curve = Bezier.defaultCubic(this);
    setMovable(this.curve.points);
}

draw() {
    resetTransform();
    clear();
    this.curve.drawSkeleton();
    this.curve.drawCurve();
    this.curve.drawPoints();

    translate(this.width/2, 0);
    line(0,0,0,this.height);

    this.drawRTCurve(
        this.rotatePoints(
            this.translatePoints(
                this.curve.points
            )
        )
    );
}

translatePoints(points) {
    // translate to (0,0)
    let m = points[0];
    return points.map(v => {
        return {
            x: v.x - m.x,
            y: v.y - m.y
        }
    });
}

rotatePoints(points) {
    // rotate so that last point is (...,0)
    let dx = points[3].x;
    let dy = points[3].y;
    let a = atan2(dy, dx);
    return points.map(v => {
        return {
            x: v.x * cos(-a) - v.y * sin(-a),
            y: v.x * sin(-a) + v.y * cos(-a)
        };
    });
}

drawRTCurve(points) {
    let ncurve = new Bezier(this, points);
    translate(60, this.height/2);
    setStroke(`grey`);
    line(0,-this.height,0,this.height);
    line(-60,0,this.width,0);
    ncurve.drawCurve();
    setFill(`black`);
    text(`(0,0)`, 5,15);
    text(`(${points[3].x|0},0)`, points[3].x, -5, CENTER);
}

onMouseMove() {
    redraw();
}
