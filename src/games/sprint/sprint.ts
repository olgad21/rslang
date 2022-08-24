import createElement from '../../helpers';
import './sprint.scss';

const createSprint = (place: HTMLElement) => {
  const globeContainer = <HTMLElement>createElement('div', 'globe-container');
  const globe = <HTMLElement>createElement('div', 'globe');
  const globeShere = <HTMLElement>createElement('div', 'globe-sphere');
  const globeWorldmap = <HTMLElement>createElement('div', 'globe-sprint');
  const globeOuterShadow = <HTMLElement>(
    createElement('div', 'globe-outer-shadow')
  );
  const globeInnerShadow = <HTMLElement>(
    createElement('div', 'globe-inner-shadow')
  );
  const globeWorldmapBack = <HTMLElement>(
    createElement('div', 'globe-sprint-back')
  );
  const globeWorldmapfront = <HTMLElement>(
    createElement('div', 'globe-sprint-front')
  );

  globeWorldmap.append(globeWorldmapBack, globeWorldmapfront);
  globe.append(globeShere, globeOuterShadow, globeWorldmap, globeInnerShadow);
  globeContainer.append(globe);
  place.append(globeContainer);

  return place;
};

export default createSprint;
