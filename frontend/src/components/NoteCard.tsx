import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { INote } from "../hooks/useNotes";

import moment from "moment";
import { NoteCardActions } from "./NoteCardActions";

interface IProps {
  note: INote;
  openNote: (note: INote) => void;
  deleteNote: (note: INote) => void;
}

export const NoteCard: FC<IProps> = ({ note, openNote, deleteNote }) => {
  return (
    <Card sx={{ width: "100%", minHeight: 200, cursor: "pointer" }}>
      <CardHeader
        title={note.title}
        subheader={moment(note.timestamp).format("DD.MM.YYYY HH:mm")}
        onClick={() => openNote(note)}
      />
      <CardContent onClick={() => openNote(note)}>
        <Typography variant="body1" color="text.secondary">
          {note.text}
        </Typography>
      </CardContent>

      <CardActions>
        <NoteCardActions note={note} deleteNote={deleteNote} />
      </CardActions>
    </Card>
  );
};
