import { Group, MathUtils } from "three";

class ClockModel extends Group {
  constructor(parts) {
    super();
    // Define and add clock parts models
    this.frame = parts.frame;
    this.face = parts.face;
    this.cover = parts.cover;
    this.handSS = parts.handSS;
    this.handMM = parts.handMM;
    this.handHH = parts.handHH;
    this.add(
      this.frame,
      this.face,
      this.cover,
      this.handHH,
      this.handMM,
      this.handSS
    );

    // Get time when clock loads
    this.startTime = new Date(Date.now());
    this.seconds = this.startTime.getSeconds();
    this.minutes = this.startTime.getMinutes();
    this.hours = this.startTime.getHours() % 12;

    // Angles for hands
    this.degSS = -6;
    this.degHH = -30;

    // Accounting for seconds
    this.offsetMM = this.degSS * this.seconds / 60;
    // Accounting for minutes
    this.offsetHH = this.degHH * this.minutes / 60;

    // Set starting angles for hands
    this.handSS.rotation.z = MathUtils.degToRad(this.degSS * this.seconds);
    this.handMM.rotation.z = MathUtils.degToRad(this.degSS * this.minutes + this.offsetMM);
    this.handHH.rotation.z = MathUtils.degToRad(this.degHH * this.hours + this.offsetHH);
  }

  tick(delta) {
    this.handSS.rotation.z += MathUtils.degToRad(this.degSS) * delta;
    this.handMM.rotation.z += MathUtils.degToRad(this.degSS) / 60 * delta;
    this.handHH.rotation.z += MathUtils.degToRad(this.degHH) / 60 / 60 * delta;
  }

  calculateTime() {
    let degHH = MathUtils.radToDeg(this.handHH.rotation.z)
    let hour = Math.ceil(degHH / 360 * 12) % 12;

    let degMM = MathUtils.radToDeg(this.handMM.rotation.z)
    let minute = Math.ceil(degMM / 360 * 60) % 60;

    let degSS = MathUtils.radToDeg(this.handSS.rotation.z)
    let second = Math.ceil(degSS / 360 * 60) % 60;

    console.log(hour, minute, second);
  }
}

export { ClockModel };