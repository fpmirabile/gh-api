import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { FC } from "react";
import { INote } from "../hooks/useNotes";

interface IProps {
  note: INote;
  deleteNote: (note: INote) => void;
}

export const NoteCardActions: FC<IProps> = ({ note, deleteNote }) => {
  return (
    <>
      <IconButton onClick={() => deleteNote(note)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};
