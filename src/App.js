import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const photosApiUrl = "https://jsonplaceholder.typicode.com/photos";
  const albumsApiUrl = "https://jsonplaceholder.typicode.com/albums";
  const usersApiUrl = "https://jsonplaceholder.typicode.com/users";

  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [userSelected, SetSelectedUser] = useState(1);
  const [albumSelected, SetSelectedAlbum] = useState(1);

  // useEffect for photos
  useEffect(() => {
    const getPhotos = async () => {
      const url = albumSelected
        ? photosApiUrl + "?albumId=" + albumSelected
        : photosApiUrl;
      const photos = await fetch(url).then((response) => response.json());
      setPhotos(photos);
    };
    if (albumSelected) {
      getPhotos();
    }
  }, [albumSelected]);

  // useEffect for albums
  useEffect(() => {
    const url = userSelected
      ? albumsApiUrl + "?userId=" + userSelected
      : albumsApiUrl;
    const getAlbums = async () => {
      const albums = await fetch(url).then((response) => response.json());
      setAlbums(albums);
    };
    getAlbums();
  }, [userSelected]);

  // useEffect for users
  useEffect(() => {
    const getUsers = async () => {
      const users = await fetch(usersApiUrl).then((response) =>
        response.json()
      );
      setUsers(users);
    };
    getUsers();
  }, []);

  const manageChangeUser = ({ target }) => {
    // con il + davanti trasformiamo la stringa in numero (pars)
    SetSelectedUser(+target.value);
  };
  const manageChangeAlbum = ({ target }) => {
    // con il + davanti trasformiamo la stringa in numero (pars)
    SetSelectedAlbum(+target.value);
  };

  const Opt = ({ id, name, userId, title }) => {
    const selectedOpt =
      id === (userId ? albumSelected : userSelected) ? "selected" : null;
    const optname = userId ? title : name;
    return (
      <option selected={selectedOpt} value={id} key={id}>
        {optname}
      </option>
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Albums</h1>
        <form className="gallery">
          <div className="form-group">
            <label htmlFor="users">
              Utenti
              <select name="users" id="users" onChange={manageChangeUser}>
                <option value="">Seleziona un utente</option>
                {users.map((user) => (
                  <Opt {...user} />
                ))}
              </select>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="albums">
              Albums
              <select name="albums" id="albums" onChange={manageChangeAlbum}>
                <option value="">Seleziona un album</option>
                {albums.map((album) => (
                  <Opt {...album} />
                ))}
              </select>
            </label>
          </div>
        </form>
        <ul className="photos">
          {photos.map((photo) => (
            <li key={photo.id}>
              <img
                src={photo.thumbnailUrl}
                title={photo.title}
                alt={photo.title}
              />
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
