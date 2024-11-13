import { Group, MathUtils } from "three";

class ClockModel extends Group {
  constructor(models) {
    super();
    // Define and add clock parts models
    [this.frame, this.face, this.handSS, this.handMM, this.handHH] = models;

    for (const model of models) {
      model.castShadow = true;
      model.receiveShadow = true;
      this.add(model);
    }

    // Get time when clock loads
    this.startTime = new Date(Date.now());
    this.seconds = this.startTime.getSeconds();
    this.minutes = this.startTime.getMinutes();
    this.hours = this.startTime.getHours();

    // Calculate and set starting angles for hands
    this.radSS = -MathUtils.degToRad(6);
    this.radHH = -MathUtils.degToRad(30);

    this.offsetMM = -6 * this.seconds / 60;
    this.offsetHH = -30 * this.minutes / 60;

    this.startSS = -6 * this.seconds;
    this.startMM = -6 * this.minutes + this.offsetMM;
    this.startHH = -30 * (this.hours % 12) + this.offsetHH;

    this.handSS.rotation.z = MathUtils.degToRad(this.startSS);
    this.handMM.rotation.z = MathUtils.degToRad(this.startMM);
    this.handHH.rotation.z = MathUtils.degToRad(this.startHH);
  }

  tick(delta) {
    this.handSS.rotation.z += this.radSS * delta;
    this.handMM.rotation.z += this.radSS / 60 * delta;
    this.handHH.rotation.z += this.radHH / 3600 * delta;
  }

  // TODO: Potentially use this function to change either background color,
  // lighting or environment maps to reflect real-life lighting based on time
  calculateTime() {
    let degHH = MathUtils.radToDeg(this.handHH.rotation.z);
    let hours = -Math.ceil(degHH / 360 * 12) % 12;

    let degMM = MathUtils.radToDeg(this.handMM.rotation.z);
    let minutes = -Math.ceil(degMM / 360 * 60) % 60;

    let degSS = MathUtils.radToDeg(this.handSS.rotation.z);
    let seconds = -Math.ceil(degSS / 360 * 60) % 60;

    let time = { hours, minutes, seconds };
    console.log(time);
  }
}

export { ClockModel };