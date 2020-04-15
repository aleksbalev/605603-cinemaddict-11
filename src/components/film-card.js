export const createFilmCardTemplate = (card) => {
  const {
    cardTitle,
    cardRating,
    cardDate,
    cardDuration,
    cardGenre,
    cardPoster,
    cardDescription,
    cardComments,
  } = card;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${cardTitle}</h3>
      <p class="film-card__rating">${cardRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${cardDate[0]}</span>
        <span class="film-card__duration">${cardDuration}</span>
        <span class="film-card__genre">${cardGenre}</span>
      </p>
      <img src="${cardPoster}" alt="" class="film-card__poster">
      <p class="film-card__description">${cardDescription}</p>
      <a class="film-card__comments">${cardComments[0]} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};
