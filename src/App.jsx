import { useMemo, useState } from "react";

function App() {

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&/*()-_=+[]{}|;:',.<>?/`~";

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [yearsOfExperience, setYearsOfExprience] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione dei campi
    if (
      !name || 
      !username || 
      !password || 
      !description || 
      !yearsOfExperience || 
      !selectedOption ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
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

  //Username deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli)
  const isUsernameValid= useMemo(() => {
      const validChars= [...username].every((char) => 
      letters.includes(char.toLowerCase()) ||
      numbers.includes(char)
    )

    return validChars && username.length >= 6;
  }, [username])

  //Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo
  const isPasswordValid = useMemo(() => {
    return (
      [...password].some((char) => letters.includes(char)) &&
      [...password].some((char) => numbers.includes(char)) &&
      [...password].some((char) => symbols.includes(char)) &&
      password.length >= 8

    )
  }, [password])

  //Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali)
  const isDescriptionValid= useMemo(() => {
    return (
      description.trim().length >= 100 &&
      description.trim().length <= 1000
    )  
  }, [description])


  return (
    <>
    <h1>Compila il form per accedere alla piattaforma</h1>
    <form onSubmit={handleSubmit}>
      <p>Nome completo</p>
      <input 
        type="text" 
        name="names" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      {name.trim() && <strong style={{ color: name.length > 10 ? 'green' : 'red' }}>
        {name.length > 10 ? '✓ Nome Valido' : 'Nome deve avere almeno 10 caratteri'}
      </strong>}
      <p>Username</p>
      <input
        type="text" 
        name="username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
       />
       {username.trim() && <strong style={{ color: isUsernameValid ? 'green' : 'red' }}>
        {isUsernameValid ? '✓ Username valido' : 'Username deve contenere solo caratteri alfanumerici e almeno 6 caratteri'}
       </strong>}
      <p>Password</p>
      <input 
        type="password" 
        name="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
       />
       {password.trim() && <strong style={{ color: isPasswordValid ? 'green' : 'red' }}>
        {isPasswordValid ? '✓ Password valida' : 'Password deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo'}
      </strong> }
      <p>Specializzazione in</p>
      <select name="option" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">Seleziona un'opzione</option>
        <option value="Full Stack">Full Stack</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
      </select>
      {selectedOption !== "" && <strong style={{ color: selectedOption ? 'green' : 'red' }}>
        {selectedOption ? '✓ Specializzazione selezionata' : 'Seleziona una specializzazione'}
      </strong>}
      <p>Anni di esperienza</p>
      <input 
        type="number" 
        name="years" 
        value={yearsOfExperience} 
        onChange={(e) => setYearsOfExprience(e.target.value)}
      />
      {yearsOfExperience > 0 && <strong style={{ color: yearsOfExperience > 0 ? 'green' : 'red' }}>
        {yearsOfExperience > 0 ? '✓ Numero valido' : 'Inserire un numero positivo'}
      </strong>}
      <p>Aggiungi una breve descrizione su di te</p>
      <textarea name="description" value={description} 
        onChange={(e) => setDescription(e.target.value)}></textarea>
      {description.trim() && <strong style={{ color: isDescriptionValid ? 'green' : 'red' }}>
        {isDescriptionValid ? '✓ Descrizione valida' :'La descrizione deve essere tra 100 e 1000 caratteri'}
      </strong> }
      <button>Invia Form</button>
    </form>
      
    </>
  )
}

export default App

/*

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