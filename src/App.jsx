import { useState } from "react";

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [yearsOfExperience, setYearsOfExprience] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione dei campi
    if (!name || !username || !password || !description || !yearsOfExperience || !selectedOption) {
    alert('Per favore compila tutti i campi');
    return;
    }

    console.log(`
      -Nome completo: ${name};
      -Username: ${username};
      -Password: ${password};
      -Specializzazione: ${selectedOption};
      -Anni di esperienza: ${yearsOfExperience};
      -Breve descrizione: ${description};
      `)

    //Pulisco il form
    setName('');
    setUsername('');
    setPassword('');
    setSelectedOption('');
    setYearsOfExprience(0);
    setDescription('');
  }


  return (
    <>
    <h1>Compila il form per accedere alla piattaforma</h1>
    <form onSubmit={handleSubmit}>
      <h4>Nome completo</h4>
      <input 
        type="text" 
        name="names" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      <strong style={{ color: name.length > 10 ? 'green' : 'red' }}>
        {name.length > 10 ? '✓ Nome Valido' : 'Nome deve avere almeno 10 caratteri'}
      </strong>
      <h4>Username</h4>
      <input
        type="text" 
        name="username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
       />
       <strong style={{ color: username.length >= 6 ? 'green' : 'red' }}>
        {username.length >= 6 ? '✓ Username valido' : 'Username deve avere almeno 6 caratteri'}
       </strong>
      <h4>Password</h4>
      <input 
        type="password" 
        name="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
       />
       <strong style={{ color: password.length >= 8 ? 'green' : 'red' }}>
        {password.length >= 8 ? '✓ Password valida' : 'Password deve avere almeno 8 caratteri'}
       </strong>
      <h4>Specializzazione in</h4>
      <select name="option" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">Seleziona un'opzione</option>
        <option value="Full Stack">Full Stack</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
      </select>
      <strong style={{ color: selectedOption ? 'green' : 'red' }}>
        {selectedOption ? '✓ Specializzazione selezionata' : 'Seleziona una specializzazione'}
      </strong>
      <h4>Anni di esperienza</h4>
      <input 
        type="number" 
        name="years" 
        value={yearsOfExperience} 
        onChange={(e) => setYearsOfExprience(e.target.value)}
      />
      <strong style={{ color: yearsOfExperience > 0 ? 'green' : 'red' }}>
        {yearsOfExperience > 0 ? '✓ Anni di esperienza validi' : 'Inserire un numero positivo'}
      </strong>
      <h4>Aggiungi una breve descrizione su di te</h4>
      <textarea name="description" value={description} 
        onChange={(e) => setDescription(e.target.value)}></textarea>
        <strong style={{ color: description.length >= 20 && description.length <= 100 ? 'green' : 'red' }}>
          {description.length >= 20 && description.length <= 100 ? '✓ Descrizione valida' : 'La descrizione deve essere tra 100 e 1000 caratteri'}
        </strong>
      <button>Invia Form</button>
    </form>
      
    </>
  )
}

export default App

/*
📌 Milestone 1: Creare un Form con Campi Controllati
Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):
✅ Nome completo (input di testo)

✅ Username (input di testo)

✅ Password (input di tipo password)

✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")

✅ Anni di esperienza (input di tipo number)

✅ Breve descrizione sullo sviluppatore (textarea)

Aggiungi una validazione al submit, verificando che:

Tutti i campi siano compilati
L'input Anni di esperienza sia un numero positivo
La Specializzazione sia selezionata

Al submit, se il form è valido, stampa in console i dati.

📌 Milestone 2: Validare in tempo reale
Aggiungere la validazione in tempo reale dei seguenti campi:

✅ Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).

✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.

✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi.

📌 Milestone 3: Convertire i Campi Non Controllati
Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.

Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.
*/