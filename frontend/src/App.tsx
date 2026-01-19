import { Container } from "@mui/material";
import { useState } from "react";
import { AddNoteFab } from "./components/AddNoteFab";
import { AddNoteModal } from "./components/AddNoteModal";
import { EditNoteModal } from "./components/EditNoteModal";
import { Header } from "./components/Header";
import { NoteGrid } from "./components/NoteGrid";
import { type INote, useNotes } from "./hooks/useNotes";

export const App = () => {
  const [searchText, setSearchText] = useState("");
  const { notes, addNote, updateNote, deleteNote, filterNotes } = useNotes();

  const [note, openNote] = useState<INote>();
  const [openModal, setOpenModal] = useState<"add" | "update" | null>();

  return (
    <Container maxWidth={false} disableGutters>
      <Header onNoteSearch={filterNotes} searchText={searchText} />
      <NoteGrid
        notes={notes}
        openNote={(note: INote) => {
          openNote(note);
          setOpenModal("update");
        }}
        deleteNote={deleteNote}
      />
      <AddNoteFab openModal={() => setOpenModal("add")} />
      <AddNoteModal
        open={openModal === "add"}
        addNote={(note: INote) => {
          addNote(note);
          setSearchText("");
          filterNotes("");
        }}
        onClose={() => setOpenModal(null)}
      />
      <EditNoteModal
        open={openModal === "update"}
        note={note}
        updateNote={updateNote}
        onClose={() => {
          setOpenModal(null);
          openNote(undefined);
        }}
      />
    </Container>
  );
};
