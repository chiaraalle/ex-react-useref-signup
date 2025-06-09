import { useMemo, useState, useRef } from "react";

function App() {

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&/*()-_=+[]{}|;:',.<>?/`~";

 //campi controllati
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  
  //campi non controllati
  const fullnameRef = useRef();
  const selectedOptionRef = useRef();
  const yearsOfExperienceRef = useRef();
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullname = fullnameRef.current.value;
    const selectedOption = selectedOptionRef.current.value;
    const yearsOfExperience = yearsOfExperienceRef.current.value;

    // Validazione dei campi
    if (
      !fullname || 
      !username || 
      !password || 
      !description || 
      yearsOfExperience <= 0 || 
      !selectedOption ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      alert('Per favore compila tutti i campi');
      return;
    }

    console.log(
      `-Nome completo: ${fullname};
      -Username: ${username};
      -Password: ${password};
      -Specializzazione: ${selectedOption};
      -Anni di esperienza: ${yearsOfExperience};
      -Breve descrizione: ${description};`
    );

    // Reset dei campi controllati
    setUsername('');
    setPassword('');
    setDescription('');

    // Reset dei campi non controllati 
    fullnameRef.current.value = '';
    selectedOptionRef.current.value = '';
    yearsOfExperienceRef.current.value = '';
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
        ref={fullnameRef}
      />
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
      <select name="option" ref={selectedOptionRef}>
        <option value="">Seleziona un'opzione</option>
        <option value="Full Stack">Full Stack</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
      </select>
      <p>Anni di esperienza</p>
      <input 
        type="number" 
        name="years" 
        min="0"
        ref={yearsOfExperienceRef}
      />
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
📌 Milestone 3: Convertire i Campi Non Controllati
Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila,
 quindi è possibile gestirli in modo più efficiente.

Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.
*/