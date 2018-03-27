import {rhythm} from '../helpers/Helpers';

const SECTION = {
  rhythms: [rhythm(2)]
}

const APP = {
  sections: [
    Object.assign({}, SECTION)
  ]
}

export const INIT_STATE = {
  app: APP
};
