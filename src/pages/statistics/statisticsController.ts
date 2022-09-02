/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
const updateDailyStatistics = () => {
  const dailyNewWords = document.querySelector('[data-id="daily-new-words"]');
  const dailyLearnedWords = document.querySelector(
    '[data-id="daily-learned-words"]',
  );
  const dailyRightWords = document.querySelector(
    '[data-id="daily-right-words"]',
  );
};

const updateGameStatistics = () => {
  const allGamesData = document.querySelectorAll('[data-game]');
  Array.from(allGamesData).forEach((game) => {
    const gameNewWords = document.querySelector('[data-id="new-words"]');
    const gameLearnedWords = document.querySelector(
      '[data-id="learned-words"]',
    );
    const gameRightWords = document.querySelector('[data-id="right-words"]');
  });
};

const updateStatistics = () => {
  updateDailyStatistics();
  updateGameStatistics();
};

export default updateStatistics;
