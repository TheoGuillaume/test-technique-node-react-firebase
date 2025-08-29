function getAdults(users) {
  const today = new Date(); // Date actuelle
  return users.filter(user => {
    const dob = new Date(user.dob); // Date de naissance
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // Ajuster l'âge si l'anniversaire n'est pas encore passé cette année
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age >= 18;
  });
}

// Exemple d'utilisation
const users = [
  { name: "Alice", dob: "2000-02-29" },
  { name: "Bob", dob: "1990-12-31" },
  { name: "Charlie", dob: "2005-08-28" },
];

console.log(getAdults(users));

