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
    this.rateSSMM = 6;
    this.rateHH = 30;

    const offsetMM = this.seconds / 60;
    const offsetHH = this.minutes / 60;

    this.minutes += offsetMM;
    this.hours += offsetHH;

    this.handSS.rotation.z = this.timeToRad(this.seconds, "s");
    this.handMM.rotation.z = this.timeToRad(this.minutes, "m");
    this.handHH.rotation.z = this.timeToRad(this.hours, "h");
  }

  tick(delta) {
    // Update time and rotate hands accordingly
    this.handSS.rotation.z = this.timeToRad(Math.floor(this.seconds), "s");
    this.handMM.rotation.z = this.timeToRad(this.minutes, "m");
    this.handHH.rotation.z = this.timeToRad(this.hours, "h");

    this.seconds = (this.seconds + delta) % 60;
    this.minutes = (this.minutes + (delta / 60)) % 60;
    this.hours = (this.hours + (delta / 3600)) % 24;
  }

  timeToRad(num, type) {
    return type === "s" || type === "m"
      ? -MathUtils.degToRad(6 * num)
      : -MathUtils.degToRad(30 * (num % 12));
  }

  // TODO: Potentially use this function to change either background color,
  // lighting or environment maps to reflect real-life lighting based on time
  readTime() {
    return {
      hours: Math.floor(this.hours),
      minutes: Math.floor(this.minutes),
      seconds: Math.floor(this.seconds)
    }
  }
}

export { ClockModel };