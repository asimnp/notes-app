const fs = require("fs");
const chalk = require("chalk");

// 1: Add Note Function
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);

    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

// 2: Remove Note
const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notesToKeep.length < notes.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

// 3: List Notes
const listNotes = () => {
  console.log(chalk.blue.inverse("Your notes!"));

  const notes = loadNotes();

  notes.forEach((note, index) => {
    console.log(index + 1 + ". " + note.title);
  });
};

// 4: Read Note
const readNote = title => {
  const notes = loadNotes();

  const rNote = notes.find(note => note.title === title);

  if (rNote) {
    console.log(chalk.green.inverse(rNote.title));
    console.log(rNote.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

// Save Notes
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// Load Notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
