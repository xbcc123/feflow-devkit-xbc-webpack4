import { observable, computed, action, toJS } from 'mobx';

class OneStore {

  @observable birds;
  @observable box;
  constructor() {
    this.birds = 0;
    this.box = {
      name: "boxName"
    }
  }

  // 修改
  @action addBird(bird){
    this.birds = this.birds + bird
  }

  @computed get birdCount() {
    return this.birds + 2;
  }
}

export default OneStore;
