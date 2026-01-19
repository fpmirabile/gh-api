import { Grid } from "@mui/material";
import { NoteCard } from "./NoteCard";
import { INote } from "../hooks/useNotes";
import { FC } from "react";

interface IProps {
  notes: INote[];
  openNote: (note: INote) => void;
  deleteNote: (note: INote) => void;
}

export const NoteGrid: FC<IProps> = ({ notes, openNote, deleteNote }) => {
  return (
    <Grid container spacing={2} sx={{ padding: 3, paddingTop: 12 }}>
      {notes.map((note, index) => (
        <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
          <NoteCard note={note} deleteNote={deleteNote} openNote={openNote} />
        </Grid>
      ))}
    </Grid>
  );
};
