import { useState } from "react";

const TodoList = () => {
  // État initial de la liste de tâches
  const [todos, setTodos] = useState([
    { id: 1, text: "Faire les courses", completed: false },
    { id: 2, text: "Réviser React", completed: true },
    { id: 3, text: "Appeler un ami", completed: false },
  ]);

  // État pour la valeur de l'input (nouvelle tâche)
  const [inputValue, setInputValue] = useState("");

  // État pour afficher les messages d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction d'ajout d'une nouvelle tâche
  const handleAddTodo = () => {
    const trimmedValue = inputValue.trim(); // Supprime les espaces avant/après

    // Vérifie si la tâche est vide
    if (!trimmedValue) {
      setErrorMessage("La tâche ne peut pas être vide.");
      return; // Arrête la fonction si condition non respectée
    }

    // Vérifie la longueur maximale de 50 caractères
    if (trimmedValue.length > 50) {
      setErrorMessage("La tâche ne doit pas dépasser 50 caractères.");
      return;
    }

    // Vérifie les doublons (insensible à la casse)
    if (todos.some(todo => todo.text.toLowerCase() === trimmedValue.toLowerCase())) {
      setErrorMessage("Cette tâche existe déjà.");
      return;
    }

    // Création de la nouvelle tâche
    const newTodo = {
      id: Date.now(), // ID unique basé sur l'heure actuelle
      text: trimmedValue,
      completed: false, // Par défaut, la tâche n'est pas terminée
    };

    // Ajoute la tâche à la liste existante
    setTodos([...todos, newTodo]);

    // Vide l'input après l'ajout
    setInputValue("");

    // Efface le message d'erreur après un ajout réussi
    setErrorMessage("");
  };

  // Fonction pour marquer/démarquer une tâche comme terminée
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Vérifie si toutes les tâches sont terminées
  const allCompleted = todos.every(todo => todo.completed);

  return (
    <div>
      {/* Champ de saisie pour ajouter une tâche */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Met à jour la valeur en temps réel
        placeholder="Ajouter une tâche"
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()} // Ajout avec touche Entrée
      />

      {/* Bouton pour ajouter la tâche */}
      <button onClick={handleAddTodo}>Ajouter</button>

      {/* Affichage du message d'erreur s'il existe */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Si toutes les tâches sont terminées, afficher un message spécial */}
      {allCompleted ? (
        <p>Toutes les tâches sont terminées !</p>
      ) : (
        // Sinon, afficher la liste des tâches
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              onClick={() => handleToggleTodo(todo.id)} // Permet de cocher/décocher une tâche
              style={{ textDecoration: todo.completed ? "line-through" : "none" }} // Barrer si terminée
            >
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
