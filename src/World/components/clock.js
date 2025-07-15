import { Group, MathUtils } from "three";
import { animate } from "animejs";

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
    this.minutes += this.seconds / 60;
    this.hours += this.minutes / 60;

    this.handSS.rotation.z = -MathUtils.degToRad(6 * this.seconds);
    this.handMM.rotation.z = -MathUtils.degToRad(6 * this.minutes);
    this.handHH.rotation.z = -MathUtils.degToRad(30 * (this.hours % 12));

    this.animateHands();
  }

  animateHands() {
    const duration = 250;
    const delay = 750;
    const ease = 'outBounce';

    animate(this.handHH.rotation, {
      z: {
        to: `-=${MathUtils.degToRad(1/600)}`,
        ease: ease,
        duration: duration,
        delay: delay
      },
    });

    animate(this.handMM.rotation, {
      z: {
        to: `-=${MathUtils.degToRad(1/10)}`,
        ease: ease,
        duration: duration,
        delay: delay
      },
    });

    animate(this.handSS.rotation, {
      z: {
        to: `-=${MathUtils.degToRad(6)}`,
        ease: ease,
        duration: duration,
        delay: delay
      },

      onComplete: () => {
        this.seconds = (this.seconds + 1) % 60;
        this.minutes = (this.minutes + 1/60) % 60;
        this.hours = (this.hours + 1/3600) % 24;
        this.animateHands()
      }
    })
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