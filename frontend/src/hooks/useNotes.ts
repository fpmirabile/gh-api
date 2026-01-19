import { useState, useRef } from "react";

export interface INote {
  id?: number;
  title?: string;
  text?: string;
  timestamp?: number;
}

export const useNotes = () => {
  const allNotes = useRef<INote[]>([]);
  const [notes, setNotes] = useState<INote[]>([]);

  const addNote = (note: INote) => {
    allNotes.current.push(note);
    setNotes([...notes, note]);
  };

  const updateNote = (note: INote) => {
    setNotes((prev) => {
      const allButMyNote = prev.filter(({ id }) => id !== note.id);
      return [...allButMyNote, note];
    });
  };

  const deleteNote = (note: INote) => {
    setNotes(notes.filter(({ id }) => id !== note.id));
  };

  const filterNotes = (noteTitle: string) => {
    if (noteTitle.trim() === "") {
      setNotes(allNotes.current);
    }

    setNotes((prev) => {
      return prev.filter(({ title }) =>
        title?.toLowerCase().includes(noteTitle.toLowerCase())
      );
    })
  }

  return { notes, addNote, updateNote, deleteNote, filterNotes };
};
