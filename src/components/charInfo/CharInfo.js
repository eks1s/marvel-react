import "./charInfo.scss";
import { Component } from "react";
import MarvelService from "../../services/marvelService";
import Skeleton from "../skeleton/Skeleton";
import ErrorMassage from "../errorMassage/errorMassage";

class CharInfo extends Component {
  state = {
    char: null,
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.marvelService
      .getCharacter(charId)
      .then((resp) => {
        this.setState({ char: resp, loading: false });
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  };

  render() {
    const { char } = this.state;
    console.log(char);

    if (this.state.error) {
      return <ErrorMassage />;
    }
    return (
      <div className="char__info">
        {this.state.loading ? <Skeleton /> : null}
        {this.state.char ? (
          <>
            <div className="char__basics">
              <img src={char.thumbnail} alt="abyss" />
              <div>
                <div className="char__info-name">{char.name}</div>
                <div className="char__btns">
                  <a href={char.homePage} className="button button__main">
                    <div className="inner">homepage</div>
                  </a>
                  <a href={char.wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="char__descr">{char.description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
              {char.comics.map((comic, index) => {
                return (
                  <li key={index} className="char__comics-item">
                    {comic.name}
                  </li>
                );
              })}
            </ul>{" "}
          </>
        ) : null}
      </div>
    );
  }
}

export default CharInfo;
