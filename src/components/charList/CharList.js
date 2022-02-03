import "./charList.scss";
import MarvelService from "../../services/marvelService";
import { Component } from "react";
import Spinner from "../spinner/spinner";
import ErrorMassage from "../errorMassage/errorMassage";

class CharList extends Component {
  marvelService = new MarvelService();

  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
  };

  componentDidMount() {
    this.onRequest();
  }

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onRequest = async (offset) => {
    this.setState({ newItemLoading: true });
    await this.marvelService
      .getAllCharacters(offset)
      .then((response) =>
        this.setState(({ chars, offset }) => {
          return {
            chars: [...chars, ...response],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
          };
        })
      )
      .catch(this.onError);
  };

  render() {
    const { chars, error, loading, newItemLoading, offset } = this.state;
    const { onCharSelected } = this.props;
    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <View
        chars={chars}
        onCharSelected={onCharSelected}
        newItemLoading={newItemLoading}
        onRequest={this.onRequest}
        offset={offset}
      />
    ) : null;
    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

const View = ({ chars, onCharSelected, newItemLoading, onRequest, offset }) => {
  return (
    <>
      <ul className="char__grid">
        {chars.map((char) => {
          return (
            <li
              key={char.id}
              onClick={() => onCharSelected(char.id)}
              className="char__item"
            >
              <img src={char.thumbnail} alt="abyss" />
              <div className="char__name">{char.name}</div>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </>
  );
};

export default CharList;
