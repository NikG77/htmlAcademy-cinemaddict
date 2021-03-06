import AbstractSmartComponent from "./abstract-smart-component";
import {formatDateComment} from "../utils/common";


const createCommentsMarkup = (comments) => {
  return comments.map((newComment) => {
    const {date, emotion, id, author, comment} = newComment;
    const commentTimeAgo = formatDateComment(date);
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${commentTimeAgo}</span>
            <button class="film-details__comment-delete" data-id="${id}">Delete</button>
          </p>
        </div>
      </li>`
    );
  });
};

const createCommentsTemplate = (comments) => {

  const commentsNumber = comments.length;

  const commentsMarkup = createCommentsMarkup(comments);
  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsNumber}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>

      </section>
    </div>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._comments = comments;
    this._film = film;
    this._commentDeleteClickHandler = null;

  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  setCommentDeleteClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comments-list`)
        .addEventListener(`click`, handler);

    this._commentDeleteClickHandler = handler;

  }

  recoveryListeners() {
    this.setCommentDeleteClickHandler(this._commentDeleteClickHandler);
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this.rerender();
  }


}

