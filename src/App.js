import logo from './logo.svg';
import './App.css';
// import React ,{useState}from'react'

function App() {
const etudiant = { nom: "mekni ", prenom: "Mohamed Tej Eddin" };

  // Corrected list array
  const listusers = [
    { nom: "nder", prenom: "mskini", id: 0 },
    { nom: "ahmed", prenom: "ahmed", id: 1 },
  ];
 function getWelcomeMessage(etudiant){
    
    return "marhba bik  "+  etudiant.nom+"fi 9antra"
 }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Bonjour {etudiant.nom} {etudiant.prenom}</div>
        <div className="tv">
          <hr />
          <caption>List Etudiant</caption>
          <table border={5}>
            <thead>
              <tr>
                
                <td>Nom</td>
                <td>Prénom</td>
              </tr>
            </thead>
            <tbody>
              {listusers.map((user) => (
                <tr key={user.id}>
                    
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                </tr>
              ))}
            </tbody>
          </table>
         { getWelcomeMessage(etudiant)}
        </div>
      </header>
    </div>
    
  );
}

export default App;
