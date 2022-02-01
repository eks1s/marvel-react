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
  };

  componentDidMount() {
    this.onCharsLoaded(9);
  }

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharsLoaded = (count) => {
    this.marvelService
      .getCountCharacter(count)
      .then((response) => this.setState({ chars: response, loading: false }))
      .catch(this.onError);
  };

  render() {
    const { chars, error, loading } = this.state;
    const { onCharSelected } = this.props;
    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <View chars={chars} onCharSelected={onCharSelected} />
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

const View = ({ chars, onCharSelected }) => {
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
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </>
  );
};

export default CharList;
