class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=121c270ba2e4c900593538a36cb03b70";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw Error("Not work");
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  getCountCharacter = async (count) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=${count}&${this._apiKey}`
    );
    return res.data.results.map((item) => {
      return this._transformCharacter(item);
    });
  };

  _transformCharacter = (res) => {
    return {
      id: res.id,
      name: res.name,
      description: res.description,
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      homePage: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items,
    };
  };
}

export default MarvelService;
