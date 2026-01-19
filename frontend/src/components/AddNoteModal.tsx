import {
    Box,
    Button,
    Container,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { INote } from "../hooks/useNotes";

interface IProps {
  open: boolean;
  addNote: (note: INote) => void;
  onClose: () => void;
}

export const AddNoteModal: FC<IProps> = ({ open, addNote, onClose }) => {
  const [tmpNote, setTmpNote] = useState<INote>({});

  return (
    <Modal
      open={open}
      onClose={() => {
        setTmpNote({});
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ backgroundColor: "white", width: "vw", minHeight: "100%" }}>
        <Container maxWidth="sm" sx={{ minHeight: "100%" }}>
          <Stack spacing={3}>
            <Typography variant="h3">Create Note</Typography>
            <TextField
              label="Title"
              variant="standard"
              onChange={(e) => {
                tmpNote.title = e.target.value;
                setTmpNote(tmpNote);
              }}
            />
            <TextField
              label="Text"
              multiline
              variant="standard"
              onChange={(e) => {
                tmpNote.text = e.target.value;
                setTmpNote(tmpNote);
              }}
            />
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={() => {
                  addNote({
                    ...tmpNote,
                    id: Date.now(),
                    timestamp: Date.now(),
                  });
                  setTmpNote({});
                  onClose();
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setTmpNote({});
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
