class Car{
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  openTrunk(){
    this.isTrunkOpen = true;
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }

  go(){
    if(!this.isTrunkOpen){
      this.speed += 5;
      this.speed = Math.min(200, this.speed);
    }
  }

  brake(){
    this.speed -= 5;
    this.speed = Math.max(0, this.speed);
  }

  getBrand(){
    return this.#brand;
  }

  getModel(){
    return this.#model;
  }

  displayInfo(){
    const trunkDisplay = this.isTrunkOpen ? 'Trunk is opened' : 'Trunk is closed';
    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} km/h. ${trunkDisplay}.`);
  }
}

class RaceCar extends Car{
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  };

  go(){
    this.speed += this.acceleration;
    this.speed = Math.min(300, this.speed);
  }

  displayInfo(){
    const brand = this.getBrand();
    const model = this.getModel();
    console.log(`${brand} ${model} Speed: ${this.speed} km/h.`);
  }

}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
car1.openTrunk();
car1.go();
car1.displayInfo();

const car2 = new Car({brand: 'Tesla', model: 'model 3'});
car2.go();
car2.brake();
car2.displayInfo();


const raceCar1 = new RaceCar({brand: 'McLaren', model: 'F1', acceleration : 20});
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.brake();
raceCar1.displayInfo();