import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { INote } from "../hooks/useNotes";

interface IProps {
  open: boolean;
  note?: INote;
  updateNote: (note: INote) => void;
  onClose: () => void;
}

export const EditNoteModal: FC<IProps> = ({
  open,
  note,
  updateNote,
  onClose,
}) => {
  const [tmpNote, setTmpNote] = useState<INote | undefined>(note);

  useEffect(() => {
    if (!note) {
      return;
    }

    setTmpNote(note);
  }, [note]);

  const handleInputChange = (fieldKey: 'title' | 'text') => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTmpNote({
      ...tmpNote,
      [fieldKey]: event.target.value,
    })
  }

  if (!tmpNote) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ backgroundColor: "white", width: "vw", minHeight: "100%" }}>
        <Container maxWidth="sm" sx={{ minHeight: "100%" }}>
          <Stack spacing={3}>
            <Typography variant="h3">Edit Note</Typography>
            <Typography variant="subtitle1">
              {moment(tmpNote.timestamp).format("DD.MM.YYYY HH:mm")}
            </Typography>
            <TextField
              label="Title"
              variant="standard"
              value={tmpNote.title}
              onChange={handleInputChange('title')}
            />
            <TextField
              label="Text"
              multiline
              variant="standard"
              value={tmpNote?.text}
              onChange={handleInputChange('text')}
            />
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={() => {
                  updateNote(tmpNote);
                  onClose();
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Modal>
  );
};
