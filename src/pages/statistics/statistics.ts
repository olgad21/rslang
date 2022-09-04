import { dailyIndicators, gameIndicators, statsStrings } from '../../constants';
import createElement, { removeAllChildNodes } from '../../helpers';
import './statistics.scss';
import updateStatistics from './statisticsController';

const renderDailyStatsIndicator = (description: string, id: string) => {
  const stats = createElement('div', 'daily-indicator__container');
  const statsNumber = createElement('p', 'daily-indicator__number');
  statsNumber.setAttribute('data-id', id);
  statsNumber.textContent = '0'; // Change with JS
  const statsDesc = createElement('p', 'daily-indicator__desc');
  statsDesc.textContent = `${description}`;
  stats.append(statsNumber, statsDesc);
  return stats;
};

const renderDailyStatsData = () => {
  const dailyStatsData = createElement('div', 'stats-container');
  const dayStatsTitle = createElement('h2', 'stats__subtitle');
  dayStatsTitle.textContent = statsStrings.dayStats;

  const dailyIndicatorsData = dailyIndicators.map(({ description, id }) =>
    renderDailyStatsIndicator(description, id)
  );

  const dailyNumbersData = createElement('div', 'daily-numbers-container');
  dailyNumbersData.append(...dailyIndicatorsData);
  dailyStatsData.append(dayStatsTitle, dailyNumbersData);

  return dailyStatsData;
};

const renderGameDataIndicator = (
  iconStyle: string,
  description: string,
  id: string
) => {
  const stats = createElement('div', 'stats__game-indicator');
  const icon = createElement('i', ['stats-icon', 'bi', `${iconStyle}`]);
  const statsDesc = createElement('div', 'stats__game-indicator-desc');
  const statsNumber = createElement('span', 'stats__game-indicator-num');
  statsNumber.setAttribute('data-id', id);
  statsDesc.textContent = `${description}: `;
  statsNumber.textContent = '0'; // Change with JS
  statsDesc.append(statsNumber);
  stats.append(icon, statsDesc);
  return stats;
};

const renderGameData = (name: string) => {
  const gameData = createElement('div', 'game-data');
  gameData.setAttribute('data-game', `${name}`);
  const gameName = createElement('h3', 'stats__game-name');
  gameName.textContent = name;

  const gameIndicatorsData = gameIndicators.map(
    ({ iconStyle, description, id }) =>
      renderGameDataIndicator(iconStyle, description, id)
  );

  gameData.append(gameName, ...gameIndicatorsData);
  return gameData;
};

const renderAllGamesData = () => {
  const dailyGamesData = createElement('div', 'game-stats-container');
  const sprintGameData = renderGameData('Спринт');
  const audioGameData = renderGameData('Аудиовызов');
  dailyGamesData.append(sprintGameData, audioGameData);
  return dailyGamesData;
};

const renderAllStatsdata = () => {
  const allStatsData = createElement('div', 'stats-container');
  const allStatsTitle = createElement('h2', 'stats__subtitle');
  allStatsTitle.textContent = statsStrings.allStats;

  allStatsData.append(allStatsTitle);
  return allStatsData;
};

const renderStatisticsPage = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  const statisticsDataDaily = renderDailyStatsData();
  const statisticsDataAll = renderAllStatsdata();
  const statisticsGamesDaily = renderAllGamesData();
  removeAllChildNodes(mainWrapper);
  mainWrapper?.append(
    statisticsDataDaily,
    statisticsGamesDaily,
    statisticsDataAll
  );
  updateStatistics();
};

export default renderStatisticsPage;
