import { createElement } from '../../helpers';
import './sprint.scss';

const createSprint = (place: HTMLElement) => {
  const globeContainer = <HTMLElement>createElement('div', 'globe-container');

  place.append(globeContainer);

  return place;
};

export default createSprint;
