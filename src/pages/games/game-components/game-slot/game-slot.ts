import { createElement } from '../../../../helpers';
import './game-slot.scss';

const createGameSlot = (place: HTMLElement, gameName: string) => {
  const globeContainer = <HTMLElement>createElement('div', 'globe-container');
  const globe = <HTMLElement>createElement('div', 'globe');
  const globeShere = <HTMLElement>createElement('div', 'globe-sphere');
  const globeWorldmap = <HTMLElement>createElement('div', 'globe-worldmap');
  const globeOuterShadow = <HTMLElement>(
    createElement('div', 'globe-outer-shadow')
  );
  const globeInnerShadow = <HTMLElement>(
    createElement('div', 'globe-inner-shadow')
  );
  const globeWorldmapBack = <HTMLElement>(
    createElement('div', 'globe-worldmap-back')
  );
  const globeWorldmapfront = <HTMLElement>(
    createElement('div', 'globe-worldmap-front')
  );
  const globeWorldmapText = <HTMLElement>(
    createElement('div', 'globe-worldmap-text')
  );

  globeWorldmapText.textContent = gameName;

  globeWorldmap.append(globeWorldmapBack, globeWorldmapfront);
  globe.append(globeShere, globeOuterShadow, globeWorldmap, globeInnerShadow);
  globeContainer.append(globe, globeWorldmapText);
  place.append(globeContainer);

  return place;
};

export default createGameSlot;
